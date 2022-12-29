const asyncWait = require("async");
const dotenv = require('dotenv');
dotenv.config();
const CONFIG = require('../config/config_' + [process.env.NODE_ENV || 'local'] + '.json');
const axios = require('axios')
const dbConnection = require("../models");
const shopConnection = dbConnection.Store;
const productController = require('./product-controller');
const emailnotificationController = require('./emailnotification-controller')
const crypto = require('crypto');
let PreOrderError = require('../helpers/error')
require("@shopify/shopify-api/adapters/node")
const { storeSettings } = require('../helpers/helper');
const { getShopifyApi, shopifyRestClient } = require('../client/shopify-client');

//Login Authentication
exports.login = async (req, res) => {
  try {
    const shop = req.query.shop;
    const host = req.query.host ? req.query.host : Buffer.from(shop + "/admin").toString('base64');
    const appDetails = {
      redirectUrl: CONFIG.shopify.redirect_url,
      host: host,
      apiKey: CONFIG.shopify.api_key,
      appScope: CONFIG.shopify.scopes,
      shop: shop
    }

    res.render('install', appDetails);
    // const shopify = getShopifyApi();
    // await shopify.auth.begin({
    //   shop: shopify.utils.sanitizeShop(req.query.shop, true),
    //   callbackPath: CONFIG.shopify.redirect_url,
    //   isOnline: false,
    //   rawRequest: req,
    //   rawResponse: res,
    // });
  } catch (error) {
    console.log("Error login----", error);
    return res.status(CONFIG.status.NOT_FOUND).send({ statusCode: 400, message: CONFIG.msg.PARAMETER })
  }
};


//Generate Token
exports.generateToken = async (req, res) => {
  const { shop, hmac, code, host } = req.query;
  try {
    if (shop && hmac && code) {
      // Generate access token by code
      let accessTokenResponse = await axios.post("https://" + shop + "/admin/oauth/access_token", {
        client_id: CONFIG.shopify.api_key,
        client_secret: CONFIG.shopify.secrete_key,
        code: code
      }, {
        headers: {
          'Content-Type': 'application/json'
          , "Accept-Encoding": "gzip,deflate,compress"
        }
      })
      if (!accessTokenResponse.data) {
        throw new PreOrderError(CONFIG.status.UNAUTHORIZED, "Token Invalid");
      }
      const accessToken = accessTokenResponse.data.access_token

      // Get Shop data from Shopify
      const shopify = await shopifyRestClient({ shop: shop, accessToken: accessToken })
      let response = await shopify.get({ path: 'shop' })
      if (!response) {
        throw new PreOrderError(CONFIG.status.UNAUTHORIZED, "Unauthorize shop");
      }
      let shopData = response.body.shop;

      // Upsert Shop data into database
      let shopResp = await this.upsertShopData(shopData, accessToken);

      // create webhooks
      this.registerWebhook(shopify)

      await insertDefaultSettingsAndTemplate(shopResp.id);

      // redirect path 
      let pathname = '/app/pricingPlan';
      if (shopResp.is_paid == 1) {
        let checkSkipVal = await dbConnection.IntroductionTour.findOne({ where: { store_id: shopResp.id } })
        pathname = checkSkipVal && checkSkipVal.skip && checkSkipVal.skip == '1' ? '/app/dashboard' : '/app/introduction-tour'
      }
      res.setHeader('Content-Security-Policy', `frame-ancestors https://${shop} https://admin.shopify.com`).redirect(CONFIG.shopify.appUrl + `${pathname}` + '?' + 'host=' + host);
    } else {
      throw new PreOrderError(CONFIG.status.NOT_FOUND, CONFIG.msg.PARAMETER);
    }
  } catch (error) {
    console.log("Error generateToken--->", error);
    let code = error.statusCode !== undefined ? error.statusCode : 500
    res.status(code).send({ statusCode: code, message: error.message })
  }
};


let insertDefaultSettingsAndTemplate = async (store_id) => {
  try {
    let percentageResponse = await dbConnection.Settings.findOne({ where: { store_id } })
    if (!percentageResponse) {
      await dbConnection.Settings.bulkCreate([
        { store_id, key: "sell_percentage", value: "100" },
        { store_id, key: "app_enable", value: "1" },
        { store_id, key: storeSettings.Title.PRODUCT_SYNC, value: storeSettings.SyncStatus.FAILED },
        { store_id, key: storeSettings.Title.ORDER_SYNC, value: storeSettings.SyncStatus.FAILED },
        { store_id, key: 'smtp_credentials', value: JSON.stringify(CONFIG.smtp) }
      ])
    }

    let templateSettingResponse = await dbConnection.templateSetting.findOne({ where: { store_id: null } })
    if (!templateSettingResponse) {
      let template = {
        title: '{{product.name}} is available now',
        description: 'Your product is in stock',
      };
      await dbConnection.templateSetting.create(template)
    }
  } catch (error) {
    console.log("Error insertSettingTemplate", error.message);
    throw new Error(error.message)
  }
}


