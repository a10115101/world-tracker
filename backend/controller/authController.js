const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../models/userModel");
const AppError = require("../utilities/appError");
const validator = require("../config/validator");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.PASSPORT_JWT_SECRETE, {
    expiresIn: process.env.PASSPORT_JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  const { error } = validator.signupDataValidate(req.body);

  if (error) return next(new AppError(`${error.details[0].message}`, 400));

  try {
    const { username, email, password } = req.body;
    const isEmailExisted = await User.findOne({ email }).exec();

    if (isEmailExisted)
      return next(
        new AppError("This email is used. Please use another one!", 400)
      );

    const newUser = await User.create({
      username,
      email,
      password,
    });
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { error } = validator.loginDataValidate(req.body);

  if (error) return next(new AppError(`${error.details[0].message}`, 400));

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password").exec();

    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new AppError("Email or Paassword is wrong!", 401));

    const token = signToken(user._id);
    user.password = undefined;
    res.status(200).json({
      status: "success",
      token: `JWT ${token}`,
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getGoogleUser = async (req, res, next) => {
  try {
    if (!req.user) next(new AppError("You are not authenticated", 401));

    res.status(200).json({
      status: "success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  const passportJWT = passport.authenticate("jwt", {
    session: false,
  });

  passportJWT(req, res, next);
};

exports.protect = (req, res, next) => {
  if (!req.isAuthenticated())
    return next(new AppError("You are not authorized!", 401));
  next();
};
