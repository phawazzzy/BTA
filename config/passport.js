var passport = require('passport');
var localStrategy = require('passport-local').Strategy
var User = require('../models/user');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {

    User.findOne({ 'email': email }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            req.flash('userExist', "email already Exist ")

            return done(null, false);

        }

        let newUser = new User();
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.matricNo = req.body.matricNo;
        newUser.cgpa = req.body.cgpa;
        newUser.gender = req.body.gender;
        newUser.phoneNo = req.body.phoneNo;
        newUser.email = req.body.email;
        newUser.password = newUser.hashPassword(req.body.password);

        newUser.save(function(err) {
            if (err) {
                return done(err);
            }

            return done(null, newUser);
        })

    })
}))