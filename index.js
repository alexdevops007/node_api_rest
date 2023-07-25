const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.use(express.json());

// routes
app.get("/", (req, res) => res.send("Hello World!"));

app.get("/blog", (req, res) => res.send("Hello Blog!"));

app.post("/product", (req, res) => {
  try {
    console.log(req.body);
    res.send(req.body);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// connection
mongoose
  .connect(
    "mongodb+srv://admin:<password>@devrestapi.8rky0xg.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () =>
      console.log(`Server up and running on port ${port}`.green.underline.bold)
    );
    console.log("connect to MongoDB".blue.italic.bold);
  })
  .catch((error) => console.log(error));
