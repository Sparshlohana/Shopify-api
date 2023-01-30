const shopify = require('./auth.controller');
const db = require('../database/index');
const DbData = db.ShopifyAuthData;
const { getSessionFromStorage } = require('../helpers/client');

const getTransaction = async (req, res) => { };

const postTransaction = async (req, res) => {
    const shop = req.query.shop;
    const body = req.body;
    if (shop) {
        const dbData = DbData.findOne({
            where: {
                shop
            }
        })
        const accessToken = dbData.accessToken;
        const session = await getSessionFromStorage({ shop, accessToken })
        const getData = body.transaction;

        const transaction = new shopify.shopify.rest.Transaction({ session: session });
        transaction.order_id = 450789469;
        transaction.currency = "USD";
        transaction.amount = "10.00";
        transaction.kind = "capture";
        transaction.parent_id = 389404469;
        await transaction.save({
            update: true,
        });
    }

};

module.exports = {
    getTransaction,
    postTransaction
}