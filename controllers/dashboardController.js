let User = require("../models/user")
let Result = require("../models/result");


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

exports.post_result = (req, res, next)=>{
    let submit = req.flash("submitted")
    res.render("dashboard/post_result", {submit})
}

exports.sub_result = (req, res, next)=>{
    let data ={
        name: req.body.name,
        matricNo: req.body.matricNo,
        department: req.body.department,
        score: req.body.score,
    }

    try {
        Result.create(data)
        req.flash("submitted", "score submitted")
    } catch (err) {
        console.log(err)
    }
    res.redirect("/post_result")
}

exports.student = (req, res, next)=>{
    User.find()
        // .select('matricNo email _id ')
        // .where({role: "student"})
        .exec()
        .then(docs =>{
            res.status(200).json({
                doc: docs.map(result =>{
                    return{
                        firstname: result.firstName,
                        lastname: result.lastName
                    }
                })
            })
        }).catch(err=>{
            console.log(err)
            res.status(401)
        })
    
};




