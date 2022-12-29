const router = require('express').Router();
const { getAllProducts, getOneProduct, postProducts, deleteProduct, updateProduct } = require('../controller/products');

router.get('/', getAllProducts);
router.get('/:id', getOneProduct);
router.post('/create', postProducts);
router.delete('/delete/:id', deleteProduct);
router.put('/update/:id', updateProduct);

module.exports = router;