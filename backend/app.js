require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routers/userRouters");
const recordRouter = require("./routers/recordRouters");

const app = express();
app.use(express.json());

const MongoDB = process.env.MONGO_DATABASE.replace(
  "<PASSWORD>",
  process.env.MONGO_DATABASE_PASSWORD
);

mongoose
  .connect(MongoDB)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/v1/users", userRouter);
app.use("/api/v1/records", recordRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
