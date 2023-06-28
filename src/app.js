const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { createRouter } = require("./routes/create");
const { updateRouter } = require("./routes/update");
const { getRouter } = require("./routes/get");
const { signinRouter } = require("./routes/signin");
const { deleteRouter } = require("./routes/delete");
const { updateCartRouter } = require("./routes/cart");
const { Product } = require("./models/product");
const { transactionRouter } = require("./routes/transaction");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/public",
  express.static(path.join(__dirname, "public"), { "Content-Type": "text/css" })
);

app.use(updateCartRouter);
app.use(createRouter);
app.use(updateRouter);
app.use(getRouter);
app.use(signinRouter);
app.use(transactionRouter);
app.use(deleteRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"));
});

app.get('/Contact', (req, res) => {
  res.sendFile(path.join(__dirname, "./views/contact.html"));
});

app.get('/About', (req, res) => {
  res.sendFile(path.join(__dirname, "./views/about.html"));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, "./views/signup.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/admin.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/login.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/cart.html"));
});

app.get("/shop", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/shop.html"));
});
app.get("/myOrders", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/myOrders.html"));
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    res.status(500).json({ error: true, message: "Failed to fetch products" });
  }
});


app.get("/d3", async (req, res) => {
  try {
    const products = await Product.find({}, { name: 1, quantity: 1, _id: 0 });

    res.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    res.status(500).json({ error: true, message: "Failed to fetch products" });
  }
});


const start = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1/WebApp1'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    console.log("Connected to MongoDB");

    app.listen(3300, () => {
      console.log("Server is running on port 3300");
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

start();
