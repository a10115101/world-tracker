const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/userModel");
const validator = require("../config/validator");
const AppError = require("../utilities/appError");
const inputDataProcessor = require("../utilities/inputDataProcessor");

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.compressUserPhoto = async (req, res, next) => {
  try {
    if (!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
    req.body.photo = req.file.filename;

    await sharp(req.file.buffer)
      .resize(300, 300)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/users/${req.file.filename}`);

    next();
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const { username } = req.query;
    const users = await User.find({
      username: { $regex: `${username}` },
    }).exec();

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
  try {
    const processedData = inputDataProcessor.user(req.body);
    const { error } = validator.updateUserDataValidate(processedData);

    if (error) return next(new AppError(`${error.details[0].message}`, 400));

    const user = await User.findByIdAndUpdate(req.params.id, processedData, {
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