exports.upsertShopData = async (data, token) => {
  try {
    //Create Shop Data Obj
    const shopDataObj = {};
    shopDataObj.shopify_store_id = data.id
    shopDataObj.name = data.name
    shopDataObj.email = data.email
    shopDataObj.myshopify_domain = data.myshopify_domain
    shopDataObj.shop_created_at = data.created_at
    shopDataObj.shop_owner = data.shop_owner
    shopDataObj.token = token
    shopDataObj.iana_timezone = data.iana_timezone
    shopDataObj.guid = data.id
    shopDataObj.shopify_plan_name = data.plan_name
    shopDataObj.status = data.financy
    shopDataObj.is_deleted = '0'
    shopDataObj.is_shop_install = '1'
    shopDataObj.access_scopes = CONFIG.shopify.scopes
    shopDataObj.currency = data.currency
    shopDataObj.currency_format = getCurrencySymbols(data.currency)

    //Check Database Row exist or not
    let shopResponse = await shopConnection.findOne({ where: { myshopify_domain: data.myshopify_domain } })
    if (shopResponse) {
      await shopConnection.update(shopDataObj, { where: { myshopify_domain: data.myshopify_domain } })
      return { id: shopResponse.id, is_paid: shopResponse.is_paid }

    } else {
      let create_res = await shopConnection.create(shopDataObj)

      // get all products from shopify to app
      productController.productSync(data.myshopify_domain, create_res.id, token);

      return { id: create_res.id, is_paid: create_res.is_paid }
    }

  } catch (error) {
    console.log("Error upsertShopData-->", error.message);
    throw new Error(error.message)
  }
};

exports.registerWebhook = async (shopify) => {
  try {
    const webhooks = await shopify.get({ path: 'webhooks' });
    let webhookList = webhooks.body.webhooks
    let webhookData = webhookCreateObject();
    asyncWait.forEachSeries(webhookData, function (webhook, callback) {
      let isCreateWebhook = webhookList.filter(x => x.topic === webhook.topic && x.address === webhook.address);
      if (isCreateWebhook.length <= 0)
        shopify.post({ path: 'webhooks', data: { webhook: webhook } })
      callback()
    })
  } catch (error) {
    console.log("Error registerWebhook", error.message)
    throw new Error(error.message)
  }
}


let webhookCreateObject = () => {
  let allWebhook = [];
  const webhookURL = CONFIG.shopify.webhookUrl
  let orderCreate = {
    topic: "orders/create",
    address: webhookURL,
    format: "json"
  }
  allWebhook.push(orderCreate)

  let productCreate = {
    topic: "products/create",
    address: webhookURL,
    format: "json"
  }
  allWebhook.push(productCreate)

  let productUpdate = {
    topic: "products/update",
    address: webhookURL,
    format: "json"
  }
  allWebhook.push(productUpdate)

  let inventoryLevelsUpdate = {
    topic: "inventory_levels/update",
    address: webhookURL,
    format: "json"
  }
  allWebhook.push(inventoryLevelsUpdate)

  let productsDelete = {
    topic: "products/delete",
    address: webhookURL,
    format: "json"
  }
  allWebhook.push(productsDelete)

  let orderUpdate = {
    topic: "orders/updated",
    address: webhookURL,
    format: "json"
  }
  allWebhook.push(orderUpdate)

  let orderEdit = {
    topic: "orders/edited",
    address: webhookURL,
    format: "json"
  }
  allWebhook.push(orderEdit)

  let orderCancel = {
    topic: "orders/cancelled",
    address: webhookURL,
    format: "json"
  }
  allWebhook.push(orderCancel)

  let appUninstall = {
    topic: "app/uninstalled",
    address: webhookURL,
    format: "json"
  }
  allWebhook.push(appUninstall)


  return allWebhook;
}


exports.stockchangeEmail = async (req, res) => {
  try {
    let { sku, store_id, variant_id } = req.body
    await emailnotificationController.fetchEmail(sku, store_id, variant_id)
    res.status(CONFIG.status.SUCCESS).send({ message: CONFIG.msg.SUCCESS })
  } catch (error) {
    console.log("Error stockchangeEmail", error);
  }
}

