const mongoose = require("mongoose");
const bycrpt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User must have name!"],
      minlength: [2, "Username length must greater than or equal to 2!"],
      maxlength: [20, "Username length must less than or equal to 20!"],
    },
    email: {
      type: String,
      required: [true, "User must have email!"],
      unique: true,
      lowercase: true,
    },
    googleID: {
      type: String,
    },
    photo: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "Friend" }],
    password: {
      type: String,
      required: [
        function () {
          return this.googleID === null;
        },
        "User must have password!",
      ],
      minlength: [8, "Password length must greater than or equal to 8!"],
      maxlength: [20, "Password length must less than or equal to 20!"],
      select: false,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "gender only can be male or female",
      },
    },
    birthday: {
      type: Date,
      max: [Date.now(), "Birthday can not over today"],
    },
    language: {
      type: String,
      enum: {
        values: ["zh", "en"],
        message: "language only can be Chinese or English",
      },
    },
    introduction: {
      type: String,
      maxlength: [100, "Introduction length must less than or equal to 100!"],
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.correctPassword = async (inputtedPassword, userPassword) => {
  return await bycrpt.compare(inputtedPassword, userPassword);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bycrpt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
