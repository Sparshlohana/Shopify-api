const router = require('express').Router();
const { createOrder, getAllOrders, getOneOrder, updateOrder, deleteOrder } = require('../controller/orders');

router.get('/order', createOrder);
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOneOrder);
router.get('/order/:id', deleteOrder);
router.get('/order/update/:id', updateOrder);

module.exports = router;