"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedButton from "./AnimatedButton";

const fadeUp = {
  hidden: { opacity: 0, y: 20 }, // Reduced y-value for less movement
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }, // Faster transition
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // Reduced stagger time
      delayChildren: 0.05,
    },
  },
};

export default function CarCarousel() {
  const [carCarousel, setCarCarousel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const fetchCarouselImage = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/car-carousel");
      if (response.data.success) {
        setCarCarousel(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching carousel images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarouselImage();
  }, []);

const prevSlide = () => {
  setIndex((prev) => (prev - 1 + carCarousel.length) % carCarousel.length);
};

const nextSlide = () => {
  setIndex((prev) => (prev + 1) % carCarousel.length);
};


  const getOffsetImage = (offset) => {
    if (carCarousel.length === 0) return "";
    const newIndex = (index + offset + carCarousel.length) % carCarousel.length;
    return carCarousel[newIndex].imageUrl;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p className="text-gray-500">Loading carousel...</p>
      </div>
    );
  }

  if (!carCarousel || carCarousel.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p className="text-gray-500">No carousel data found.</p>
      </div>
    );
  }

  const activeCar = carCarousel[index];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // Reduced amount for earlier trigger
      className="pb-6" // Reduced padding bottom
    >
      {/* Carousel Container - Reduced height */}
      <div className="relative w-full max-w-[1400px] mx-auto h-[280px] flex items-center justify-center md:h-[400px]">
        {/* Prev Button */}
        <button
          onClick={nextSlide}
          className="absolute left-2 z-10 p-2 bg-gray-800/50 rounded-full text-white hover:bg-gray-800 transition"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Images */}
        <div className="flex items-center justify-center relative w-full max-w-[1400px] gap-2">
          {/* Left Image */}
          <div className="hidden md:block w-[200px] h-[240px] opacity-50 scale-90 transition-transform">
            <img
              src={getOffsetImage(-1)}
              alt="Previous"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>

          {/* Active Image - Reduced height */}
          {/* Active Image - Reduced height */}
<AnimatePresence mode="wait">
  <motion.div
    key={index}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
    className="w-full md:w-[900px] h-[560px] md:h-[350px] relative"
  >
    <img
      src={activeCar.imageUrl}
      alt={activeCar.title}
      className="w-full h-full object-contain rounded-lg"
    />
  </motion.div>
</AnimatePresence>

          {/* Right Image */}
          <div className="hidden md:block w-[200px] h-[240px] opacity-50 scale-90 transition-transform">
            <img
              src={getOffsetImage(1)}
              alt="Next"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={prevSlide}
          className="absolute right-2 z-10 p-2 bg-gray-800/50 rounded-full text-white hover:bg-gray-800 transition"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Text Content - Reduced margins */}
      <motion.div variants={fadeUp} className="text-center mt-2 md:mt-4 px-4">
        <h2 className="text-xl md:text-3xl text-black font-arial font-extrabold">
          {activeCar.title}
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mt-1 text-sm md:text-base">
          {activeCar.description}
        </p>
      </motion.div>

      {/* Buttons - Reduced margins and padding */}
      <div className="flex justify-center gap-5 mt-3 md:mt-4">
        <div className="relative ">
                      <AnimatedButton
                        text="Explore"
                        href="#"
                        bgColor="#2563eb"
                        hoverShadow="#fbbf24"
                        textColor="#fff"
                        fontSize="1rem"
                        padding="8px 10px"
                      />
                    </div>
        
        <div className="relative ">
                      <AnimatedButton
                        text="Test Drive"
                        href="#"
                        bgColor="#2563eb"
                        hoverShadow="#fbbf24"
                        textColor="#fff"
                        fontSize="1rem"
                        padding="8px 10px"
                      />
                    </div>
        
      </div>
    </motion.div>
  );
}