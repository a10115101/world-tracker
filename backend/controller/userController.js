const User = require("../models/userModel");
const AppError = require("../utilities/appError");
const validator = require("../config/validator");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).exec();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).exec();

    if (!user) return next(new AppError("No document found with that ID", 404));

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  req.body = { ...req.body.updateMeObject };
  console.log(req.body);

  function cleanData(obj) {
    for (let prop in obj) {
      if (obj[prop] === "" || obj[prop] === null || obj[prop] === undefined) {
        delete obj[prop];
      }
    }
  }

  cleanData(req.body);

  console.log(req.body);

  const { error } = validator.updateUserDataValidate(req.body);

  if (error) return next(new AppError(`${error.details[0].message}`, 400));

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    if (!user) return next(new AppError("No document found with that ID", 404));

    res.status(200).json({
      status: "success",
      data: {
        update: user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).exec();

    if (!user) return next(new AppError("No document found with that ID", 404));

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
