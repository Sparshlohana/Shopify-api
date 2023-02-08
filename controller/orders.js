const shopify = require('./auth.controller');
const db = require('../database/index');
const { getSessionFromStorage } = require('../helpers/client');
const DbData = db.ShopifyAuthData;

// const createOrder = async (req, res) => {
//     const shop = req.query.shop;
//     console.log(shop);
//     const body = req.body;
//     try {
//         if (shop) {
//             const dbData = await DbData.findOne({
//                 where: {
//                     shop: shop
//                 }
//             })

//             const accessToken = dbData.accessToken;
//             const session = await getSessionFromStorage({ shop, accessToken });
//             const getOrdersFromPm = body.order;

//             const order = new shopify.shopify.rest.Order({ session: session });
//             order.line_items = getOrdersFromPm.line_items
//             await order.save({
//                 update: true,
//             });
//             res.json({
//                 message: "Order created successfully",
//             })
//             console.log("Order created successfully");
//         }
//         else {
//             res.json({
//                 message: "Shop not found"
//             })
//         }
//     } catch (err) {
//         console.log(`The error is ${err}`);
//     }
// }

const createOrder = async (req, res) => {
    const shop = req.query.shop;
    console.log(shop);
    const body = req.body;
    try {
        if (shop) {
            const dbData = await DbData.findOne({
                where: {
                    shop: shop
                }
            })

            const accessToken = dbData.accessToken;
            const session = await getSessionFromStorage({ shop, accessToken });
            const getOrdersFromPm = body.order;

            const order = new shopify.shopify.rest.Order({ session: session });
            order.line_items = getOrdersFromPm.line_items;
            order.tax_lines = getOrdersFromPm.tax_lines;
            order.total_tax = getOrdersFromPm.total_tax;
            order.currency = getOrdersFromPm.currency;
            order.customer = getOrdersFromPm.customer;
            order.financial_status = getOrdersFromPm.financial_status;
            await order.save({
                update: true,
            });
            res.json({
                message: "Order created successfully",
            })
            console.log("Order created successfully");
        }
        else {
            res.json({
                message: "Shop not found"
            })
        }
    } catch (err) {
        console.log(`The error is ${err}`);
    }
}

const getAllOrders = async (req, res) => {
    const sessionId = await shopify.shopify.session.getCurrentId({
        isOnline: true,
        rawRequest: req,
        rawResponse: res,
    });
    console.log(sessionId);
    // const session = await getSessionFromStorage(sessionId);
    const shop = req.query.shop;
    try {

        if (shop) {
            const dbData = await DbData.findOne({
                where: {
                    shop: shop
                }
            });

            const accessToken = dbData.accessToken;
            const session = await getSessionFromStorage({ shop, accessToken });

            const getOrders = await shopify.shopify.rest.Order.all({
                session: session,
                status: "any",
            });

            console.log(getOrders);
            res.send(getOrders)
        }
        else {
            res.json({
                message: "Shop not found"
            })
        }
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

const getOneOrder = async (req, res) => {
    const shop = req.query.shop;
    const id = req.params.id;

    try {
        if (shop) {
            const dbData = await DbData.findOne({
                where: {
                    shop: shop
                }
            });

            const accessToken = dbData.accessToken;
            const session = await getSessionFromStorage({ shop, accessToken });


            const getSingleProductData = await shopify.shopify.rest.Order.find({
                session: session,
                id: id,
                fields: "id,line_items,name,total_price",
            });
            console.log(getSingleProductData);
            res.send(getSingleProductData);
        }
        else {
            res.json({
                message: "Shop not found"
            })
        }
    } catch (error) {
        console.log(`The error is ${error}`);
        res.send(error);
    }
}

const updateOrder = async (req, res) => {
    const shop = req.query.shop;
    const id = req.params.id;
    const body = req.body;

    try {
        if (shop) {
            const dbData = await DbData.findOne({
                where: {
                    shop: shop
                }
            });

            const session = dbData.dataValues;
            const getOrderFromPm = body.order;
            const line_items = getOrderFromPm.line_items;
            // console.log(line_items[0]);

            try {
                const order = new shopify.shopify.rest.Order({ session: session });

                order.id = id;
                order.metafields = [
                    {
                        "key": "new",
                        "value": "newvalue",
                        "type": "single_line_text_field",
                        "namespace": "global"
                    }
                ]
                order.line_items = line_items;
                await order.save({
                    update: true,
                });
                // console.log(order);
                res.json(order)
            } catch (error) {
                console.log(`the error is ${error}`);
                res.json({
                    error: error.message
                })
            }

        }
        else {
            res.json({
                message: "Shop not found"
            })
        }
    } catch (error) {
        console.log(error);
        res.send({
            message: "Error updating data"
        })
    }
}

const deleteOrder = async (req, res) => {
    const shop = req.query.shop;
    const id = req.params.id;
    try {
        if (shop) {
            const dbData = await DbData.findOne({
                where: {
                    shop: shop
                }
            });

            const accessToken = dbData.accessToken;
            const session = await getSessionFromStorage({ shop, accessToken });

            const deleteData = await shopify.shopify.rest.Order.delete({
                session: session,
                id: id,
            });

            res.json({
                message: 'Order deleted successfully',
            })
            console.log("Order deleted successfully");
        }
        else {
            res.json({
                message: "Shop not found"
            })
        }
    } catch (error) {
        res.json({
            error: "Order not found"
        })
        console.log(`The error is ${error}`);
    }

}

module.exports = {
    createOrder,
    getAllOrders,
    getOneOrder,
    updateOrder,
    deleteOrder
}