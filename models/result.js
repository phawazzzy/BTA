let mongoose = require("mongoose");
let Schema = mongoose.Schema;
// autoIncrement = require('mongoose-auto-increment');

let resultSchema = new Schema({
    name: String,
    matricNo: String,
    department: String,
    score: String,
   
})


module.exports = mongoose.model("result", resultSchema)








