const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['SUV', 'Sedan', 'Hatchback', 'Electric', 'N Line'], // Optional: restrict categories
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/.test(v);
        },
        message: props => `${props.value} is not a valid image URL!`
      }
    }
  },
  { timestamps: true } // adds createdAt and updatedAt fields automatically
);

const car_logos = mongoose.model('car_logos', carSchema);

module.exports = car_logos;
