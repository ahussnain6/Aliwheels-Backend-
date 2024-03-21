const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    color:{
        type:String,
        require:true
    },
    company:{
        type:String,
        require:true
    },
    sellerId:{
        type:String,
        require:true
    },
    UserId:{
        type:String,
        require:true
    },
    imgurl:{
        type:String,
        require:true
    },
    model:{
        type:String,
        require:true
    },
    Category:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
})
const cart = new mongoose.model("Cart",cartSchema);
module.exports = cart;