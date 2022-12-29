const { Session } = require('@shopify/shopify-api');
const Shopify = require('../controller/auth.controller');
// console.log(shopify.session)

exports.getSessionFromStorage = async ({ shop, accessToken }) => {
    try {
        const session = new Session({
            id: Shopify.shopify.auth.nonce(),
            shop: shop,
            state: Shopify.shopify.auth.nonce(),
            isOnline: false,
            accessToken: accessToken
        });
        return session;
    } catch (error) {
        console.log(`The error from getSessionFromStorage is ${error}`);
    }
}