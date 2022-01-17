var express = require('express');
var productController = require('../components/products/productController')
var router = express.Router();

/* GET home page. */
router.get('/', productController.listNewProduct)

// function(req, res, next) {
//   res.render('index', { title: 'Welcom! || Asbab - eCommerce' });
// });

/* GET cart page. */
router.get('/cart', function(req, res, next) {
  res.render('cart', { title: 'Cart || Asbab - eCommerce' });
});
router.post('/cart/add')

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact || Asbab - eCommerce' });
});


module.exports = router;
