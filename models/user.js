let mongoose = require("mongoose");
let bcrypt = require("bcrypt")
let Schema = mongoose.Schema;
// autoIncrement = require('mongoose-auto-increment');

let userSchema = new Schema({
    firstName: String,
    lastName: String,
    matricNo: String,
    department: String,
    cgpa: String,
    gender: String,
    phoneNo: String,
    email: String,
    password: String,
    role: String,
    index: Number,
    regNum: String,
    code: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

// userSchema.plugin(autoIncrement.plugin, 'user');



userSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
};

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("user", userSchema)








