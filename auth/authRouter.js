const express = require('express');
const router = express.Router();
const passport = require('./passport');


router.post('/checkout',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/checkout',
    }),
    function (req, res) {
        if(req.user)
            res.redirect('/');
        else
            res.redirect('/checkout');
    }
);

module.exports = router;