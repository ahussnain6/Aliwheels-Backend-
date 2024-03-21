const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
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
    price:{
        type:String,
        require:true
    },
    Category:{
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
    name:{
        type:String,
        require:true
    },
})
const post = new mongoose.model("Postcar",postSchema);
module.exports = post;