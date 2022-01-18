const {models} = require('../models');

exports.user_info = async(ID) => {
    try{
        const info = await models.khachhang.findOne({ where: {MAKH: ID}, raw: true });
        if(info.DIACHI){
            const address = info.DIACHI.split(",");
            info.STREET = address[0];
            info.DISTRICT = address[1];
            info.CITY = address[2];
        }
        let cartItems = null;
        let bill = null;
        const cart = info.IDCART;
        if(cart){
            cartItems = await models.giohang.findAll({
                where: {IDCART: cart},
                include: [{
                    model: models.sach,
                    as: 'MASACH_sach'
                }]
            });
            if(cartItems.length !== 0){
                bill = await createBill(info, cartItems)
            }
            if(!bill){
                return {info, cartItems: null, bill: null};
            }
        }
        return {info , cartItems, bill };
    }catch(err){
        return {info: null, cartItems: null, bill: null};
    }
};

exports.update_info = async(ID, info) => {
    const arr = [info.street, info.district, info.city];
    const address = arr.join(",");
    await models.khachhang.update(
        {
            TENKH: info.fullname,
            NGAYSINH: info.dob,
            DIENTHOAI: info.phone,
            DIACHI: address
        },
        {where: {MAKH: ID}}
    );
    await models.account.update(
        {
            OWNER: info.fullname,
        },
        {where: {ID: ID}}
    );
};

async function createBill(user, cartItems){
    try{
        let date_ob = new Date();
        const day = ("0" + date_ob.getDate()).slice(-2);
        const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        const year = date_ob.getFullYear();
        const hours = date_ob.getHours();
        const minutes = date_ob.getMinutes();
        const seconds = date_ob.getSeconds();
        const dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        const bill = await models.hoadon.create({
            MAKH: user.MAKH,
            NGAYLAPHD: dateTime,
            NGUOINHAN: user.TENKH,
            PHONE: user.DIENTHOAI,
            DIACHI: user.DIACHI
        })
        let totalBill = null;
        for(let item of cartItems)
        {
            const thanhtien = Number(item.SOLUONG)*Number(item.MASACH_sach.GIA);
            totalBill += thanhtien;
            const detailBill = await models.chitiethoadon.create({
                SOHD: bill.SOHD,
                MASACH: item.MASACH,
                SOLUONG: item.SOLUONG,
                DONGIA: item.MASACH_sach.GIA,
                THANHTIEN: thanhtien
            });
        }
        let info_bill = {
            SOHD: bill.SOHD,
            FULLNAME: bill.NGUOINHAN,
            ADDRESS: bill.DIACHI,
            PHONE: bill.PHONE
        }
        return { totalBill, info_bill };
    }catch(err){
        return { totalBill:null, info_bill: null};
    }
}