exports.getStoreData = async (req, res) => {
  try {
    let myshopify_domain = req.query.shop
    let shopResponse = await dbConnection.Store.findOne({ where: { myshopify_domain: myshopify_domain } })
    res.status(200).send(shopResponse);
  } catch (error) {
    console.log("Error getStoreData", error);
  }
}

exports.customerDataRequest = async (req, res) => {
  let shop = req.rawBody.shop_domain;
  let statusCode = '', message = ''
  try {
    let hmac = req.headers['x-shopify-hmac-sha256']
    let newHmac = crypto.createHmac('sha256', CONFIG.shopify.secrete_key).update(req.rawBody).digest('base64')
    if (newHmac == hmac) {
      statusCode = CONFIG.status.SUCCESS, message = CONFIG.msg.SUCCESS
    } else throw new Error()
  } catch (error) {
    console.log("Error customerDataRequest", error);
    statusCode = CONFIG.status.UNAUTHORIZED, message = CONFIG.msg.ERROR
  } finally {
    res.setHeader('Content-Security-Policy', `frame-ancestors https://${shop} https://admin.shopify.com`).status(statusCode).send(message)
  }
}
exports.deleteCustomerData = async (req, res) => {
  let shop = req.rawBody.shop_domain;
  let statusCode = '', message = ''
  try {
    let hmac = req.headers['x-shopify-hmac-sha256']
    let newHmac = crypto.createHmac('sha256', CONFIG.shopify.secrete_key).update(req.rawBody).digest('base64')
    if (newHmac == hmac) {
      statusCode = CONFIG.status.SUCCESS, message = CONFIG.msg.SUCCESS
    } else throw new Error()
  } catch (error) {
    console.log("Error deleteCustomerData", error);
    statusCode = CONFIG.status.UNAUTHORIZED, message = CONFIG.msg.ERROR
  } finally {
    res.setHeader('Content-Security-Policy', `frame-ancestors https://${shop} https://admin.shopify.com`).status(statusCode).send(message)
  }
}
exports.uninstallApp = async (req, res) => {
  let shop = req.rawBody.shop_domain;
  let statusCode = '', message = ''
  try {
    let hmac = req.headers['x-shopify-hmac-sha256']
    let newHmac = crypto.createHmac('sha256', CONFIG.shopify.secrete_key).update(req.rawBody).digest('base64')
    if (newHmac == hmac) {
      statusCode = CONFIG.status.SUCCESS, message = CONFIG.msg.SUCCESS
    } else throw new Error()
  } catch (error) {
    console.log("Error uninstallApp", error);
    statusCode = CONFIG.status.UNAUTHORIZED, message = CONFIG.msg.ERROR
  }
  finally {
    res.setHeader('Content-Security-Policy', `frame-ancestors https://${shop} https://admin.shopify.com`).status(statusCode).send(message)
  }
}

