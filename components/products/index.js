var express = require('express');
var router = express.Router();
const ProductController = require('./productController');

/* GET home page. */
router.get('/', ProductController.list);

router.get('/:ProductID',ProductController.detail);
  
module.exports = router;