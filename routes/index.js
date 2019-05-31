var express = require('express');
var router = express.Router();
const controller = require("../controllers/frontendController")

router.get("/", controller.homepage);
router.get("/postcode", controller.code)
router.post("/check", controller.postCode)

module.exports = router;



