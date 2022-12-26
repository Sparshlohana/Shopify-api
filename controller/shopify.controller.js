const { shopifyApi, LATEST_API_VERSION, ApiVersion } = require('@shopify/shopify-api');
const { restResources } = require('@shopify/shopify-api/rest/admin/2022-10')
require('@shopify/shopify-api/adapters/node');
const dotenv = require('dotenv').config();
const session = require('node-sessionstorage');
const { json } = require('sequelize');

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
        // console.log(this.session);
        const callbackSession = callback.session;


        res.cookie("auth", JSON.stringify(callbackSession));

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

        } catch (error) {
            console.log(`The error is ${error}`);
        }
        res.redirect('/products?shop=securecod3.myshopify.com');
    };
}

const shopify = new ShopifyController(SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SCOPES, ApiVersion.October22, restResources);

module.exports = shopify;

// http://localhost:5000/auth?shop=securecod3.myshopify.com