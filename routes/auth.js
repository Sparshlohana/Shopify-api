const router = require('express').Router();
const shopify = require('../controller/auth.controller');

router.get('/auth', shopify.authControllerStartPoint);
router.get('/auth/callback', shopify.authControllerEndPoint);

module.exports = router;