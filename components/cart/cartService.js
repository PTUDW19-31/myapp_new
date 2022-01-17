const {models} = require('../../models')
const { QueryTypes } = require('sequelize');


exports.list = async(req) => { 
    if(!req.user){
        const cart = await models.unknowcart.findOne({where: {UNID: req.session.unID}});
        if(!cart){
            return null;
        }
        return models.giohang.findAll({
            where: {IDCART: cart.IDCART},
            include: [{
                model: models.sach,                
                as: 'MASACH_sach'
            }]
        });
    }
    const cart = await models.khachhang.findOne({where: {MAKH: req.user.accountID}});
    if(!cart.IDCART){
        return null;
    }
    return models.giohang.findAll({
        where: {IDCART: cart.IDCART},
        include: [{
            model: models.sach,
            as: 'MASACH_sach'
        }]
    });
};
