const router = require('express').Router();
const shopify = require('../controller/shopify.controller');

router.get('/auth', shopify.authControllerStartPoint);
router.get('/auth/callback', shopify.authControllerEndPoint);

module.exports = router;