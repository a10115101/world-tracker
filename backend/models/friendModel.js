const mongoose = require("mongoose");

const frinedSchema = new mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: Number,
      enums: {
        values: [0, 1, 2, 3],
        message: "Friendship only can be 4 status",
      },
    },
  },
  { timestamps: true }
);

frinedSchema.pre(/^find/, function (next) {
  this.populate("recipient", ["username", "photo"]).select("-__v");
  next();
});

module.exports = mongoose.model("Friend", frinedSchema);
