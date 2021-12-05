const accountService = require('./accountService');

exports.resister = async(req, res) => {
    const {email, password} = req.body;
    try {    
        const account = await accountService.resister(email, password);
        if(account){
            return res.render('checkout',{message: 'Success'});
        }
        else {
            return res.render('checkout',{message: 'Account is existed !!! Try again!'});
        }
    }
    catch(err){
        return res.render('checkout',{message: 'Something went wrong !!! Try again!'});
    }
}