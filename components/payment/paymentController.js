const paymentService = require('./paymentService');

exports.payment = async(req,res)=>{
    const sohd = req.params.id;
    const payment = await paymentService.payment(sohd);
    let messageBill='Thanh toán thành công !!!';
    if(!payment){
        messageBill='Thanh toán không thành công !!!';
    }
    res.render('checkout', { messageBill} );
}

