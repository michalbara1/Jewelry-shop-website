const { User } = require("../models/user");
const express = require("express");

const router = express.Router();

router.post("/api/order", async (req, res) => {
  try {
    const { userId, productName, price, quantity } = req.body;

    // Find the user by their ID and update their cart in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const order = {
      productName,
      price,
      quantity,
    };

    user.transaction.push(order);
    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server error" });
  }
});

exports.updateTransactionRouter = router;


// הקוד החדש המעודכן
const ordersElement = document.getElementById("orders");

// Assuming you have retrieved the user object with the orders from the server response
const user = response.data; // Response from the server

// Clear the existing content of the "orders" element
ordersElement.innerHTML = "";

// Iterate over the transactions and create HTML elements for each order
user.transaction.forEach((transaction, index) => {
  const orderElement = document.createElement("div");
  orderElement.classList.add("order");

  // Create HTML elements to display the order number
  const orderNumberElement = document.createElement("span");
  orderNumberElement.textContent = "Order " + (index + 1);

  // Append the order number element to the order element
  orderElement.appendChild(orderNumberElement);

  // Iterate over the items in the transaction and create HTML elements for each item
  transaction.forEach((item) => {
    const itemName = Object.keys(item)[0];
    const itemDetails = item[itemName];

    const itemElement = document.createElement("div");
    itemElement.classList.add("item");

    // Create HTML elements to display the item details
    const itemNameElement = document.createElement("span");
    itemNameElement.textContent = "Product: " + itemName;

    const itemPriceElement = document.createElement("span");
    itemPriceElement.textContent = "Price: " + itemDetails.price;

    const itemQuantityElement = document.createElement("span");
    itemQuantityElement.textContent = "Quantity: " + (itemDetails.quantity || 1);

    // Append the item details to the item element
    itemElement.appendChild(itemNameElement);
    itemElement.appendChild(itemPriceElement);
    itemElement.appendChild(itemQuantityElement);

    // Append the item element to the order element
    orderElement.appendChild(itemElement);
  });

  // Append the order element to the "orders" element
  ordersElement.appendChild(orderElement);
});