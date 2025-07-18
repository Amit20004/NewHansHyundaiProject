const mongoose = require('mongoose');
const accessorySchema = new mongoose.Schema({
  model: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["Exterior", "Interior", "Electronics"],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: "INR"
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Accessory = mongoose.model("buyer-accessories", accessorySchema);

module.exports=Accessory;
