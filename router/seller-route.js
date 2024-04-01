const express = require("express");
const router = express.Router();
const {SellerData,uploadf } = require("../controllers/seller-controller.js");
router.route("/upload").post(uploadf);
// router.route("/getorders/:id").get(getOrders);
// router.route("/category/:category").get(getCategory);
// router.route("/product/:id").get(getProduct);
router.route("/data").post(SellerData);
module.exports = router; 