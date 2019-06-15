let code = require("../models/codes")
let User = require("../models/user")
const qr = require('qr-image');
const fs = require('fs');
const url = require('url');
const crypto = require("crypto")
const async = require("async");
let mailSender = require("../config/mailer");
let showError = require("../config/errorHandlers");
let bcrypt = require("bcrypt")



exports.homepage = (req, res, next)=>{
    let usedCode = req.flash("usedCode")
    let inexistence = req.flash("inexistence")
    res.render("index", {title: "HOME", inexistence, usedCode})
};

exports.signup = (req, res, next) => {
    res.render("signup", {})
}

exports.validateCode = async (req, res, next) => {
    userCode = req.body.code;
    let codes =  await code.findOne({code:userCode})
   
     if (codes && codes.isRegistered == false){
        console.log(userCode)
        
        // req.flash("mustUse", `${userCode} code has been registered make sure you complete your registration 
        // immediately otherwise you will lose the validaty of the code thanks`)
        res.redirect(`/register/${userCode}`)
    } else if(codes && codes.isRegistered == true){
        req.flash("usedCode", `the pin "${userCode}" has been used, Try to login if you have an account`)
       res.redirect("/")
   } else{
       req.flash("inexistence", `the pin "${userCode}" doesn't exist`)
       res.redirect("/")
   }
}

exports.code =(req, res, next) =>{
    let pinposted = req.flash("pinposted")
    let pinExist = req.flash("pinExist")


    res.render("postcode", {pinposted, pinExist})
}


exports.postCode =  async(req, res, next)=>{
 let DATA = {
        code: req.body.code
    }
  let check =  await code.findOne({code: req.body.code})
        if (check){
            req.flash("pinExist", `the pin wasn't added to the DB because it exist already`)
            console.log("code exist already")
            res.redirect("/postcode", )
        }else{
            code.create(DATA).then(result=>{
                req.flash("pinposted", `the pin has been succefully added to the DB`)
                console.log("success")
                res.redirect("/postcode", )
             }).catch(err=>{
                console.log(err)
            })
        }
    }


exports.register = async (req, res, next)=>{
    let success = req.flash("success")
    let mustUse =req.flash("mustUse")
    let codegagan = req.params.userCode;
    let page = await code.findOne({code: codegagan, isRegistered: false})
    console.log(page)
    if (page){
    res.render("register", {title: "register", codegagan, mustUse, success})            
    } else {
        res.send('ole ni e oobii')
    }
    
}

exports.login = (req, res, next) => {
    let loginError = req.flash("loginError")
    let error = req.flash('PleaseLogin')
    let passwordError = req.flash('passwordError')
    res.render("login", { error, loginError, passwordError })
}

exports.profile = async (req, res, next) => {
    // code to check the index for a particular document
    let log = req.user.email
    let result = await User.find()
    var allId = result.map(function (array) {
        return array.email
    });

    let Backnum = allId.indexOf(log)
    console.log(allId.indexOf(log))

    // code to check the index for a particular document ends here

    let name = req.user.firstName + " " + req.user.lastName
    let email = req.user.email
    let phoneNO = req.user.phoneNo
    let gender = req.user.gender
    let matricCode = req.user.matricNo
    let department = req.user.department
    let deptCode = ""
    let deptNum = ""

    if (department == "computer science education") {
        deptCode = "CS"
        deptNum = "E0"
    } else if (department == "mathematics") {
        deptCode = "MT"
        deptNum = "10"

    } else if (department == "physics") {
        deptNum = "30"
        deptCode = "PH"
    } else if (department == "computer science") {
        deptNum = "40"
        deptCode = "CS"
    } else if (department == "chemistry") {
        deptCode = "CH"
        deptNum = "40"

    } else {
        deptCode = ""
    }
    res.render("profile", { title: "PROFILE", name, matricCode, gender, deptCode, phoneNO, email, department, result, deptNum, Backnum })
}

// qr code generator
exports.qrcode = (req, res, next) => {
    // Get the text to generate QR code
    let qr_txt = req.body.qr_text;
    console.log(qr_txt);
    // Generate a random file name 
    let qr_code_file_name = qr_txt + '.png';

    // Path where qr-code is saved
    const path = "./public/qr/" + qr_code_file_name;

    fs.exists(path, function (exists) {
        if (exists) {
            console.log("Qr-code Exists")
        }
        else {
            // Generate QR Code from text
            var qr_png = qr.imageSync(qr_txt, { type: 'png' })
            console.log("generated Qr-code")

            fs.writeFileSync(`./public/qr/${qr_code_file_name}`, qr_png, (err) => {
                if (err) {
                    console.log("err");
                }else{
                    console.log("barcode has been written")
                }

            })
        }
    });

    // Send the link of generated QR code
    res.send({
        'qr_img': `qr/${qr_code_file_name}`
    });

};

// get the forget password page 
exports.forget = (req, res, next) =>{
    let EmailSent = req.flash("EmailSent");
    let noUser = req.flash("noUser")
    res.render("forget", {EmailSent, noUser})
}
// post the password to the database
exports.postForget = (req, res, next) => {
    async.waterfall([
        // function to generate token
        function (done) {
            crypto.randomBytes(20, (err, buf)=>{
                let token = buf.toString("hex")
                done(err, token)
            });
        },
        // function to check if mail supplied exists and save the token
        function (token, done) {
            User.findOne({email: req.body.email}, (err, user)=>{
                if (!user){
                    req.flash("noUser", "No account with that address exists!");
                    return res.redirect("/forget")
                }
                let twenty4 =  3600000 * 24
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + twenty4; //expires in 24hour

                user.save((err)=>{
                    done(err, token, user);
                });
            });
        },

        function (token, user, done) {
            try {
                mailSender.sendMail({
                    template: "../views/email/forgot",
                    rx: req.body.email,
                    locals: {
                        username: user.name,
                        resetlink: `http://basictutoracedemy.herokuapp.com/reset/${token}`
                    }
                });
                console.log("success")
                req.flash("EmailSent", `Password  sent to ${user.email}`);
                done(null, "done")
            }catch(err){
                showError(req, "POST", "/forget", err);
                done(err, false)
            }
        } 
    ], function(err){
        if(err){
            return next(err);
        }
        res.redirect("/forget")

    })
}

// get the page to change the new password to your desired password
exports.reset = (req, res, next) =>{
    let success = req.flash("succces");
    let error = req.flash("error")
    User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}  }, (err, user)=>{

        if (!user) {
            req.flash("error", "Invalid user");
            return res.redirect("/forget");
        }
        res.render("reset", {token: req.params.token, success, error})
    });
}

// update the new password to your desired password
exports.postReset = async (req, res, next) => {
    try {
        let user = await User.findOneAndDelete(
            { resetPasswordToken: req.params.token, resetPasswordExpires:{$gt: Date.now()}},
            {$set: {password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)), resetPasswordToken: undefined }},
            {new: true});
            req.flash("success", "Your password reset was succesful, please login to continue")

            // send the new password users mail
            mailSender.sendFrom({
                template: "../views/email/reset",
                rx: user.email,
                locals: {
                    siteInfo: "Basic Tutor Academy",
                    loginInfo:{
                        name:user.name,
                        url: `${req.protocol}:${req.hostname}/login`

                    }
                }
            })
    } catch(err){
        showError(req, "POST", `/reset/${req.params.token}`, err);
    }
    res.redirect("/login");
}
