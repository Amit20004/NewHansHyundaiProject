const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler.js');
const car_carousel = require('../models/carCarouselModel.js');

router.get('/car-carousel', asyncHandler(async (req, res) => {
    const car = await car_carousel.find({}); 
    res.status(200).json({
        message: "Car Carousel Images fetched successfully",
        success: true,
        data: car
    });
}));

module.exports = router;
