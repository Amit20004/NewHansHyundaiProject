const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler.js');
const HomeCarousel = require('../models/homeCarousel.js');

router.get('/home-carousel', asyncHandler(async (req, res) => {
    const carouselImages = await HomeCarousel.find({}); 
    res.status(200).json({
        message: "Car Carousel Images fetched successfully",
        success: true,
        data: carouselImages
    });
}));

module.exports = router;
