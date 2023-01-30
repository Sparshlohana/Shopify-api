const router = require('express').Router();
const { getTransaction, postTransaction } = require('../controller/transactions');

// /transaction
router.get('/getTransaction/:id', getTransaction);

router.post('/postTransaction', postTransaction);

module.exports = router