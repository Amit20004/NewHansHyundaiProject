const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler.js');
const HomeService = require('../models/homeServiceModel.js');

router.get('/home-service', asyncHandler(async (req, res) => {
    const service = await HomeService.find({}); 
    res.status(200).json({
        message: "Services images fetched successfully",
        success: true,
        data: service
    });
}));

module.exports = router;
