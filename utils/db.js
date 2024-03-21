const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;
const dbConnect = async () => {
  try {
    await mongoose.connect(URI);
    console.log(`Connection successful at db`);
  } catch (error) {
    console.log(`Error at connection DB`);
  }
};
module.exports = dbConnect;
