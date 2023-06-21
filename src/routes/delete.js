const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();

router.delete("/api/deleteProduct", async (req, res) => {
  const { name } = req.body;
  try {
    const isExist = await Product.deleteOne({ name });

    if (!isExist.deletedCount) {
      return res.send("Item doesn't exist!");
    }

    res.send("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).send("Internal server error");
  }
});

exports.deleteRouter = router;
