const {models} = require('../../models')
const { QueryTypes } = require('sequelize');


exports.payment = async(sohd) => { 
    const update = await models.hoadon.update({STATUS: 'Đã thanh toán'}, {where: {SOHD: sohd}});
    const cart = await models.hoadon.findOne({
        where: {SOHD: sohd},
        include: [{
            model: models.khachhang,                
            as: 'MAKH_khachhang'
        }]
    })
    await models.giohang.destroy({where: {IDCART: cart.MAKH_khachhang.IDCART}});
    return update;
};
