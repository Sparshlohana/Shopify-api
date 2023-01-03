const router = require('express').Router();
const { createOrderRisk, getAllProductRisk, getSingleProductRisk, updateOrderRisk, deleteOrderRisk } = require('../controller/orderRisk');

router.post('/create/:id', createOrderRisk);
router.get('/:id', getAllProductRisk);
router.get('/getSingleProduct:id', getSingleProductRisk);
router.put('/update/:id', updateOrderRisk);
router.delete('/delete/:id', deleteOrderRisk);

module.exports = router;