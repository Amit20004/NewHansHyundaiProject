const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler.js');
const CarEbrochure = require('../models/carEBrochure.js');

router.get('/car-ebrochure', asyncHandler(async (req, res) => {
    const car = await CarEbrochure.find({}); 
    res.status(200).json({
        message: "Car ebrochure Images fetched successfully",
        success: true,
        data: car
    });
}));

module.exports = router;
