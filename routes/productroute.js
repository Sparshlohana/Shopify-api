const router = require('express').Router();
const { getAllProducts, getOneProduct, postProducts, deleteProduct, updateProduct } = require('../controller/products');

router.get('/products', getAllProducts);
router.get('/products/:id', getOneProduct);
router.post('/product', postProducts);
router.get('/product/:id', deleteProduct);
router.put('/product/update/:id', updateProduct);

module.exports = router;