const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
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
      type: String,
      required: [true, "Record must hava date"],
    },
    status: {
      type: String,
      required: [true, "Record must hava status"],
      enum: ["plannig", "visited"],
    },
    rating: {
      type: String,
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
      // MongoDb: lng, lat
      // Leaflet: lat, lng
      coordinates: [Number],
    },
    description: {
      type: String,
      required: [true, "Record must hava description"],
    },
  },
  {
    timestamps: true,
  }
);

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
