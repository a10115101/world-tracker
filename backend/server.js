require("dotenv").config();
require("./config/passport");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const passport = require("passport");
const rateLimit = require("express-rate-limit");
const session = require("express-session");

const authRouter = require("./routers/authRouters");
const userRouter = require("./routers/userRouters");
const recordRouter = require("./routers/recordRouters");
const friendRouter = require("./routers/friendRouters");
const AppError = require("./utilities/appError");
const setting = require("./config/setting");
const authController = require("./controller/authController");
const errorController = require("./controller/errorController");

const app = express();
const port = process.env.PORT || 3000;

app.set("trust proxy", 1);

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(helmet(setting.helmetSetting()));
app.use(cors(setting.corsSetting()));
app.use("/public/users/", express.static("public/users"));
app.use(mongoSanitize());
app.use(express.json());
app.use(cookieParser());
app.use(session(setting.sessionSetting()));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", rateLimit(setting.rateLimitSetting()));
app.use(compression());

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
