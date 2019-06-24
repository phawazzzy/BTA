var express = require('express');
var router = express.Router();
var passport = require('passport');
const controller = require("../controllers/frontendController");
const dashController = require("../controllers/dashboardController");
let user = require("../models/user")



router.get("/", controller.homepage);
router.get("/postcode", controller.code);
router.post("/check", controller.postCode);
router.post("/ValCode", controller.validateCode);
router.get("/signup", controller.signup); 
router.post('/qrcode', controller.qrcode);
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

router.get('/forget', controller.forget);
router.post('/forget', controller.postForget);
router.get('/reset/:token', controller.reset);
router.post('/reset/:token', controller.postReset);



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() && req.user.role == "student") {
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

//
// DASHBOARB ROUTES

router.get("/dashboard", adminLoggedIn, dashController.dashboard)
router.get('/dashboard/adminReg', dashController.adminReg);
router.get('/dashboard/adminLogin', dashController.adminLogin);


 
router.post('/register/admin', passport.authenticate('local.adminregister', {
    successRedirect: "/dashboard",
    failureRedirect: "/dashboard/adminReg",
    failureFlash: true
}));

router.post('/login/admin', passport.authenticate('local.adminLogin', {
    successRedirect: "/dashboard",
    failureRedirect: "/dashboard/adminLogin",
    failureFlash: true
}));

function adminLoggedIn(req, res, next) {
    if (req.isAuthenticated() && req.user.role == "admin") {
        return next()
    } else{
    req.flash("PleaseLogin", "Please login to continue")
    res.redirect("/dashboard/adminLogin");
    }
}

router.get("/adminlogout", function(req, res) {
    req.logout()
    res.redirect("/dashboard/adminLogin")
})




module.exports = router;



