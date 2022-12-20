const shopify = require('../controller/shopify.controller');
const db = require('../database/index');

const DbData = db.ShopifyAuthData;

const getAllProducts = async (req, res) => {
    // console.log(shopify);
    const shop = req.query.shop;
    try {

        if (shop) {
            const dbData = await DbData.findOne({
                where: {
                    shop: shop
                }
            });

            const session = dbData.dataValues;

            const getProductData = await shopify.shopify.rest.Product.all({
                session: session,
            });

            console.log(getProductData);
            res.send(getProductData)
        }
    } catch (error) {
        console.log(error);
    }
}

const getOneProduct = async (req, res) => {
    const shop = req.query.shop;
    const id = req.params.id;

    if (shop) {
        const dbData = await DbData.findOne({
            where: {
                shop: shop
            }
        });

        const session = dbData.dataValues;


        const getSingleProductData = await shopify.shopify.rest.Product.find({
            session: session,
            id: id,
        });
        console.log(getSingleProductData);
        res.send(getSingleProductData);
    }
}

const postProducts = async (req, res) => {
    const shop = req.query.shop;
    const body = req.body;
    // console.log(body.product);

    if (shop) {
        const dbData = await DbData.findOne({
            where: {
                shop: shop
            }
        });

        const session = dbData.dataValues;

        const getProductFromPm = body.product;
        console.log(getProductFromPm);

        const product = new shopify.shopify.rest.Product({ session: session });
        product.title = getProductFromPm.title;
        product.body_html = getProductFromPm.body_html;
        product.vendor = getProductFromPm.vendor;
        product.product_type = getProductFromPm.product_type;
        product.tags = getProductFromPm.tags;
        await product.save({
            update: true,
        });
        console.log("Product created successfully");
        res.json({
            message: "Product created successfully"
        });
    }
}

const deleteProduct = async (req, res) => {
    const shop = req.query.shop;
    const id = req.params.id;

    if (shop) {
        const dbData = await DbData.findOne({
            where: {
                shop: shop
            }
        });

        const session = dbData.dataValues;


        const getSingleProductData = await shopify.shopify.rest.Product.delete({
            session: session,
            id: id,
        });
        console.log(getSingleProductData);
        res.send(getSingleProductData);
    }
}

const updateProduct = async (req, res) => {
    const shop = req.query.shop;
    const id = req.params.id;
    const body = req.body;

    const getProductFromPm = body.product;
    console.log(getProductFromPm);

    if (shop) {
        const dbData = await DbData.findOne({
            where: {
                shop: shop
            }
        });

        const session = dbData.dataValues;

        const getProductFromPm = body.product;
        // console.log(getProductFromPm);

        const product = await new shopify.shopify.rest.Product({ session: session });
        product.id = id;
        product.title = getProductFromPm.title;
        await product.save({
            update: true,
        });
        console.log("Data Updated");
        res.json({
            message: "Data Updated"
        });
    }
}

module.exports = {
    getAllProducts,
    getOneProduct,
    postProducts,
    deleteProduct,
    updateProduct
}