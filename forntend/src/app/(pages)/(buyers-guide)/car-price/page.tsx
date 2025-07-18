'use client'
import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';
import BreadCrumbs from '@/app/components/BreadCrumbs';
import AnimatedButton from '@/app/components/AnimatedButton';
const PriceListingPage = () => {
  // Filter states
  const img = new Image();
  const [selectedImages, setSelectedImages] = useState({});
  const [carPrice, setCarPrice]=useState([]);
  const [selectedModel, setSelectedModel] = useState('All Models');
  const [selectedFuel, setSelectedFuel] = useState('All Fuel Types');
  const [selectedTransmission, setSelectedTransmission] = useState('All Transmissions');
  const [selectedVariant, setSelectedVariant] = useState('All Variants');
  // Dropdown visibility states
  const [showVariantAlert, setShowVariantAlert] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showFuelDropdown, setShowFuelDropdown] = useState(false);
  const [showTransmissionDropdown, setShowTransmissionDropdown] = useState(false);
  const [showVariantDropdown, setShowVariantDropdown] = useState(false);

  // Data
  const carModels = ['All Models', 'Hyundai Creta', 'Toyota Urban Cruiser Hyryder', 'Mahindra Scorpio N'];
  const fuelTypes = ['All Fuel Types', 'Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const transmissions = ['All Transmissions', 'Manual', 'Automatic', 'CVT', 'DCT'];

  // Variant data organized by fuel type
  const variantsData = {
    'Petrol': [
      'All Variants',
      '1.5 I MPi 6-Speed Manual - E (₹11.10 Lakh)',
      '1.5 I MPi 6-Speed Manual - EX (₹12.32 Lakh)',
      '1.5 I MPi MT EX(O) (₹12.97 Lakh)',
      '1.5 I MPi 6-Speed Manual - S (₹13.53 Lakh)',
      '1.5 I MPi IVT EX(O) (₹14.37 Lakh)',
      '1.5 I MPi 6-Speed Manual - S(O) (₹14.46 Lakh)',
      '1.5 I MPi Manual - S(O) Knight (₹14.61 Lakh)',
      '1.5 I MPi Manual CRETA - S(O) DT Knight (₹14.76 Lakh)',
      '1.5 I MPi 6-Speed Manual - SX (₹15.41 Lakh)',
      '1.5 I MPi 6-Speed Manual - SX DT (₹15.56 Lakh)',
      '1.5 I MPi IVT - S(O) (₹15.96 Lakh)',
      '1.5 I MPi 6-Speed Manual - SX Tech (₹16.09 Lakh)'
    ],
    'Diesel': [
      'All Variants',
      '1.5 CRDi Manual - E (₹12.45 Lakh)',
      '1.5 CRDi Manual - EX (₹13.67 Lakh)',
      '1.5 CRDi MT EX(O) (₹14.32 Lakh)',
      '1.5 CRDi 6-Speed Manual - S (₹14.88 Lakh)',
      '1.5 CRDi Automatic EX(O) (₹15.72 Lakh)'
    ],
    'Electric': [
      'All Variants',
      'EV Standard Range (₹18.50 Lakh)',
      'EV Long Range (₹21.75 Lakh)'
    ],
    'Hybrid': [
      'All Variants',
      'Hybrid EX (₹15.25 Lakh)',
      'Hybrid SX (₹17.80 Lakh)',
      'Hybrid SX(O) (₹19.45 Lakh)'
    ],
    'All Fuel Types': ['All Variants']
  };

  // Get variants based on selected fuel
  const getVariants = () => {
    return variantsData[selectedFuel] || variantsData['All Fuel Types'];
  };


  // Filter cars based on selections
  const filteredCars = carPrice.filter(car => {
    return (
      (selectedModel === 'All Models' || car.model === selectedModel) &&
      (selectedFuel === 'All Fuel Types' || car.fuelType === selectedFuel) &&
      (selectedTransmission === 'All Transmissions' || car.transmission === selectedTransmission) &&
      (selectedVariant === 'All Variants' || 
        getVariants().includes(`${car.variant} (${car.price})`))
    );
  });

  const headingStyle = {
    marginBottom:5,
};

const fetchEbrochure = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/car-price");
      if (response.data.success) {
        setCarPrice(response.data.data);
        console.log("All ebrochure data:", response.data.data);
      } else {
        console.log("API call failed:", response.data.message);
      }
    } catch (err) {
      console.error("Error fetching ebrochure data:", err);
    }
  };

  useEffect(() => {
    fetchEbrochure();
  }, []);



  return (
   <>
      {/* banner */}
      <div className="relative h-80 md:h-[400px] w-full max-w-[1500px] mx-auto overflow-hidden banner">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://www.mobismea.com/upload/uf/b1a/og8jhj9h0irmp162f3ad6r1sce0yym0u/stargazerbanner.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-white mb-4 h1"
          >
            Car Prices & Offers
          </motion.h1> 
          <BreadCrumbs/>
        </div>
      </div>

    <div className="min-h-screen bg-gray-50 w-full mx-auto xl:mt-10 md:mt-5" style={{maxWidth:"1397px"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-[#05141f] mb-8 text-center" style={headingStyle}>Car Price Listing</h1>

        {/* Instant Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Model Filter */}
          <div className="relative">
            <button 
              onClick={() => setShowModelDropdown(!showModelDropdown)}
              className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-md px-4 py-3 text-left"
            >
              <span>{selectedModel}</span>
              {showModelDropdown ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {showModelDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200 max-h-60 overflow-y-auto"
              >
                {carModels.map(model => (
                  <div
                    key={model}
                    onClick={() => {
                      setSelectedModel(model);
                      setShowModelDropdown(false);
                    }}
                    className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${selectedModel === model ? 'bg-blue-50 text-blue-600' : ''}`}
                  >
                    {model}
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Fuel Type Filter */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowFuelDropdown(!showFuelDropdown);
                // Reset variant when fuel type changes
                setSelectedVariant('All Variants');
              }}
              className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-md px-4 py-3 text-left"
            >
              <span>{selectedFuel}</span>
              {showFuelDropdown ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {showFuelDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200"
              >
                {fuelTypes.map(fuel => (
                  <div
                    key={fuel}
                    onClick={() => {
                      setSelectedFuel(fuel);
                      setShowFuelDropdown(false);
                    }}
                    className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${selectedFuel === fuel ? 'bg-blue-50 text-blue-600' : ''}`}
                  >
                    {fuel}
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Transmission Filter */}
          <div className="relative">
            <button 
              onClick={() => setShowTransmissionDropdown(!showTransmissionDropdown)}
              className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-md px-4 py-3 text-left"
            >
              <span>{selectedTransmission}</span>
              {showTransmissionDropdown ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {showTransmissionDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200"
              >
                {transmissions.map(trans => (
                  <div
                    key={trans}
                    onClick={() => {
                      setSelectedTransmission(trans);
                      setShowTransmissionDropdown(false);
                    }}
                    className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${selectedTransmission === trans ? 'bg-blue-50 text-blue-600' : ''}`}
                  >
                    {trans}
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Variant Filter - Dynamic based on fuel selection */}
<div className="relative">
  <button 
    onClick={() => {
      if (selectedFuel === 'All Fuel Types') {
        // Show alert if no fuel type selected
        setShowVariantDropdown(false);
        setShowVariantAlert(true);
        setTimeout(() => setShowVariantAlert(false), 3000); // Auto-hide after 3s
      } else {
        setShowVariantDropdown(!showVariantDropdown);
      }
    }}
    className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-md px-4 py-3 text-left"
  >
    <span>{selectedVariant}</span>
    {showVariantDropdown ? <FiChevronUp /> : <FiChevronDown />}
  </button>

  {/* Dropdown */}
  {showVariantDropdown && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200 max-h-60 overflow-y-auto"
    >
      {getVariants().map(variant => (
        <div
          key={variant}
          onClick={() => {
            setSelectedVariant(variant);
            setShowVariantDropdown(false);
          }}
          className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${selectedVariant === variant ? 'bg-blue-50 text-blue-600' : ''}`}
        >
          {variant}
        </div>
      ))}
    </motion.div>
  )}

  {/* Red Alert Message */}
  {showVariantAlert && (
    <motion.p
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="text-red-500 text-sm mt-2"
    >
      Please select a Fuel Type first!
    </motion.p>
  )}
</div>


        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">{filteredCars.length} {filteredCars.length === 1 ? 'Car' : 'Cars'} Found</p>
        </div>

        {/* Cars List - Landscape Cards */}
<div className="space-y-6">
  {carPrice.map((car, index) => (
    <motion.div
      key={`${car.model}-${index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 p-4 flex flex-col">
          {/* Main Image */}
       <div className="w-full h-64 md:h-[400px] overflow-hidden rounded-md bg-gray-100">
  {car.images && car.images.length > 0 ? (
    <img
      src={selectedImages[car.model] || car.images[0]} // Fallback to first image if selected not set
      alt={car.model}
      className="w-full h-full object-cover"
      loading={index < 3 ? "eager" : "lazy"}
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-gray-400">
      Image not available
    </div>
  )}
</div>

          {/* Thumbnail Gallery */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {car.images?.map((img, imgIndex) => (
              <button
                key={`${car.model}-thumb-${imgIndex}`}
                onClick={() => setSelectedImages(prev => ({ ...prev, [car.model]: img }))}
                className={`flex-shrink-0 w-30 h-25 rounded-md overflow-hidden border-2 transition-colors ${
                  selectedImages[car.model] === img 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={img}
                  alt={`${car.model} color ${imgIndex + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-6 flex flex-col">
          {/* Header with price */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{car.model}</h3>
              <p className="text-gray-500">{car.variant}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-red-600">{car.price}</p>
              <p className="text-sm text-gray-500">Model Year: {car.launchDate}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {car.fuelType}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {car.transmission}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4 line-clamp-3">{car.description}</p>

          {/* Features */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {car.features?.map((feature, i) => (
                <li key={`${car.model}-feature-${i}`} className="flex items-start">
                  <svg className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <div className=" mt-12 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p>EMI from ₹15,000/month</p>
            </div>
              <div className="relative right-2 ">
                <AnimatedButton
                  text="View More"
                  href="#"
                  bgColor="#2563eb"
                  hoverShadow="#fbbf24"
                  textColor="#fff"
                  fontSize="0.9rem"
                  padding="6px 10px"
                />
              </div>
          </div>
          </div>

          {/* Footer */}
          
        </div>
      </div>
    </motion.div>
  ))}
</div>
        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No cars found matching your filters.</p>
            <button 
              onClick={() => {
                setSelectedModel('All Models');
                setSelectedFuel('All Fuel Types');
                setSelectedTransmission('All Transmissions');
                setSelectedVariant('All Variants');
              }}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>

   </>
  );
};

export default PriceListingPage;