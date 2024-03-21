const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs")
const cart = require("../models/cart-model");
const post = require("../models/post-model");
const Buyer = require("../models/buyer-model");
const seller = require("../models/seller-model");
const addtocart = async(req,res)=>{
    console.log(req.body);
        const {color,company,sellerId,UserId,imgurl,Category,model,name,price} = req.body;
        try {
          const re = await cart.create({color,Category,company,sellerId,UserId,price,imgurl,model,name});
          res.json({status:"ok",data:re});
        } catch (error) {
       res.json({status:error})      
        }}



const BuyersignUp = async(req,res)=>{
  const {username,email,phone,password} = req.body;
    try { const buyerExist = await Buyer.findOne({email});
        if(buyerExist){
            res.status(400).json({msg:"Email Already Exists"}); }
        const buyercreated = await Buyer.create({username,email,phone,password});
        res.status(201).json({
          email:buyercreated.email,
          msg:buyercreated,
          token:await buyercreated.generateToken(),
          buyerId:buyercreated._id.toString()
        });
    } catch (error) { res.status(500).json({msg:"registration failed"}); } }
    const Buyerlogin = async (req,res)=>{
      const { email , password } = req.body;
        try {const buyerveri = await Buyer.findOne({email});
        if(!buyerveri){
          res.status(400).json({msg:"Invalid Credientials"});}
        console.log(buyerveri.password);
        const isValid = await bcrypt.compare(password,buyerveri.password);
        if(isValid){  
               res.status(200).json({
                email:buyerveri.email,
                msg:"Login Successful",
                token:await buyerveri.generateToken(),
                buyerId:buyerveri._id.toString()});
            console.log("login successfully");
            }else{res.status(400).json({msg:"Internal Server Error"})}
        } catch (error) {  console.log(error); }     }




const SellerData =async (req,res)=>{
    const {username,email,city} = req.body;
try {
    const sellerExist = await seller.create({username,email,city});
    res.status(201).json(sellerExist);
} catch (error) {
    res.status(500).json({msg:"registration failed"})
}
}
const sendMail =async(req,res)=>{
   const email = req.params.email;
   const {name,company,price,color} = req.body;
   console.log(req.body);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      host:"smtp.gmail.com",
      port:587,
      secure:false,
      auth: {
        user: 'alisgroup70@gmail.com',
        pass: process.env.password,
      }
    });
    
    var mailOptions = {
      from: 'alisgroup70@gmail.com',
      to: `${email}`,
      subject: 'Car Booking Confirmation',
      text: `Your Car ${company} ${name} Of Color ${color} has been booked of Price USD.${price}.Thanks For Trusting us. Your Car will be Delivered In few Days. Best Regards , AliWheels.com`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 
}
const getCategory =async(req,res)=>{
  const category = req.params.category;
  console.log(category);
try {
  if(category === "All"){
    const dat = await post.find({});
    res.json(dat);
  }
    const data = await post.find({Category:category});
    res.json(data);
    console.log(data);
} catch (error) {
    console.log(error);
}
}
const getOrders = async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    try {
        const getorders = await cart.find({sellerId:id});
    } catch (error) {
        
    }
}
// const Sellerlogin = async (req,res)=>{
//     try {
//         const {email,password} = req.body;
//         const sellerveri = await seller.findOne({email});
//          if(!sellerveri){
//             res.status(400).json({msg:"Invalid Credientials"});
//          }
//          const isValid = await sellerveri.comparePassword(password);
//         if(isValid){
//             res.status(200).json({msg:"Login Successful",token:await sellerveri.generateToken(),
//         sellerId:sellerveri._id.toString()});
//         }else{
// res.status(400).json({msg:"Internal Server Error"})
//         }
//     } catch (error) {
        
//     }

// }
//     const user = async (req,res)=>{
//         try {            
// const userData = req.user;
// console.log(userData);
// return res.status(200).json({userData});
//         } catch (error) {
//             console.log(`error from user route ${error}`)
//         }
//     }
    const uploadf = async(req,res)=>{
        // console.log(req.body);
        const {color,company,sellerId,imgurl,Category,model,name,price} = req.body;
         try {const re = await post.create({color,company,sellerId,price,imgurl,Category,model,name});
           res.json({status:"ok",data:re});
           console.log(re);
         } catch (error) {
            res.json({status:error});
         } }
  const DelCart = async(req,res)=>{
   const id = req.params.id;
   console.log(id);
   try {
    
   } catch (error) {
    
   }
  } 
const cartdata =async(req,res)=>{
    const id = req.params.id;
  try {
    const cartdata = await cart.find({UserId:id});
        res.json(cartdata);
 console.log(cartdata);
  } catch (error) {
    console.log(error);
  }
}

const getProduct =async(req,res)=>{
 const id = req.params.id;
 try {
    const item = await post.findOne({_id:id});
    res.json(item);
    console.log(item);
 } catch (error) {
     }
    }
// },Sellerlogin ,SellersignUp
module.exports = {DelCart,cartdata,getOrders,SellerData  ,getCategory,addtocart,uploadf,Buyerlogin,getProduct,BuyersignUp,sendMail};