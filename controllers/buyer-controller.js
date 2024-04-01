const Buyer = require("../models/buyer-model");
const cart = require("../models/cart-model");

const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const sendMail = async (req, res) => {
  const email = req.params.email;
  const { name, company, price, color } = req.body;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });
  var mailOptions = {
    from: process.env.email,
    to: `${email}`,
    subject: "Car Booking Confirmation",
    text: `Your reservation for the ${company} ${name} in the vibrant ${color}
    has been duly acknowledged and appreciated. We sincerely value your trust in us. Rest assured, your chosen vehicle priced at USD ${price} and will be promptly delivered to you within the stipulated timeframe. Warm regards from the team at AliWheels.com.`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
const Buyerlogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const buyerveri = await Buyer.findOne({ email });
    if (!buyerveri) {
      res.status(400).json({ msg: "Invalid Credientials" });
    }
    const isValid = await bcrypt.compare(password, buyerveri.password);
    if (isValid) {
      res.status(200).json({
        email: buyerveri.email,
        msg: "Login Successful",
        token: await buyerveri.generateToken(),
        buyerId: buyerveri._id.toString(),
      });
    } else {
      res.status(400).json({ msg: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error);
  }
};

const BuyersignUp = async (req, res) => {
  const { username, email, phone, password } = req.body;
  try {
    const buyerExist = await Buyer.findOne({ email });
    if (buyerExist) {
     return res.status(400).json({msg:"Email Already Exists"});}
     const buyercreated = await Buyer.create({
      username,
      email,
      phone,
      password,
    });
   return res.status(201).json({
      email: buyercreated.email,
      token: await buyercreated.generateToken(),
      buyerId: buyercreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }
};

const addtocart = async (req, res) => {
  const {
    color,
    company,
    sellerId,
    UserId,
    imgurl,
    Category,
    model,
    name,
    price,
  } = req.body;
  try {
    const re = await cart.create({
      color,
      Category,
      company,
      sellerId,
      UserId,
      price,
      imgurl,
      model,
      name,
    });
    res.json({ status: "ok", data: re });
  } catch (error) {
    console.log(error);
  }
};
const cartdata = async (req, res) => {
  const id = req.params.id;
  try {
    const cartdata = await cart.find({ UserId: id });
    res.json(cartdata);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addtocart,
  Buyerlogin,
  BuyersignUp,
  sendMail,
  cartdata,
};
