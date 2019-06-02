let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: String,
    lastName: String,
    matricNo: String,
    cgpa: String,
    gender: String,
    phoneNo: String,
    email: String,
    password: String
})



userSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
};

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("user", userSchema)








