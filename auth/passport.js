const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {sequelize, models} = require('../models');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    async function(username, password, done) {
        const user = await models.account.findOne({ where: {EMAIL: username, ROLE: 'User'}, raw: true });

        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!validPassword(user, password)) {
            return done(null, false, { message: 'Incorrect password.' });
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

module.exports = passport;