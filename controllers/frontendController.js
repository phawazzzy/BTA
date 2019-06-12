let code = require("../models/codes")
let User = require("../models/user")
const url = require('url');

exports.homepage = (req, res, next)=>{
    let usedCode = req.flash("usedCode")
    let inexistence = req.flash("inexistence")
    res.render("index", {title: "HOME", inexistence, usedCode})
};

exports.signup = (req, res, next)=>{
    res.render("signup", {})
}

exports.validateCode = async(req, res, next)=>{
    userCode = req.body.code;
    let codes =  await code.findOne({code:userCode})
   
     if (codes && codes.isRegistered == false){
        console.log(userCode)
        code.findOneAndUpdate({code: userCode}, {isRegistered: true}, {upsert: true})
        .catch((err)=>{console.log(err)})
        .then(()=>{
            req.flash("mustUse", `${userCode} code has been registered make sure you complete your registration 
            immediately otherwise you will lose the validaty of the code thanks`)
            res.redirect("/register".split("?").shift())

        })
    } else if(codes && codes.isRegistered == true){
        req.flash("usedCode", `the code ${userCode} has been used, Try to login if you have an account`)
       res.redirect("/")
   } else{
       req.flash("inexistence", `the code ${userCode} doesn't exist`)
       res.redirect("/")
   }
}

exports.code =(req, res, next) =>{
    let codeExist = req.flash("codeExist")

    res.render("postcode", {codeExist})
}


exports.postCode =  async(req, res, next)=>{
    let DATA = {
        code: req.body.code
    }
    await code.create(DATA)
    res.render("postcode", {})
}


exports.register = (req, res, next)=>{
    let success = req.flash("success")
    let mustUse =req.flash("mustUse")
    // let cancel = req.path
    // const myURL = new URL(`${req.protocol}://${req.hostname}:3000${req.originalUrl}`)
    // console.log(myURL)
    // myURL.pathname = "/change"
    // console.log(myURL.href)
    console.log(url.resolve(`${req.protocol}://${req.hostname}:3000${req.originalUrl}`, "change"))
    res.render("register".split("_", 3).shift(), {title: "register", mustUse, success})
}

exports.login = (req, res, next)=>{
    let loginError = req.flash("loginError")
    let error = req.flash('PleaseLogin')
    let passwordError = req.flash('passwordError')
    res.render("login", {error, loginError, passwordError})
}

exports.profile = async(req, res, next)=>{
    // code to check the index for a particular document
    let log = req.user.email
    let result = await User.find()
    var allId = result.map(function(array){
        return array.email
    });

    let Backnum = allId.indexOf(log)
    console.log(allId.indexOf(log))

    // code to check the index for a particular document ends here

    let name = req.user.firstName +  " " + req.user.lastName
    let email = req.user.email
    let phoneNO = req.user.phoneNo
    let gender = req.user.gender
    let matricCode = req.user.matricNo
    let department = req.user.department
    let deptCode = ""
    let deptNum = ""

    if (department == "computer science education"){
         deptCode = "CS"
         deptNum = "E0"
    }else if (department == "mathematics"){
         deptCode = "MT"
         deptNum = "10"

    } else if(department == "physics"){
         deptNum = "30"
         deptCode = "PH"
    }else if(department == "computer science"){
         deptNum = "40"
         deptCode = "CS"
    }else if (department == "chemistry"){
         deptCode = "CH"
         deptNum = "40"

    }else{
        deptCode = ""
    }    
    res.render("profile", {title: "PROFILE", name, matricCode, gender, deptCode, phoneNO, email, department, result, deptNum, Backnum})
}

// function validateCode(){
//      userCode = req.body.code;
//     let codes =  await code.findOne({code:userCode})
//     if (codes && codes.isRegistered == true
//         ){
//         console.log(userCode)
//         res.redirect("/register")
//     } else{
       
//         code.findOneAndUpdate({code: userCode}, {isRegistered: true}, {upsert: true})
//             .catch((err)=>{console.log(err)})
//             .then(()=>{
//                 req.flash("must use", "this code has been registered make sure you complete your registration immediately otherwise you will lose the validaty of the code thanks")
//                 res.redirect("/register")
//             })
//     }
// }