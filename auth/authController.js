const accountService = require('./authService');

exports.registerAndAuth = async (req, res) => {
    const {fullname, email, password} = req.body;
    try {    
        const account = await accountService.register(fullname, email, password);
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