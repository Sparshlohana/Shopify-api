const { shopifyApi, ApiVersion, Session } = require("@shopify/shopify-api");
const CONFIG = require('../config/config_' + [process.env.NODE_ENV || 'local'] + '.json');

const Shopify = shopifyApi({
    apiKey: CONFIG.shopify.api_key,
    apiSecretKey: CONFIG.shopify.secrete_key,
    scopes: [CONFIG.shopify.scopes],
    apiVersion: ApiVersion.October22,
    hostName: CONFIG.shopify.appUrl.replace(/https?:\/\//, "")
});

exports.getSessionFromStorage = async ({ shop, accessToken }) => {
    try {
        const session = new Session({
            id: Shopify.auth.nonce(),
            shop: shop,
            state: Shopify.auth.nonce(),
            isOnline: false,
            accessToken: accessToken,
        });
        return session;
    } catch (error) {
        console.log("Error getSessionFromStorage", error);
    }
};

exports.shopifyRestClient = async ({ shop, accessToken }) => {
    const session = await this.getSessionFromStorage({ shop, accessToken });
    const client = new Shopify.clients.Rest({ session: session });
    return client;
}

exports.shopifyGraphqlClient = async ({ shop, accessToken, schema }) => {
    const session = await this.getSessionFromStorage({ shop, accessToken });
    console.log("shopifyGraphqlClient session", session);
    const client = new Shopify.clients.Graphql({ session: session });
    let data = await client.query({
        data: schema
    })
    return data;
}