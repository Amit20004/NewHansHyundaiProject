const mongoose = require("mongoose");

const carEbrochureSchema = new mongoose.Schema(
  {
    carModel: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    brochureUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

const CarEbrochure = mongoose.model("brochure_data", carEbrochureSchema);

module.exports = CarEbrochure;
