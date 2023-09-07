const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const validator = require("../config/validator");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.PASSPORT_JWT_SECRETE, {
    expiresIn: process.env.PASSPORT_JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  const { error } = validator.signupDataValidate(req.body);

  if (error)
    return res
      .status(400)
      .json({ status: "fail", message: error.details[0].message });

  const { username, email, password } = req.body;

  try {
    const isEmailExisted = await User.findOne({ email }).exec();

    if (isEmailExisted)
      return res.status(400).json({
        status: "fail",
        message: "This email is used. Please use another one!",
      });

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
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.login = async (req, res) => {
  const { error } = validator.loginDataValidate(req.body);

  if (error)
    return res
      .status(400)
      .json({ status: "fail", message: error.details[0].message });

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password").exec();

  if (!user || !(await user.correctPassword(password, user.password)))
    return res.status(401).json({
      status: "fail",
      message: "Email or Paassword is wrong!",
    });

  const token = signToken(user._id);

  user.password = undefined;

  return res.status(200).json({
    status: "success",
    token: `JWT ${token}`,
    user,
  });
};
