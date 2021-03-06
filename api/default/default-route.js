const express = require('express');
const router = express.Router();
const { index, routeInvalid, errorHandler, method } = require('./fedault-controller');

router.use(method);
router.get('/', index);
router.all('*', routeInvalid);
router.use(errorHandler);

module.exports = router; 


