const mongoose = require("mongoose");
const carCarouselSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // e.g., "Hyundai Alcazar"
      trim: true,
    },
    description: {
      type: String,
      required: true, // e.g., "A premium SUV offering bold looks..."
    },
    price: {
      type: String,
      required: true, // e.g., "16 77 500"
    },
    engine: {
      type: String,
      required: true, // e.g., "2.0 l MPi Petrol\n1.5 l Diesel"
    },
    transmission: {
      type: String,
      required: true, // e.g., "6-Speed Manual\n6-Speed Automatic"
    },
    imageUrl: {
      type: String,
      required: true, // e.g., "/assets/car_Carousel/alcazar1.webp"
    },
  },
  {
    timestamps: true,
  }
);

const car_carousel = mongoose.model("car_carousel", carCarouselSchema);

module.exports = car_carousel;
