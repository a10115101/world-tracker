const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
    continent: {
      type: String,
      required: [true, "Record must hava continent"],
    },
    country: {
      type: String,
      required: [true, "Record must hava country"],
    },
    countryCode: {
      type: String,
      required: [true, "Record must hava country code"],
    },
    cityName: {
      type: String,
      required: [true, "Record must hava city name"],
    },
    date: {
      type: Date,
      required: [true, "Record must hava date"],
      validate: {
        validator: function (val) {
          if (this.get("status") === "visited") return val < Date.now();

          if (this.get("status") === "planning") return val > Date.now();
        },
        message: "Record must be valid date",
      },
    },
    status: {
      type: String,
      required: [true, "Record must hava status"],
      enum: {
        values: ["planning", "visited"],
        message: "Status only can be planning or visited",
      },
    },
    rating: {
      type: Number,
      required: function () {
        return this.status === "visited";
      },
      min: 1,
      max: 5,
    },
    position: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    description: {
      type: String,
      required: [true, "Record must hava description"],
      minlength: [
        1,
        "Record's description length must greater than or equal to 1!",
      ],
      maxlength: [
        100,
        "Record's description length must less than or equal to 100!",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Record", recordSchema);
