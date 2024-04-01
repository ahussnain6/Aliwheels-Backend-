const express = require("express");
const router = express.Router();
const {getProduct,getCategory } = require("../controllers/auth-controller.js");
router.route("/category/:category").get(getCategory);
router.route("/product/:id").get(getProduct);
module.exports = router;