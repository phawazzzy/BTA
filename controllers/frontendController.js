let code = require("../models/codes")

exports.homepage = (req, res, next)=>{
    

    res.render("index", {title: "HOME"})
}

exports.code =(req, res, next) =>{

    res.render("postcode")
}


exports.postCode = async (req, res, next)=>{
    let DATA = {
        code: req.body.code
    }

    await code.create(DATA)
    

    res.render("postcode", {success})
}
