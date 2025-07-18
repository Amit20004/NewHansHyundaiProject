const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler.js');
const CarPrice = require('../models/carPriceListingModel.js');

router.get('/car-price', asyncHandler(async (req, res) => {
    const car = await CarPrice.find({}); 
    res.status(200).json({
        message: "Car price listing data fetched successfully",
        success: true,
        data: car
    });
}));

module.exports = router;
