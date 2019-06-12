var passport = require('passport');
var localStrategy = require('passport-local').Strategy
var User = require('../models/user');
const Code = require("../models/codes");



passport.serializeUser(function(user, done) {
    done(null, user.id);
});



passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});



passport.use('local.register', new localStrategy({
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
        // user2 = newUser
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.matricNo = req.body.matricNo;
        newUser.department = req.body.department;
        newUser.cgpa = req.body.cgpa;
        newUser.gender = req.body.Gender;
        newUser.phoneNo = req.body.phoneNo;
        newUser.email = req.body.email;
        newUser.regNo = `BTA/  ${matricCode.slice(0, 2)}  ${deptCode} /  ${deptNum}  ${Backnum}`
        // newUser.index = user2
        
        newUser.password = newUser.hashPassword(req.body.password);


        newUser.save()
                .then(result =>{
                    console.log(result)
                    // req.flash("success", "you have successfully registered")
                    return done(null, newUser)

                })
                .catch(err =>{
                    return done(err)
                })

        // newUser.save(function(err) {
        //     if (err) {
        //         return done(err);
        //     }

        //     return done(null, newUser);
        // })

    })
}))

passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {

    User.findOne({ 'email': email }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            req.flash('loginError', "user Email not found")
            return done(null, false);

        };

        if (!user.validatePassword(req.body.password)) {
            req.flash("passwordError", "incorrect password")
            return done(null, false)
        };
        return done(null, user)

    })
}))

// code checking
// passport.use('local.registerCode', new localStrategy({
//     usernameField: 'code',
//     passwordField: '',
//     passReqToCallback: true
// }, function(req, code, password, done) {

//     Code.findOne({ 'code': code }, function(err, code) {
//         if (err) {
//             return done(err);
//         }
//         if (code) {
//             req.flash('codeExist', "code already Exist in the database ")

//             return done(null, false);

//         }

//         let newCode = new Code();
//         newCode.code = req.body.code;
//         newCode.save()
//                 .then(result =>{
//                     console.log(result)
//                     return done(null, newCode)

//                 })
//                 .catch(err =>{
//                     return done(err)
//                 })

        // newUser.save(function(err) {
        //     if (err) {
        //         return done(err);
        //     }

        //     return done(null, newUser);
        // })

    // })
// }))