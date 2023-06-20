const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { createRouter } = require("./routes/create");
const { updateRouter } = require("./routes/update");
const { getRouter } = require("./routes/get");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public"), { "Content-Type": "text/css" }));


app.use(createRouter);
app.use(updateRouter);
app.use(getRouter);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/home.html"));
  });

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/admin.html"));
  });

const start = async () => {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/products" );

  app.listen(3300, () => {
    console.log("Servers up");
  });
};
start();