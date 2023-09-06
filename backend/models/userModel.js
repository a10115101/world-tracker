const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User must have name"],
      minlength: [2, "Username length must greater than or equal to 2"],
      maxlength: [20, "Username length must less than or equal to 20"],
    },
    email: {
      type: String,
      required: [true, "User must have email"],
      unique: true,
      lowercase: true,
    },
    googleID: {
      type: String,
    },
    photo: String,
    friends: [String],
    password: {
      type: String,
      required: [true, "User must have password"],
      minlength: [8, "Password length must greater than or equal to 8"],
      maxlength: [20, "Password length must less than or equal to 20"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
