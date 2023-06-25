const mongoose = require("mongoose");
const productScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Rings", "Necklaces", "Bracelets"],
    required: true,
  },
  quantity: {
    type: Number
  }
});
const Product = mongoose.model("product", productScheme);

exports.Product = Product;