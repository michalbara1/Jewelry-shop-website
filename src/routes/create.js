const { Product } = require("../models/product");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const upload = multer({ dest: path.join(__dirname, "../public/img/") });

router.post("/api/createProduct", async (req, res) => {
  const { name, price, image, quantity, category } = req.body;
  const isExist = await Product.findOne({ name });

  if (isExist) {
    return res.send("Item already exists");
  }
  const product = new Product({
    name,
    price,
    image,
    quantity,
    category,
  });
  await product.save();
  res.send(product);
});


router.post("/api/upload", upload.single("file"), (req, res) => {
  const fileName = req.file.filename + ".png";
  const filePath = path.join(__dirname, "../public/img", fileName);
  fs.renameSync(req.file.path, filePath);
  res.send({ fileName });
});


exports.createRouter = router;