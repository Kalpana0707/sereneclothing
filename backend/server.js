const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://admin:1234@cluster0.ru4yb8w.mongodb.net/shop")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const orderSchema = new mongoose.Schema({
  items: Array,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.post("/order", async (req, res) => {
  const newOrder = new Order({ items: req.body });
  await newOrder.save();
  console.log("Saved in DB");
  res.json({ message: "Order saved in DB" });
});

app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});