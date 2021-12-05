const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {models} = require('../models');

passport.use(new LocalStrategy({
    usernameField: 'EMAIL',
    passwordField: 'PASSWORD'
    },
    async function(username, password, done) {
        const user = await models.account.findOne({ EMAIL: username, ROLE: 'User' }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!validPassword(user, password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
        });
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