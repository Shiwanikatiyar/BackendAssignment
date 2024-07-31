const mongoose = require('mongoose');

// structure of the document
const userSchema = mongoose.Schema({
    name:{type : String, required: true},
    age: {type : Number, required: true} ,
    city:{type : String, required: true},
},
{versionKey: false})

const Usermodel = mongoose.model("user", userSchema)

module.exports = Usermodel