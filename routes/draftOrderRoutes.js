const router = require('express').Router();
const { getAllDraftOrders, getSingleDraftOrder, createDraftOrder, deleteDraftOrder, updateDraftOrder } = require('../controller/draftOrder');

router.get('/', getAllDraftOrders);
router.get('/:id', getSingleDraftOrder);
router.post('/create', createDraftOrder);
router.delete('/delete/:id', deleteDraftOrder);
router.put('/update/:id', updateDraftOrder);

module.exports = router;