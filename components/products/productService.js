const {models} = require('../../models')
const { Op } = require("sequelize");

exports.list = async(page = 1, priceSort, cat_id, search, priceMin, priceMax, itemPerPage) => { 
    var condition = ''
    if (search) {
        condition = search
    }
    if (cat_id >= 0) {
        var book = await models.sach_has_category.findAll({
            where: {CATEGORY_ID: cat_id},
            raw: true,
            attributes: ['MASACH'],
        })
    }
    else {
        book = await models.sach.findAll({
            raw: true,
            attributes: ['MASACH']
        })
    }
    let book_id = []
    for (const id of book) {
        book_id.push(id.MASACH);
    }
    let ord = ['MASACH']
    if (priceSort != '')
        ord = ['GIA', priceSort]
    return models.sach.findAndCountAll({ 
        where: {STATUS: 'Active', 
                GIA: {[Op.between]: [priceMin, priceMax]},
                MASACH: {[Op.in]: book_id},
                TENSACH: {[Op.like]: '%'+condition+'%'},
            }, 
        order: [ord],
        offset: (page-1)*itemPerPage, 
        limit: itemPerPage, raw: true });
};

exports.detail = (ItemID) => {
    return models.sach.findOne({
        where: {
            MASACH: ItemID
        },
        include: [{
            model: models.chitietsach, 
            as: 'chitietsach',
        }],
    });
}

exports.getBookCategory = async(ItemID) => {
    return models.sach_has_category.findAll({
        where: {
            MASACH: ItemID,
        },
        include: [{
            model: models.category,
            as: 'CATEGORY'
        }],
    })
}
exports.getCategory = async() => {
    let cat = await models.category.findAll({raw: true})
    cat.push({CATEGORY_ID: -1, NAME: 'Default'})
    return cat
}
exports.getNewProduct = async() => {
    return models.sach.findAll({
        where: {STATUS: 'Active'},
        order: [['MASACH', 'DESC']],
        limit: 8,
        raw: true
    })
}