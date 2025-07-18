'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image"; // ✅ For Next.js Image component (remove if React)
import AnimatedButton from "@/app/components/AnimatedButton";

export default function PriceListingPage({ cars }) {
  const [selectedImages, setSelectedImages] = useState({});

  return (
    <div className="space-y-6">
      {cars.map((car) => (
        <motion.div
          key={car.model + car.variant} // ✅ Unique key using model+variant
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-1/2 p-4 flex flex-col">
              {/* Main Image */}
              <div className="w-full">
                {car.images && car.images.length > 0 ? (
                  <Image
                    src={selectedImages[car.model] || car.images[0]}
                    alt={car.model}
                    width={800}
                    height={500}
                    className="w-full h-64 md:h-[400px] object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 md:h-[400px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex md:flex-col flex-row mt-3 md:mt-4 gap-2">
                {car.images &&
                  car.images.map((img, index) => (
                    <Image
                      key={`${car.model}-thumb-${index}`} // ✅ Unique key
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      width={150}
                      height={100}
                      className={`cursor-pointer rounded-md border ${selectedImages[car.model] === img
                          ? "border-blue-500"
                          : "border-gray-300"
                        } w-1/3 md:w-full h-20 object-cover`}
                      onClick={() =>
                        setSelectedImages((prev) => ({
                          ...prev,
                          [car.model]: img,
                        }))
                      }
                    />
                  ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">
                    {car.model}
                  </h4>
                  <p className="text-gray-500">{car.variant}</p>
                </div>
                <div className="text-right">
                  <p className="!text-2xl font-medium !text-[#FF073A]">
                    {car.price}
                  </p>
                  <p className="text-sm text-gray-500">{car.launchDate}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                  {car.fuelType}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                  {car.transmission}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{car.description}</p>

              <div className="mb-6">
                <h5 className="font-medium text-gray-900 mb-2">
                  Key Features:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {car.features.map((feature, index) => (
                    <div
                      key={`${car.model}-feature-${index}`} // ✅ Unique key
                      className="flex items-center"
                    >
                      <svg
                        className="h-4 w-4 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <p>EMI starts at ₹15,000/month</p>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
