var express = require('express');
var router = express.Router();
var passport = require('passport');
// var localStrategy = require('passport-local').Strategy
const controller = require("../controllers/frontendController");
// let code = require("../models/codes")
let user = require("../models/user")



router.get("/", controller.homepage);
router.get("/postcode", controller.code);
router.post("/check", controller.postCode);
router.post("/ValCode", controller.validateCode);
router.get("/signup", controller.signup);

<<<<<<< HEAD
=======
router.get("/register", controller.register);
router.get("/profile", controller.profile)

router.post('/register/students', passport.authenticate('local.register', {
    successRedirect: "/",
    failureRedirect: "/signup",
    failueFlash: true
}));


>>>>>>> 320ce92526bf420cafe4fbfaa02a01c3898aa3eb

module.exports = router;



