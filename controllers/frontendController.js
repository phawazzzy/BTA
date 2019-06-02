let code = require("../models/codes")

exports.homepage = (req, res, next)=>{
    res.render("index", {title: "HOME"})
};

exports.signup = (req, res, next)=>{
    res.render("signup", {})
}

exports.validateCode = async(req, res, next)=>{
    userCode = req.body.code;
    let codes =  await code.findOne({code:userCode})
    if (codes && codes.isRegistered == true){
        console.log(userCode)
        res.render("signup", {})
    } else{
    res.redirect("/")
    }
}

exports.code =(req, res, next) =>{
    res.render("postcode")
}


exports.postCode = async (req, res, next)=>{
    let DATA = {
        code: req.body.code
    }

    await code.create(DATA)
    

    res.render("postcode", {})
}