const getCurrencySymbols = (symbol) => {
  try {
    let currecySymbol = {
      'AED': 'د.إ', // ?
      'AFN': 'Af',
      'ALL': 'Lek',
      'AMD': '',
      'ANG': 'ƒ',
      'AOA': 'Kz', // ?
      'ARS': '$',
      'AUD': '$',
      'AWG': 'ƒ',
      'AZN': 'мaн',
      'BAM': 'KM',
      'BBD': '$',
      'BDT': '৳', // ?
      'BGN': 'лв',
      'BHD': '.د.ب', // ?
      'BIF': 'FBu', // ?
      'BMD': '$',
      'BND': '$',
      'BOB': '$b',
      'BRL': 'R$',
      'BSD': '$',
      'BTN': 'Nu.', // ?
      'BWP': 'P',
      'BYR': 'p.',
      'BZD': 'BZ$',
      'CAD': '$',
      'CDF': 'FC',
      'CHF': 'CHF',
      'CLF': '', // ?
      'CLP': '$',
      'CNY': '¥',
      'COP': '$',
      'CRC': '₡',
      'CUP': '⃌',
      'CVE': '$', // ?
      'CZK': 'Kč',
      'DJF': 'Fdj', // ?
      'DKK': 'kr',
      'DOP': 'RD$',
      'DZD': 'دج', // ?
      'EGP': '£',
      'ETB': 'Br',
      'EUR': '€',
      'FJD': '$',
      'FKP': '£',
      'GBP': '£',
      'GEL': 'ლ', // ?
      'GHS': '¢',
      'GIP': '£',
      'GMD': 'D', // ?
      'GNF': 'FG', // ?
      'GTQ': 'Q',
      'GYD': '$',
      'HKD': '$',
      'HNL': 'L',
      'HRK': 'kn',
      'HTG': 'G', // ?
      'HUF': 'Ft',
      'IDR': 'Rp',
      'ILS': '₪',
      'INR': '₹',
      'IQD': 'ع.د', // ?
      'IRR': '﷼',
      'ISK': 'kr',
      'JEP': '£',
      'JMD': 'J$',
      'JOD': 'JD', // ?
      'JPY': '¥',
      'KES': 'KSh', // ?
      'KGS': 'лв',
      'KHR': '៛',
      'KMF': 'CF', // ?
      'KPW': '₩',
      'KRW': '₩',
      'KWD': 'د.ك', // ?
      'KYD': '$',
      'KZT': 'лв',
      'LAK': '₭',
      'LBP': '£',
      'LKR': '₨',
      'LRD': '$',
      'LSL': 'L', // ?
      'LTL': 'Lt',
      'LVL': 'Ls',
      'LYD': 'ل.د', // ?
      'MAD': 'د.م.', //?
      'MDL': 'L',
      'MGA': 'Ar', // ?
      'MKD': 'дeн',
      'MMK': 'K',
      'MNT': '₮',
      'MOP': 'MOP$', // ?
      'MRO': 'UM', // ?
      'MUR': '₨', // ?
      'MVR': '.ރ', // ?
      'MWK': 'MK',
      'MXN': '$',
      'MYR': 'RM',
      'MZN': 'MT',
      'NAD': '$',
      'NGN': '₦',
      'NIO': 'C$',
      'NOK': 'kr',
      'NPR': '₨',
      'NZD': '$',
      'OMR': '﷼',
      'PAB': 'B/.',
      'PEN': 'S/.',
      'PGK': 'K', // ?
      'PHP': '₱',
      'PKR': '₨',
      'PLN': 'zł',
      'PYG': 'Gs',
      'QAR': '﷼',
      'RON': 'lei',
      'RSD': 'Дин.',
      'RUB': 'py6',
      'RWF': 'ر.س',
      'SAR': '﷼',
      'SBD': '$',
      'SCR': '₨',
      'SDG': '£', // ?
      'SEK': 'kr',
      'SGD': '$',
      'SHP': '£',
      'SLL': 'Le', // ?
      'SOS': 'S',
      'SRD': '$',
      'STD': 'Db', // ?
      'SVC': '$',
      'SYP': '£',
      'SZL': 'L', // ?
      'THB': '฿',
      'TJS': 'TJS', // ? TJS (guess)
      'TMT': 'm',
      'TND': 'د.ت',
      'TOP': 'T$',
      'TRY': '₤', // New Turkey Lira (old symbol used)
      'TTD': '$',
      'TWD': 'NT$',
      'TZS': '',
      'UAH': '₴',
      'UGX': 'USh',
      'USD': '$',
      'UYU': '$U',
      'UZS': 'лв',
      'VEF': 'Bs',
      'VND': '₫',
      'VUV': 'VT',
      'WST': 'WS$',
      'XAF': 'FCFA',
      'XCD': '$',
      'XDR': '',
      'XOF': '',
      'XPF': 'F',
      'YER': '﷼',
      'ZAR': 'R',
      'ZMK': 'ZK', // ?
      'ZWL': 'Z$',
    }
    let currencyResponse = 'amount'
    if (currecySymbol[symbol] != undefined) {
      currencyResponse = currecySymbol[symbol];
    }
    return currencyResponse
  } catch (err) {
    throw new Error('Unknown currency formate')
  }
}


// checkShopInstall = (scopes, shop) => {
//   return new Promise((resolve, reject) => {
//     shopConnection.findOne({ where: { myshopify_domain: shop } }).then((shopResponse) => {
//       if (shopResponse) {
//         if (shopResponse.is_shop_install == '1') {
//           let isInstall = false;
//           let previousScopes = shopResponse.access_scopes.split(",").map(function (value) { return value.trim() });
//           let newScopes = scopes.split(",").map(function (value) { return value.trim() });

//           if (newScopes.length > previousScopes.length) {
//             resolve({ status: true })
//           } else {
//             asyncWait.forEachSeries(previousScopes, function (scope, callback) {
//               let isNewScope = newScopes.filter(x => x === scope);
//               if (isNewScope.length == 0) {
//                 isInstall = true;
//               }
//               callback()
//             }, () => {
//               resolve({ status: isInstall })
//             })
//           }
//         } else {
//           resolve({ status: true })
//         }
//       } else {
//         resolve({ status: true })
//       }
//     })
//   })
// }