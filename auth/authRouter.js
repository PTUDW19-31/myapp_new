const express = require('express');
const router = express.Router();
const passport = require('./passport');

router.get('/', function (req, res) {
    res.render('../views/checkout');
});


router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/checkout',
    }),
);

router.get('/logout', (req, res) => {
    req.logout();
});

module.exports = router;