let code = require("../models/codes")
let User = require("../models/user")

exports.homepage = (req, res, next)=>{
    User.find().then(result=>{
        
    }) 
    res.render("index", {title: "HOME"})
};

exports.signup = (req, res, next)=>{
    res.render("signup", {})
}

exports.validateCode = async(req, res, next)=>{
    userCode = req.body.code;
    let codes =  await code.findOne({code:userCode})
    if (codes 
        // && codes.isRegistered == true
        ){
        console.log(userCode)
        res.redirect("/register")
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


exports.register = (req, res, next)=>{
    let success = req.flash("success")

    res.render("register", {title: "register", success})
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
