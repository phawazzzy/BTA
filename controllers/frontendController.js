
exports.homepage = (req, res, next)=>{
    res.render("index", {title: "HOME"})
}

exports.register = (req, res, next)=>{
    res.render("register", {title: "register"})
}