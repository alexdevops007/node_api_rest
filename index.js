const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const password = require("./password.json");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// routes

/* GET all products */
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* GET product by Id */
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* POST create product */
app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

/* PUT edit product */
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    // cannot find any product in database
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    const updateProduct = await Product.findById(id);
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* DELETE product */
app.delete("/products/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// connection
mongoose
  .connect(
    `mongodb+srv://admin:${password.password}@devrestapi.8rky0xg.mongodb.net/Node-API?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, () =>
      console.log(`Server up and running on port ${port}`.green.underline.bold)
    );
    console.log("connect to MongoDB".blue.italic.bold);
  })
  .catch((error) => console.log(error));
