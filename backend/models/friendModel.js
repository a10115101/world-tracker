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

frinedSchema.pre(/^find/, function (next) {
  this.populate("recipient", ["username", "photo"]).select("-__v");
  next();
});

module.exports = mongoose.model("Friend", frinedSchema);
