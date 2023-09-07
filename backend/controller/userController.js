const User = require("../models/userModel");
const validator = require("../config/validator");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).exec();

    res.status(200).json({
      status: "succeed",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec();

    if (!user)
      return res.status(404).json({
        status: "fail",
        message: {
          message: "No document found with that ID",
        },
      });

    res.status(200).json({
      status: "succeed",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { error } = validator.registerValidation(req.body);

  if (error)
    return res
      .status(400)
      .json({ status: "fail", message: error.details[0].message });

  const { username, email, password, passwordConfirm } = req.body;

  try {
    const newUser = await User.create({
      username,
      email,
      password,
      passwordConfirm,
    });

    res.status(201).json({
      status: "succeed",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { error } = validator.updateUserValidation(req.body);

  if (error)
    return res
      .status(400)
      .json({ status: "fail", message: error.details[0].message });

  const { username, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    if (!user)
      return res.status(404).json({
        status: "fail",
        message: {
          message: "No document found with that ID",
        },
      });

    res.status(200).json({
      status: "succeed",
      data: {
        update: user,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).exec();

    if (!user)
      return res.status(404).json({
        status: "fail",
        message: {
          message: "No document found with that ID",
        },
      });

    res.status(204).json({
      status: "succeed",
      data: null,
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};
