var express = require('express');
var router = express.Router();
var passport = require('passport');
const controller = require("../controllers/frontendController");
let user = require("../models/user")



router.get("/", controller.homepage);
router.get("/postcode", controller.code);
router.post("/check", controller.postCode);
router.post("/ValCode", controller.validateCode);
router.get("/signup", controller.signup);

router.get("/register/:userCode", controller.register);
router.get("/login", controller.login)
router.get("/profile", isLoggedIn, controller.profile)

router.post('/register/students', passport.authenticate('local.register', {
    successRedirect: "/profile",
    failureRedirect: "/register",
    failureFlash: true
}));

router.post('/login/Students', passport.authenticate('local.login', {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
}));



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else{
    req.flash("PleaseLogin", "Please login to continue")
    res.redirect("/login");
    }
}

router.get("/logout", function(req, res) {
    req.logout()
    res.redirect("/login")
})


module.exports = router;



