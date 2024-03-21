require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer");
const PORT = 5000;
const cors = require("cors");
const router = require("./router/buyer-router");
const dbConnect = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");
const sellerrouter = require("./router/seller-route");
const post = require("./models/post-model");
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,};
app.use(cors(corsOptions));
app.use(express.json());
app.use(errorMiddleware);
app.use("/Buyer",router);
app.use("/Seller",sellerrouter);
app.use("/get",sellerrouter);
app.get("/upload-image",async (req,res)=>{
  try {
    const products = await post.find({});
    res.status(200).send(products);}
     catch (error) {  res.status(500).send(error); }})
dbConnect().then(()=>{
app.listen(PORT,()=>{
  console.log(`server is listening at ${PORT}`);
}) });