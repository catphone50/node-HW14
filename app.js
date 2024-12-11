import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import Category from "./models/Category.js";
import Product from "./models/Product.js";

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.post("/categories", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const category = new Category({ name });

  category
    .save()
    .then((savedCategory) => {
      res.status(201).json(savedCategory);
    })
    .catch((error) => {
      console.error("Error saving category:", error);
      res.status(500).json({ error: "Failed to save category" });
    });
});

app.post("/products", (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res
      .status(400)
      .json({ error: "Name, price, and category are required" });
  }

  const product = new Product({ name, price, category });

  product
    .save()
    .then((savedProduct) => {
      res.status(201).json(savedProduct);
    })
    .catch((error) => {
      console.error("Error saving product:", error);
      res.status(500).json({ error: "Failed to save product" });
    });
});

app.get("/products", (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
