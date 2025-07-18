const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler.js');
const CarLogo = require('../models/carLogosModel.js');

router.get('/car-logos', asyncHandler(async (req, res) => {
    const logos = await CarLogo.find({}); 
    res.status(200).json({
        message: "Car logos fetched successfully",
        success: true,
        data: logos
    });
}));

module.exports = router;
