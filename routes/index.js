var express = require('express');
var router = express.Router();
const controller = require("../controllers/frontendController")

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get("/", controller.homepage);
router.get("/register", controller.register);

module.exports = router;
