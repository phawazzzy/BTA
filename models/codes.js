let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let codeSchema = new Schema({
    code: String,
    isRegistered: {
        type:Boolean,
        default: false,
    }
})

module.exports = mongoose.model("code", codeSchema)








