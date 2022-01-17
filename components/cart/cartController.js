const cartService = require('./cartService');

exports.list = async(req,res)=>{
    const products = await cartService.list(req);
    res.render('cart', { products } );
}