const express = require('express');
const router = express.Router();
const passport = require('./passport');

router.get('/', (req,res) => {
    res.render('checkout', { wrongLogin: req.query.wrongLogin !== undefined,
                            wrongSignup: req.query.wrongSignup !== undefined});
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

module.exports = router;