const productService = require('./productService');

exports.list = async (req, res) => {
    const itemPerPage = 6;
    let {page} = req.query;
    let {cat_id} = req.query
    let {search} = req.query;
    page = Math.max(parseInt(page) || 1,1);
    cat_id = parseInt(cat_id) || -1;
    var price = req.query.price || "$0 - $500";
    var priceSort = req.query.priceSort || "";
    var priceAtr = price.split(/-/g);    
    priceMin = Math.max(parseInt(priceAtr[0].slice(1,4)), 0);
    priceMax = Math.min(parseInt(priceAtr[1].slice(2,5)), 500);
    
    const products = await productService.list(page, priceSort, cat_id, search, priceMin, priceMax, itemPerPage);
    const Categories = await productService.getCategory()
    //!isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0
    const TotalPage = Math.ceil(products.count/itemPerPage) > page ? Math.ceil(products.count/itemPerPage) : page 
    const pagItems = paginationFunc(page, TotalPage);
    res.render('productGrid', { products: products.rows, pagItems, price, priceSort, Categories, cat_id, search });
}

exports.listNewProduct = async (req, res) => {
    const newProduct = await productService.getNewProduct();
    res.render('index', { title: 'Welcom! || Asbab - eCommerce', newProduct });
}
exports.detail = async (req, res) => {
    let ItemID = '1';
    try {
        ItemID = req.params.ProductID; 
        const productDetail = await productService.detail(ItemID); 
        const bookCategory = await productService.getBookCategory(ItemID)
        res.render('productDetail', { productDetail, bookCategory });
    } catch(error) {
        res.render('error', { error });
    } 
};

paginationFunc = (page, totalPage) => {
    var current = page,
        last = totalPage,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                if(l+1 === current)
                    rangeWithDots.push({item: l + 1, cur: true});
                else
                    rangeWithDots.push({item: l + 1, cur: false});
            } else if (i - l !== 1) {
                rangeWithDots.push({item: '...', cur: false});
            }
        }
        if(i === current)
            rangeWithDots.push({item: i, cur: true});
        else
            rangeWithDots.push({item: i, cur: false});
        l = i;
    }

    return rangeWithDots;
};

