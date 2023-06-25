const { User } = require("../models/user");
const express = require("express");

const router = express.Router();

router.post("/api/addTransaction", async (req, res) => {
  try {
    const { userId, productName, price ,transactionNumber} = req.body;

    // Find the user by their ID and update their cart in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    transactionNumber = user.transactions

    
    const cart = user.cart;
    cart[productName] = {
      price,
    };
    user.cart = cart;
    user.markModified("cart");
    console.log(user);
    await user.save();

    res.send(user);
  } catch (error) {
    console.log("error");
    res.status(500).send({ error: "Server error" });
  }
});

exports.updateCartRouter = router;