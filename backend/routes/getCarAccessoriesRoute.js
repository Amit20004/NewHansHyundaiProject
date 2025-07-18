const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler.js');
const car = require('../models/carAccessoriesModel.js');

router.get('/car-accessories', asyncHandler(async (req, res) => {
    const carAccessories = await car.find({}); 
    res.status(200).json({
        message: "Car Carousel Images fetched successfully",
        success: true,
        data: carAccessories
    });
}));

module.exports = router;
