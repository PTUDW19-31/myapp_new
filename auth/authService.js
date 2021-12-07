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
        return info;
    }catch(err){
        return null;
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
};