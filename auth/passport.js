const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const account = require('../models/account');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    function(username, password, done) {
        account.findOne({ email: username }, function(err, user) {
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

function validPassword(user, password){
    return user.Password === password;
}

module.exports = passport;