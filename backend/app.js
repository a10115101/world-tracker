require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

require("./config/passport");
const passport = require("passport");

const authRouter = require("./routers/authRouters");
const userRouter = require("./routers/userRouters");
const recordRouter = require("./routers/recordRouters");
const friendRouter = require("./routers/friendRouters");

const AppError = require("./utilities/appError");
const errorController = require("./controller/errorController");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());

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

app.use("/api/v1/auth", authRouter);
app.use(passport.authenticate("jwt", { session: false }));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/records", recordRouter);
app.use("/api/v1/friends", friendRouter);

app.all("*", (req, res, next) => {
  next(new AppError("Can't find the api on this server", 404));
});

app.use(errorController);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
