const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  launchDate: {
    type: String,
    required: true
  },
  fuelType: {
    type: String,
    required: true,
    enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric']
  },
  transmission: {
    type: String,
    required: true,
    enum: ['Manual', 'Automatic', 'AMT', 'CVT']
  },
  images: {
    type: [String], // 👈 Array of strings for image paths or URLs
    required: true,
    validate: [arrayLimit, '{PATH} must have at least 1 image']
  },
  features: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Custom validator for minimum 1 image
function arrayLimit(val) {
  return val.length > 0;
}

const CarPrice = mongoose.model('price-listings', carSchema);
module.exports=CarPrice;
