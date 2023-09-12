require("dotenv").config();

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

require("./config/passport");
const passport = require("passport");

const authRouter = require("./routers/authRouters");
const userRouter = require("./routers/userRouters");
const recordRouter = require("./routers/recordRouters");
const friendRouter = require("./routers/friendRouters");

const AppError = require("./utilities/appError");
const errorController = require("./controller/errorController");
const authController = require("./controller/authController");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRETE,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

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
app.use(authController.isAuth);
app.use(authController.protect);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/records", recordRouter);
app.use("/api/v1/friends", friendRouter);
app.all("*", (req, res, next) => {
  next(new AppError("Can't find the url on this server", 404));
});

app.use(errorController);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
