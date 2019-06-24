let User = require("../models/user")


exports.dashboard = (req, res, next)=>{
    res.render("dashboard/homepage")
}

exports.adminReg = (req, res, next) =>{
    let success = req.flash("successs");
    let exist = req.flash("userExist")
    res.render("dashboard/register", {success, exist })
}


exports.adminLogin = (req, res, next)=>{
    let loginError = req.flash("loginError");
    let passwordError = req.flash("passwordError")
    let roleError = req.flash("roleError")
    res.render("dashboard/login", {loginError, passwordError, roleError})
}