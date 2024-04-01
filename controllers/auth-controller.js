const cart = require("../models/cart-model");
const post = require("../models/post-model");
const getCategory = async (req, res) => {
  const category = req.params.category;
  try {
    if (category === "All") {
      const dat = await post.find({});
      res.json(dat);
    }
    const data = await post.find({ Category: category });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const item = await post.findOne({ _id: id });
    res.json(item);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getCategory, getProduct };
