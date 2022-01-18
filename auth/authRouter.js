const express = require('express');
const router = express.Router();
const passport = require('./passport');
const authService = require('./authService');

router.get('/', async(req,res) => {
    if(req.user) {
        const {info, cartItems, bill} = await authService.user_info(req.user.accountID);

        return res.render('checkout',{info, cartItems, bill});
        //return res.render('checkout',{user_info});
    }
    res.render('checkout', { wrongLogin: req.query.wrongLogin !== undefined,
                            wrongSignup: req.query.wrongSignup !== undefined
                            });
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/checkout',
        failureRedirect: '/checkout?wrongLogin',
    }),
);

router.post('/register', 
    passport.authenticate('local-signup', {
        successRedirect: '/checkout',
        failureRedirect: '/checkout?wrongSignup',
    }),
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/checkout');
});

router.post('/info/update', async(req, res) => {
    await authService.update_info(req.user.accountID, req.body);
    req.user.owner = req.body.fullname;
    res.redirect('/checkout');
});

module.exports = router;