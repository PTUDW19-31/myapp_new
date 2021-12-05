const express = require('express');
const router = express.Router();
const passport = require('./passport');


router.post('/checkout',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/checkout',
    }),
);

module.exports = router;