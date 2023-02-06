const shopify = require('./auth.controller');
const db = require('../database/index');
const DbData = db.ShopifyAuthData;
const { getSessionFromStorage } = require('../helpers/client')

const createFulfillment = async (req, res) => {
    const shop = req.query.shop;
    const body = req.body;

    const id = req.params.id;
    if (shop) {
        const dbData = await DbData.findOne({
            where: {
                shop: shop
            }
        })
        const accessToken = dbData.accessToken;
        const session = await getSessionFromStorage({ shop, accessToken });
        const fulfillmentData = body.fulfillment;
        const fulfillment = new shopify.shopify.rest.Fulfillment({ session: session });
        fulfillment.message = fulfillmentData.message;
        fulfillment.notify_customer = fulfillmentData.notify_customer;
        fulfillment.tracking_info = fulfillmentData.tracking_info;
        fulfillment.fulfillment_order_id = fulfillmentData.fulfillment_order_id;
        // fulfillment.line_items_by_fulfillment_order = fulfillmentData.line_items_by_fulfillment_order.map(item => ({
        //     title: item.title,
        //     price: item.price,
        //     grams: item.grams,
        //     quantity: item.quantity,
        // }))
        fulfillment.line_items_by_fulfillment_order = fulfillmentData.line_items_by_fulfillment_order
        // console.log(fulfillment);
        await fulfillment.save({
            update: true,
        });
        res.send(fulfillment);
        console.log(fulfillment);
    }
}

module.exports = { createFulfillment }