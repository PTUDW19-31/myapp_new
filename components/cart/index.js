const express = require('express');
const router = express.Router();
const ProductController = require('./cartController');

/* GET cart page. */
router.get('/', ProductController.list);

module.exports = router;