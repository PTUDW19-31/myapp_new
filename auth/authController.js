const accountService = require('./authService');

exports.resister = async(req, res) => {
    const {fullname, email, password} = req.body;
    try {    
        const account = await accountService.resister(fullname, email, password);
        if(account){
            res.render('checkout',{message: 'Success'});
            return res.redirect('/login');
        }
        else {
            return res.render('checkout',{message: 'Account is existed !!! Try again!'});
        }
    }
    catch(err){
        return res.render('checkout',{message: 'Something went wrong !!! Try again!'});
    }
}