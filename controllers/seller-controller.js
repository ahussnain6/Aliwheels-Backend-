const seller = require("../models/seller-model");
const post = require("../models/post-model");
const SellerData = async (req, res) => {
  const { username, email, city } = req.body;
  try {
    const sellerExist = await seller.create({ username, email, city });
    res.status(201).json(sellerExist);
  } catch (error) {
    res.status(500).json({ msg: "registration failed" });
  }
};
const uploadf = async (req, res) => {
  const { color, company, sellerId, imgurl, Category, model, name, price } =
    req.body;
  try {
    const re = await post.create({
      color,
      company,
      sellerId,
      price,
      imgurl,
      Category,
      model,
      name,
    });
    res.json({ status: "ok", data: re });
  } catch (error) {
    res.json({ status: error });
  }
};
module.exports = { SellerData, uploadf };
