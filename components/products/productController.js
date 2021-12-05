const productService = require('./productService');

exports.list = async (req, res) => {
    let {page} = req.query;
    page = Math.max(parseInt(page) || 1,1)

    var priceStr = req.query.price;
    let priceMin = 10;
    let priceMax = 500;
    if (priceStr) {
        var priceAtr = priceStr.split(/-/g);    
        priceMin = parseInt(priceAtr[0].slice(1,4)) || 10;
        priceMax = parseInt(priceAtr[1].slice(2,5)) || 500;
    }
    const products = await productService.list(page, priceMin, priceMax);
    //!isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0
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
