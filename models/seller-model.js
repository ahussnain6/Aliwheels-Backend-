const mongoose = require("mongoose");
const sellerSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
});
const seller = new mongoose.model("Seller",sellerSchema);
module.exports = seller;