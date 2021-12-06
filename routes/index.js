var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcom! || Asbab - eCommerce' });
});

/* GET cart page. */
router.get('/cart', function(req, res, next) {
  res.render('cart', { title: 'Cart || Asbab - eCommerce' });
});

/* GET home page. */
router.get('/wishlist', function(req, res, next) {
  res.render('wishlist', { title: 'Wishlist || Asbab - eCommerce' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact || Asbab - eCommerce' });
});


module.exports = router;
