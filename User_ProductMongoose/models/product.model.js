const mongoose = require('mongoose');

// structure of the document
const productSchema = mongoose.Schema({
    name:{type : String, required: true},
    price: {type : Number, required: true} ,
    description:{type : String, required: true},
},
{versionKey: false})

const Productmodel = mongoose.model("product", productSchema)

module.exports = Productmodel