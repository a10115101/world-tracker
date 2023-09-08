const mongoose = require("mongoose");

const frinedSchema = new mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: Number,
      enums: [0, 1, 2, 3],
    },
  },
  { timestamps: true }
);

const Friend = mongoose.model("Friend", frinedSchema);

module.exports = Friend;
