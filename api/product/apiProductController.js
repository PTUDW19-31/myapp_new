const Comment = require('../../models/comment');
const {models} = require('../../models');

exports.comment = (req, res) => {
    const { MASACH, NOIDUNG } = req.body;
    // const MAKH = req.MAKH;

    const queryString = `INSERT INTO comment (ID, MASACH, MAKH, NOIDUNG, CREATE_AT, UPDATE_AT) VALUES ('001', '${MASACH}', '001', '${NOIDUNG}', 'null', 'null')`;
    Comment.query(queryString, function (err) {
        if (err) {
            res.status(500).json({
                message: 'Creating comment failed',
                error:err
            });
        }
        else {
            res.status(201).json(comment);
        }
    })
}

exports.getComment = (req, res) => {
    const productId = req.params.productId;
    Comment.find({productId})
        .then((comment) => {
            res.status(200).json(comment);
        })
        .catch((error) => {
            res.status(500).json({
                status: 'fail',
                message: error.message,
            })
        })
}

exports.addcart = async(req, res) => {
    const masach = req.body.masach;
    try{
        if(!req.user){
            const findunID = await models.unknowcart.findOne({ where: { UNID: req.session.unID } });
            if(!findunID){
                const unID = await models.unknowcart.create({
                    UNID: req.session.unID
                });
                const cart = await models.giohang.create({
                    IDCART: unID.IDCART,
                    MASACH: masach,
                    SOLUONG: 1
                });
                res.status(200).json(cart);
            }
            else{
                const findbook = await models.giohang.findOne({ where: {IDCART: findunID.IDCART, MASACH: masach} })
                if(!findbook){
                    const cart = await models.giohang.create({
                        IDCART: findunID.IDCART,
                        MASACH: masach,
                        SOLUONG: 1
                    })
                    res.status(200).json(cart);
                }
                else{
                    const cart = await models.giohang.update({SOLUONG: Number(findbook.SOLUONG) + 1},{where: {IDCART: findbook.IDCART, MASACH: masach}});
                    res.status(200).json(cart);
                }
            }
        }
        else{
            const userCart = await models.khachhang.findOne({where: {MAKH: req.user.accountID}});
            if(userCart.IDCART){
                const findbook = await models.giohang.findOne({ where: {IDCART: userCart.IDCART, MASACH: masach} });
                if(!findbook){
                    const cart = await models.giohang.create({
                        IDCART: userCart.IDCART,
                        MASACH: masach,
                        SOLUONG: 1
                    })
                    res.status(200).json(cart);
                }
                else{
                    const cart = await models.giohang.update({SOLUONG: Number(findbook.SOLUONG) + 1},{where: {IDCART: findbook.IDCART, MASACH: masach}});
                    res.status(200).json(cart);
                }
            }
            else{
                const unID = await models.unknowcart.create({
                    UNID: req.session.unID
                });
                const cart = await models.giohang.create({
                    IDCART: unID.IDCART,
                    MASACH: masach,
                    SOLUONG: 1
                })
                const updateCart = await models.khachhang.update({IDCART: cart.IDCART},{where: {MAKH: req.user.accountID}});
                res.status(200).json(updateCart);
            }
        }
    } catch(err) {
        res.status(500).json({
            message: 'Add Failed',
            error:err
        });
    }
}

exports.updatequantity = async(req,res) => {
    const userID = (req.user ? req.user.accountID : req.session.unID);
    const id = req.params.id;
    const quantity = req.body.quantity;
    try{
        let cart = await models.unknowcart.findOne({ where: { UNID: userID } });
        if(!cart){
            cart = await models.khachhang.findOne({ where: { MAKH: userID } });
        }
        let IDcart = cart.IDCART
        const update = await models.giohang.update({SOLUONG: quantity},{where: {IDCART: IDcart, MASACH: id}});
        res.status(200).json(update);
    }catch(err){
        res.status(500).json({
            message: 'update Failed',
            error:err
        });
    }
    
}

exports.getUpdatequantity = async(req,res) => {
    const userID = (req.user ? req.user.accountID : req.session.unID);
    const id = req.params.id;
    try{
        let cart = await models.unknowcart.findOne({ where: { UNID: userID } });
        if(!cart){
            cart = await models.khachhang.findOne({ where: { MAKH: userID } });
        }
        let IDcart = cart.IDCART
        const number = await models.giohang.findOne({where: {IDCART: IDcart, MASACH: id}});
        res.status(200).json(number.SOLUONG);
    }catch(err){
        res.status(500).json({
            message: 'update Failed',
            error:err
        });
    }
}