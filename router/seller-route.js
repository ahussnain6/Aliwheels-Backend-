const express = require("express");
const router = express.Router();
const {SellerData,uploadf } = require("../controllers/seller-controller.js");
router.route("/upload").post(uploadf);
router.route("/data").post(SellerData);
module.exports = router; 