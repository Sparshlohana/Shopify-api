const router = require('express').Router();
const { createOrder, getAllOrders, getOneOrder, updateOrder, deleteOrder } = require('../controller/orders');

router.post('/create', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOneOrder);
router.delete('/delete/:id', deleteOrder);
router.put('/update/:id', updateOrder);

module.exports = router;