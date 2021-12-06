const express = require('express');
const router = express.Router();
const passport = require('./passport');
const authController = require('./authController')

router.get('/', (req,res) => {
    res.render('checkout', {wrongLogin: req.query.wrongLogin !== undefined})
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/checkout',
        failureRedirect: '/checkout?wrongLogin',
    }),
);

router.post('/register', (req, res) => {
    authController.resister;

})
router.get('/logout', (req, res) => {
    req.logout();
});

module.exports = router;