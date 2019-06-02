var express = require('express');
var router = express.Router();
const controller = require("../controllers/frontendController");
let code = require("../models/codes")


router.get("/", controller.homepage);
router.get("/postcode", controller.code);
router.post("/check", controller.postCode);
router.post("/ValCode", controller.validateCode);
router.get("/signup", controller.signup);

router.get("/register", controller.register);

module.exports = router;



