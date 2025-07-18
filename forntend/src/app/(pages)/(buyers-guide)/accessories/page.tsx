"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiShoppingCart,
  FiHeart,
  FiEye,
} from "react-icons/fi";
import axios from "axios";
import BreadCrumbs from "@/app/components/BreadCrumbs";

const CarAccessoriesPage = () => {
  const [carAccessories, setCarAccessories] = useState([]);
  const [selectedModel, setSelectedModel] = useState("All Models");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const carModels = [
    "All Models",
    "Hyundai Creta",
    "Hyundai Alcazar",
    "Hyundai i20",
    "Hyundai Verna",
  ];
  const categories = [
    "All Categories",
    "Exterior",
    "Interior",
    "Electronics",
    "Tools",
  ];

  // Fetch Accessories
  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/car-accessories"
        );
        if (response.data.success) {
          setCarAccessories(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch accessories:", error);
      }
    };
    fetchAccessories();
  }, []);

  // Filter Logic
  const filteredAccessories = carAccessories.filter((item) => {
    return (
      (selectedModel === "All Models" || item.model === selectedModel) &&
      (selectedCategory === "All Categories" ||
        item.category === selectedCategory)
    );
  });

  return (
    <>
      {/* Banner */}
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
            className=" font-bold text-white mb-4 h1"
          >
            Car Accessories
          </motion.h1>
               <BreadCrumbs/>

        </div>
       
      </div>

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[1397px]">
        {/* Model Filter */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-md">
            <Dropdown
              label="Select Car Model"
              selected={selectedModel}
              options={carModels}
              show={showModelDropdown}
              setShow={setShowModelDropdown}
              onSelect={setSelectedModel}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-sm text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#013566] text-white shadow-lg btn"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Accessories Grid with Shuffle + Flip Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + selectedModel}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredAccessories.length > 0 ? (
              filteredAccessories.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{
                    layout: { duration: 0.6, ease: "easeInOut" },
                    duration: 0.3,
                  }}
                  className="group relative bg-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                  onMouseEnter={() => setHoveredCard(item._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Flip Card */}
                  <div className="relative w-full h-55 perspective-1000">
                    {/* Front Side */}
                    <div className="absolute inset-0 backface-hidden transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Back Side (just image flip) */}
                    <div className="absolute inset-0 backface-hidden transition-transform duration-700 transform-style-preserve-3d rotate-y-180 group-hover:rotate-y-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Bottom Info (Hide on hover) */}
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{
                      opacity: hoveredCard === item._id ? 0 : 1,
                      y: hoveredCard === item._id ? -20 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="px-4 py-1 text-center bg-gray-100"
                  >
                    <h5 className="text-lg font-bold text-gray-800 truncate">
                      {item.name}
                    </h5>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className=" text-[#013566] font-medium">
                      ₹ {item.price}
                    </p>
                  </motion.div>

                  {/* Hover Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredCard === item._id ? 1 : 0,
                      y: hoveredCard === item._id ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3"
                  >
                    <button
                      className="p-2 bg-[#013566] text-white rounded-full hover:bg-blue-700 transition transform hover:scale-110 btn"
                      title="Add to cart"
                    >
                      <FiShoppingCart className="text-lg" />
                    </button>
                    <button
                      className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition transform hover:scale-110"
                      title="Add to wishlist"
                    >
                      <FiHeart className="text-lg" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(item.image)}
                      className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition transform hover:scale-110"
                      title="Quick view"
                    >
                      <FiEye className="text-lg" />
                    </button>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-gray-500 text-lg">
                  No accessories found for your filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedModel("All Models");
                    setSelectedCategory("All Categories");
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Enlarged accessory"
                className="w-full h-full object-contain max-h-[80vh]"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
              >
                <FiX size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Dropdown Component
const Dropdown = ({ label, selected, options, show, setShow, onSelect }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <button
      onClick={() => setShow(!show)}
      className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-lg px-4 py-3 text-left shadow-sm hover:shadow-md transition-all duration-300"
    >
      <span className="font-medium">{selected}</span>
      {show ? (
        <FiChevronUp className="text-gray-500" />
      ) : (
        <FiChevronDown className="text-gray-500" />
      )}
    </button>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute z-10 mt-1 w-full bg-white shadow-xl rounded-lg py-1 border border-gray-200"
      >
        {options.map((option) => (
          <div
            key={option}
            onClick={() => {
              onSelect(option);
              setShow(false);
            }}
            className={`px-4 py-3 hover:bg-blue-50 cursor-pointer transition ${
              selected === option
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-700"
            }`}
          >
            {option}
          </div>
        ))}
      </motion.div>
    )}
  </div>
);

export default CarAccessoriesPage;
