const productService = require('./productService');

exports.list = async (req, res) => {
    const products = await productService.list(!isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);
    res.render('productGrid', { products });
}

exports.detail = async (req, res) => {
    let ItemID = '001';
    try {
        ItemID = req.params.ProductID; 
        const productDetail = await productService.detail(ItemID); 
        res.render('productDetail', { productDetail });
    } catch(error) {
        res.render('error', { error });
    } 
};