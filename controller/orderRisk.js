const shopify = require('./auth.controller');
const db = require('../database/index');
const { getSessionFromStorage } = require('../helpers/client');
const { ConnectionRefusedError } = require('sequelize');
const DbData = db.ShopifyAuthData;

const createOrderRisk = async (req, res) => {
    try {
        const shop = req.query.shop;
        const id = req.params.id;
        const body = req.body;
        // console.log(id);
        // console.log(body);
        if (shop) {
            const dbData = await DbData.findOne({
                where: {
                    shop: shop
                }
            })

            const accessToken = dbData.accessToken;
            const session = await getSessionFromStorage({ shop, accessToken });
            const orderRiskData = body.order_risk;

            const order_risk = new shopify.shopify.rest.OrderRisk({ session: session });
            order_risk.order_id = id;
            order_risk.message = orderRiskData.message;
            order_risk.recommendation = orderRiskData.recommendation;
            order_risk.score = orderRiskData.score;
            order_risk.source = orderRiskData.source;
            order_risk.cause_cancel = orderRiskData.cause_cancel;
            order_risk.display = orderRiskData.display;
            await order_risk.save({
                update: true,
            });
            res.send(order_risk)
            console.log(order_risk);
            console.log(`Order risk created`);
        }
        else {
            res.json({
                message: "Shop not found"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllProductRisk = async (req, res) => {
    try {
        const shop = req.query.shop;
        const id = req.params.id;
        if (shop) {
            const dbData = await DbData.findOne({
                where: {
                    shop: shop
                }
            })

            const accessToken = dbData.accessToken;
            const session = await getSessionFromStorage({ shop, accessToken });
            console.log(session);
            try {
                const getProductData = await shopify.shopify.rest.OrderRisk.all({
                    session: session,
                    order_id: id
                });
                console.log(shopify.shopify.rest);

                res.send(getProductData);
            } catch (e) {
                // throw e
                console.log(e);
            }
        }
        else {
            res.json({
                message: "Shop not found"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
const getSingleProductRisk = async (req, res) => {

}

const updateOrderRisk = async (req, res) => {

}

const deleteOrderRisk = async (req, res) => {

}

module.exports = {
    createOrderRisk,
    getAllProductRisk,
    getSingleProductRisk,
    updateOrderRisk,
    deleteOrderRisk
}