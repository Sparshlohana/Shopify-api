const { shopifyApi, LATEST_API_VERSION, ApiVersion } = require('@shopify/shopify-api');
const { restResources } = require('@shopify/shopify-api/rest/admin/2022-10')
require('@shopify/shopify-api/adapters/node');
const dotenv = require('dotenv').config();

const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SCOPES } = process.env;
const db = require('../database/index');

const ShopifyAuthData = db.ShopifyAuthData;

class ShopifyController {

    constructor(apiKey, apiSecret, scopes, ApiVersion, restResources) {
        this.shopify = shopifyApi({
            apiKey: apiKey,
            apiSecretKey: apiSecret,
            scopes: [scopes],
            hostName: 'localhost:5000',
            hostScheme: 'http',
            apiVersion: ApiVersion,
            restResources: restResources
        });
    }


    authControllerStartPoint = async (req, res) => {
        // The library will automatically redirect the user
        const shop = req.query.shop;
        // console.log(req.query.shop)
        if (shop) {
            await this.shopify.auth.begin({
                shop: this.shopify.utils.sanitizeShop(shop, true),
                callbackPath: '/auth/callback',
                isOnline: false,
                rawRequest: req,
                rawResponse: res,
            })
        }
    };

    authControllerEndPoint = async (req, res) => {
        // The library will automatically set the appropriate HTTP headers
        const callback = await this.shopify.auth.callback({
            rawRequest: req,
            rawResponse: res,
        });
        this.session = callback.session;
        console.log(this.session);
        const callbackSession = callback.session;


        const { id, shop, state, isOnline, accessToken, scope } = callbackSession;
        try {
            const dataCheck = await ShopifyAuthData.findByPk(id)
            // console.log(dataCheck);

            if (dataCheck) {
                const dataUpdate = await dataCheck.update({
                    where: {
                        shop: shop
                    }
                })
                console.log("Data Updated");

            } else {
                const shopifyData = await ShopifyAuthData.create({ id: id, shop: shop, state: state, isOnline: isOnline, accessToken: accessToken, scope: scope });

                console.log("Data created");
            }
            try {

                // Get all products

                // const data = await this.shopify.rest.Product.all({
                //     session: callbackSession,
                // });
                // console.log(data);


                // Post product
                // const product = new shopify.rest.Product({ session: callbackSession });
                // product.title = "Burton Custom Freestyle 151";
                // product.body_html = "<strong>Good snowboard!</strong>";
                // product.vendor = "Burton";
                // product.product_type = "Snowboard";
                // product.tags = [
                //     "Barnes & Noble",
                //     "Big Air",
                //     "John's Fav"
                // ];
                // await product.save({
                //     update: true,
                // });
                // console.log("Product created");

                // Delete The Product
                // await shopify.rest.Product.delete({
                //     session: callbackSession,
                //     id: 1986859106369,
                // });
                // console.log("Product Deleted");

                // Count The Product

                // const count = await this.shopify.rest.Product.count({
                //     session: callbackSession,
                // });
                // console.log(count);
            } catch (e) {
                console.log(e);
            }


        } catch (error) {
            console.log(`The error is ${error}`);
        }
        res.redirect('/products');
    };
}

const shopify = new ShopifyController(SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SCOPES, ApiVersion.October22, restResources);

module.exports = shopify;