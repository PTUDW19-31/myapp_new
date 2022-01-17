const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {sequelize, models} = require('../models');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
    },
    async function(req, username, password, done) {
        const user = await models.account.findOne({ where: {EMAIL: username, ROLE: 'User'}, raw: true });

        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!validPassword(user, password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        if (!updateCART(req,user)){
            return done(null, false, { message: 'Something went wrong! Try again.' });
        }
        return done(null, user);
        
    }
));

passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    async function(req, email, password, done) {
        let user = await models.account.findOne({ where: {EMAIL: email}, raw: true });
        if(user){
            return done(null, false, {message: 'Email is already register!'});
        }
        try {
            await sequelize.transaction(async (transaction) => {
        
                const hashPassword = await bcrypt.hash(password, 10);
                user = await models.account.create({
                    EMAIL: email,
                    PASSWORD: hashPassword,
                    OWNER: req.body.fullname,
                }, {transaction });
                if(user.ID){
                    await models.khachhang.create({
                        MAKH: user.ID,
                        TENKH: user.OWNER,
                    }, { transaction }); 
                }
                if (!updateCART(req,user)){
                    return done(null, false, { message: 'Something went wrong! Try again.' });
                }
                return done(null, user);
            });
        } catch (err) {
            console.log(err); 
            throw err;
        }
    }
));

passport.serializeUser(function(user, done) {
    done(null, {accountID: user.ID, owner: user.OWNER});
});
  
passport.deserializeUser(function(user, done) {
    return done(null, user);
});

function validPassword(user, password){
    return bcrypt.compare(password, user.PASSWORD);
}

async function updateCART(req, user){
    const cart = await models.unknowcart.findOne({where: {UNID: req.session.unID}});
    const kh = await models.khachhang.findOne({where: {MAKH: user.ID}});
    if(cart){
        if(kh.IDCART){
            let flag = true;
            const sach = await models.giohang.findAll({where: {IDCART: cart.IDCART}, raw: true});
            for(let item of sach){
                const findbook = await models.giohang.findOne({where: {IDCART: kh.IDCART, MASACH: item.MASACH}});
                if(!findbook){
                    const updateCart = await models.giohang.update({IDCART: kh.IDCART},{where: {IDCART: cart.IDCART, MASACH: item.MASACH}});
                    flag = (updateCart ? true : false);
                }
                else{
                    const updateCart = await models.giohang.update({SOLUONG: Number(findbook.SOLUONG) + 1},{where: {IDCART: kh.IDCART, MASACH: item.MASACH}});
                    const deleteCart = await models.giohang.destroy({where: {IDCART: cart.IDCART, MASACH: item.MASACH}});
                    flag = ((updateCart && deleteCart) ? true : false);
                }
            }
            return flag;
        }
        const updateCart = await models.khachhang.update({IDCART: cart.IDCART},{where: {MAKH: user.ID}});
        return updateCart ? true : false;
    }
    return true;
}

module.exports = passport;