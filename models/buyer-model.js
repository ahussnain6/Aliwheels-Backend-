const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const BuyerSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
})
BuyerSchema.pre("save",async function(next){
    const buyer = this;
    if(!buyer.isModified("password")){
     next();
    }
    try{
     const saltRound = await bcrypt.genSalt(10);
     const hashpassword = await bcrypt.hash(buyer.password,saltRound);
     buyer.password = hashpassword;
    }
    catch(error){
        next(error);
    }
})
BuyerSchema.methods.generateToken =async function (){
try{
return jwt.sign({
buyerId :this._id.toString(),
email:this.email,
isAdmin:this.isAdmin,
},
process.env.JWTKEY,{
    expiresIn :"30d",
}
)
}catch(error){
    console.error(error);
}
}
const Buyer = new mongoose.model("Buyer",BuyerSchema);
module.exports = Buyer;