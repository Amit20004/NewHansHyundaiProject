const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    imageName: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Home_Services = mongoose.model("home_services", serviceSchema);

module.exports = Home_Services;
