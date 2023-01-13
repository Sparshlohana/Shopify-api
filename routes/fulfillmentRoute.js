const router = require('express').Router();
const { createFulfillment } = require('../controller/fulfillment');

router.post('/createFulfillment/:id', createFulfillment)

module.exports = router;