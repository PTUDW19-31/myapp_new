const {models} = require('../../models')

exports.list = (page = 0, itemPerPage = 9) => {
    return models.sach.findAll({ where: {STATUS: 'Active'}, offset: page*itemPerPage, limit: itemPerPage, raw: true });
};

exports.detail = (ItemID) => {
    return models.sach.findAll({
        where: {
            MASACH: ItemID
        }
    });
}