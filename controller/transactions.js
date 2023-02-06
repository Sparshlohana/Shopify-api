const shopify = require('./auth.controller');
const db = require('../database/index');
const DbData = db.ShopifyAuthData;
const { getSessionFromStorage } = require('../helpers/client');

const getTransaction = async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const shop = req.query.shop;

    try {
        if (shop) {
            const dbData = await DbData.findOne({
                where: {
                    shop: shop
                }
            })
            const accessToken = dbData.accessToken;
            const session = await getSessionFromStorage({ shop, accessToken });

            const transaction = await shopify.shopify.rest.Transaction.all({
                session: session,
                order_id: id,
            });
            res.send(transaction);
            console.log(transaction);
        }
    } catch (error) {
        console.log(error);
    }
};

const postTransaction = async (req, res) => {
    const shop = req.query.shop;
    const body = req.body;
    if (shop) {
        const dbData = await DbData.findOne({
            where: {
                shop: shop
            }
        })
        const accessToken = dbData.accessToken;
        const session = await getSessionFromStorage({ shop, accessToken })
        const getData = body.transaction;

        const transaction = new shopify.shopify.rest.Transaction({ session: session });
        transaction.order_id = getData.order_id;
        transaction.currency = getData.currency;
        transaction.amount = getData.amount;
        transaction.kind = getData.kind;
        transaction.test = getData.test;
        console.log(transaction);
        // transaction.parent_id = getData.parent_id;
        await transaction.save({
            update: true,
        });
    }
    res.send("transaction created successfully");

};

module.exports = {
    getTransaction,
    postTransaction
}