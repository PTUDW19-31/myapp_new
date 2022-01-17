const {models} = require('../../models')
const { Op } = require("sequelize");

exports.list = (page = 1, priceMin, priceMax, itemPerPage = 9) => { 
    return models.sach.findAndCountAll({ 
        where: {STATUS: 'Active', 
                GIA: {[Op.between]: [priceMin, priceMax]}}, 
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
        where: {MASACH: ItemID},
        raw: true
    })
}

exports.getNewProduct = async() => {
    return models.sach.findAll({
        order: [['MASACH', 'DESC']],
        limit: 8,
        raw: true
    })
}