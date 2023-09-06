require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const MONGODB = process.env.MONGO_DATABASE.replace(
  "<PASSWORD>",
  process.env.MONGO_DATABASE_PASSWORD
);

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("MONGODB is connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.send("hello server");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
