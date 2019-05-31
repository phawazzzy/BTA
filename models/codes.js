let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let codeSchema = new Schema({
    code: String
})

module.exports = mongoose.model("code", codeSchema)








