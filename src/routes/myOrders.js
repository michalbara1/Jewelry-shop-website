const { User } = require("../models/user");
const express = require("express");

const router = express.Router();

router.post("/api/order", async (req, res) => {
  try {
    const { userId, productName, price, quantity } = req.body; // Add quantity to the destructured variables

    // Find the user by their ID and update their cart in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const transaction = user.transaction;
    transaction[productName] = {
      price,
      quantity, // Add quantity to the transaction object
    };
    user.transaction = transaction;
    user.markModified("transaction");
    await user.save();

    res.send(user);
  } catch (error) {
    console.log("error");
    res.status(500).send({ error: "Server error" });
  }
});

exports.updateTransactionRouter = router;
