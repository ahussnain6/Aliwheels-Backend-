const express = require("express");
const router = express.Router();
const {getCategory,getProduct, uploadf,getOrders ,SellerData } = require("../controllers/auth-controller");
router.route("/upload").post(uploadf);
router.route("/getorders/:id").get(getOrders);
router.route("/category/:category").get(getCategory);
router.route("/product/:id").get(getProduct);
router.route("/data").post(SellerData);
module.exports = router; 