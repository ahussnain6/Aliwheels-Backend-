require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
// const {uploadf } = require("../controllers/seller-controller.js");
const router = require("./router/buyer-router");
const dbConnect = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");
const sellerrouter = require("./router/seller-route");
const productrouter = require("./router/product-router");
const post = require("./models/post-model");
const corsOptions = {
  origin: "*",
  methods: "GET, POST, PUT, DELETE, PATCH,HEAD",
  credentials: true,};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/Buyer",router);
app.use(errorMiddleware);
app.use("/Seller",sellerrouter);
app.use("/get",productrouter);
app.get("/",(req,res)=>{
  res.end("Working Successfully");
})
app.get("/upload-image",async (req,res)=>{
  try {
    const products = await post.find({});
    res.status(200).send(products);}
     catch (error) {  res.status(500).send(error); }})
dbConnect().then(()=>{
app.listen(PORT,()=>{
  console.log(`server is listening at ${PORT}`);
}) });
