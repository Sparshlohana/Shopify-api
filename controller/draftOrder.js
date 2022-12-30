const shopify = require('./auth.controller');
const { getSessionFromStorage } = require('../helpers/client');
const db = require('../database/index');
const DbData = db.ShopifyAuthData;

const getAllDraftOrders = async (req, res) => {
    try {
        const shop = req.query.shop;
        if (shop) {
            const dbData = await DbData.findOne({
                where: {
                    shop: shop
                }
            })
            const accessToken = dbData.dataValues.accessToken;
            const session = await getSessionFromStorage({ shop, accessToken });
            // console.log(shopify.shopify.rest);
            const getDraftOrder = await shopify.shopify.rest?.DraftOrder.all({
                session: session,
            }); await shopify.rest?.DraftOrder.all({
                session: session,
            });
            res.send(getDraftOrder);
            console.log(getDraftOrder);
        }
        else {
            res.json({
                error: "Shop not found"
            })
        }
    } catch (error) {
        console.log(`The error is ${error}`);
    }
};

const getSingleDraftOrder = async (req, res) => {
    try {
        const shop = req.query.shop;
        const id = req.params.id;
        if (shop) {
            const dbData = await DbData.findOne({
                where: {
                    shop: shop
                }
            })
            const accessToken = dbData.dataValues.accessToken;
            const session = await getSessionFromStorage({ shop, accessToken });
            const getDraftOrder = await shopify.shopify.rest?.DraftOrder.find({
                session: session,
                id: id,
            });
            res.send(getDraftOrder);
            console.log(getDraftOrder);
        }
        else {
            res.json({
                error: "Shop not found"
            })
        }
    } catch (error) {
        console.log(`The error is ${error}`);
    }
};

const createDraftOrder = async (req, res) => {
    try {
        const shop = req.query.shop;
        const body = req.body;
        // console.log(body);
        if (shop) {
            const dbData = await DbData.findOne({
                where: {
                    shop: shop
                }
            })

            const createDraftOrder = body.draft_order;
            const lineItems = createDraftOrder.line_items

            const accessToken = dbData.dataValues.accessToken;
            const session = await getSessionFromStorage({ shop, accessToken });
            const draft_order = new shopify.shopify.rest.DraftOrder({ session: session });
            console.log(lineItems);
            draft_order.line_items = lineItems;
            await draft_order.save({
                update: true,
            });
            res.send(draft_order);
            console.log(draft_order);
        }
        else {
            res.json({
                error: "Shop not found"
            })
        }
    } catch (error) {
        console.log(`The error is ${error}`);
    }
};

const deleteDraftOrder = async (req, res) => {
    try {
        const shop = req.query.shop;
        const id = req.params.id;
        // console.log(body);
        if (shop) {
            const dbData = await DbData.findOne({
                where: {
                    shop: shop
                }
            })

            const accessToken = dbData.dataValues.accessToken;
            const session = await getSessionFromStorage({ shop, accessToken });
            const deleteDraftOrder = await shopify.shopify.rest.DraftOrder.delete({
                session: session,
                id: id,
            });
            res.json({
                message: "Draft order deleted successfully"
            })
            console.log("Draft order deleted successfully");
        }
        else {
            res.json({
                error: "Shop not found"
            })
        }
    } catch (error) {
        console.log(`The error is ${error}`);
    }
};

const updateDraftOrder = async (req, res) => {
    try {
        const shop = req.query.shop;
        const id = req.params.id;
        const body = req.body;
        // console.log(body);
        if (shop) {
            const dbData = await DbData.findOne({
                where: {
                    shop: shop
                }
            })
            const lineItems = body.draft_order.line_items;
            const accessToken = dbData.dataValues.accessToken;
            const session = await getSessionFromStorage({ shop, accessToken });
            const draft_order = new shopify.shopify.rest.DraftOrder({ session: session });

            draft_order.id = id;
            // draft_order.note = lineItems;
            draft_order.line_items = lineItems;
            await draft_order.save({
                update: true,
            });
            res.send(draft_order);
            console.log(draft_order);
        }
        else {
            res.json({
                error: "Shop not found"
            })
        }
    } catch (error) {
        console.log(`The error is ${error}`);
    }
};

module.exports = {
    getAllDraftOrders,
    getSingleDraftOrder,
    createDraftOrder,
    deleteDraftOrder,
    updateDraftOrder
};