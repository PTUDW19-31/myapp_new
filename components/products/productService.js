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
    return models.sach.findAll({
        where: {
            MASACH: ItemID
        }
    });
}