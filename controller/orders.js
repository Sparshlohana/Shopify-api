const shopify = require('../controller/shopify.controller');
const db = require('../database/index');

const DbData = db.ShopifyAuthData;

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

            console.log(dbData);

            const session = dbData.dataValues;
            const getOrdersFromPm = body.order;

            const order = new shopify.shopify.rest.Order({ session: session });
            order.line_items = [
                {
                    "title": "Big Brown Bear Boots",
                    "price": 74.99,
                    "grams": "1300",
                    "quantity": 3,
                    "tax_lines": [
                        {
                            "price": 13.5,
                            "rate": 0.06,
                            "title": "State tax"
                        }
                    ]
                }
            ];
            order.transactions = [
                {
                    "kind": "sale",
                    "status": "success",
                    "amount": 238.47
                }
            ];
            order.total_tax = 13.5;
            order.currency = "EUR";
            await order.save({
                update: true,
            });

            res.json({
                message: "Order created successfully",
            })
            console.log("Order created successfully");
        }
    } catch (err) {
        console.log(`The error is ${err}`);
    }
}

const getAllOrders = async (req, res) => {
    const shop = req.query.shop;
    try {

        if (shop) {
            const dbData = await DbData.findOne({
                where: {
                    shop: shop
                }
            });

            const session = dbData.dataValues;

            const getOrders = await shopify.shopify.rest.Order.all({
                session: session,
                status: "any",
            });

            console.log(getOrders);
            res.send(getOrders)
        }
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

const getOneOrder = async (req, res) => {
    const shop = req.query.shop;
    const id = req.params.id;

    if (shop) {
        const dbData = await DbData.findOne({
            where: {
                shop: shop
            }
        });

        const session = dbData.dataValues;


        const getSingleProductData = await shopify.shopify.rest.Order.find({
            session: session,
            id: 4733515956289,
            fields: "id,line_items,name,total_price",
        });
        console.log(getSingleProductData);
        res.send(getSingleProductData);
    }

}

const updateOrder = async (req, res) => {
    const shop = req.query.shop;
    const id = req.params.id;
    const body = req.body;
    console.log(shop);

    try {
        if (shop) {
            const dbData = await DbData.findOne({
                where: {
                    shop: shop
                }
            });

            const session = dbData.dataValues;

            const getOrderFromPm = body.order;
            // console.log(getProductFromPm);

            const order = new shopify.shopify.rest.Order({ session: session });
            order.id = id;
            order.metafields = [
                {
                    "key": "new",
                    "value": "newvalue",
                    "type": "single_line_text_field",
                    "namespace": "global"
                }
            ];
            await order.save({
                update: true,
            });

            res.json({
                message: "Data updated"
            })
        }
    } catch (error) {
        console.log(error);
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

            const session = dbData.dataValues;



            const deleteData = await shopify.shopify.rest.Order.delete({
                session: session,
                id: 4733503176769,
            });

            res.json({
                message: 'Product deleted successfully',
            })
            console.log("Product deleted successfully");
        }
    } catch (error) {
        res.json({
            error: "Product not found"
        })
        console.log("Product not found");

    }

}

module.exports = {
    createOrder,
    getAllOrders,
    getOneOrder,
    updateOrder,
    deleteOrder
}