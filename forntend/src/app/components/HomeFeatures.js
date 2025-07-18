// src/pages/HomeFeatures.js
"use client";
import React, { useEffect, useState } from "react";
// import '../../css/HomeFeatures.css';
import { AnimatePresence, motion } from "framer-motion";
import AnimatedButton from "../components/AnimatedButton";

const serviceData = [
  {
    title: "Maintenance & Fluids",
    points: ["Periodic Maintenance", "Synthetic Oil Change", "Engine Fluids"],
  },
  {
    title: "Repairs & Restoration",
    points: ["Denting", "Painting", "Scratch Removal", "Headlamp Restoration"],
  },
  {
    title: "Wheels & Alignment",
    points: ["Tyre Replacement", "Wheel Alignment", "Engine Bay Cleaning"],
  },
  {
    title: "Deep Cleaning",
    points: ["AC Disinfection", "Germ Kleen", "Interior/Exterior Detailing"],
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const HomeFeatures = () => {
  const [current, setCurrent] = useState(0);
  const totalItems = serviceData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalItems);
    }, 3500);
    return () => clearInterval(interval);
  }, [totalItems]);

  return (
    <div className="bg-white text-gray-800 max-w-[1400px] mx-auto overflow-hidden home-feature mt-10">
      {/* Compact Hero Section */}
      <motion.section
        className="relative flex items-center justify-center text-center py-8 px-4 overflow-hidden bg-[#013566]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">
            Hans Hyundai <br></br>
            <span className="heading">
              <h2>Showroom & Service Centers</h2>
            </span>
          </h1>
          <p className="text-lg md:text-md text-white/90 max-w-3xl mx-auto mb-3 feature_p1">
            Hyundai Sales, Service & Support – All in One Place.{" "}
          </p>
          <motion.button
            className="bg-white text-[#013566] font-semibold py-1 px-4 rounded-sm hover:bg-gray-100 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Hyundai Models
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Compact About Section */}
      <motion.section
        className="py-4 px-4 md:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl  font-bold text-[#013566] mb-2">
              Experience Excellence with Hans Hyundai
            </h3>
            <p className="text-gray-700 mb-3">
              At Hans Hyundai, we combine innovation and reliability at every
              step. Our modern showroom in Moti Nagar and strategically located
              service centers across Delhi ensure convenience for all our
              customers.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-2">
              <motion.div
                className="bg-white px-4 py-2 rounded-sm shadow-sm border border-gray-100"
                whileHover={{ y: -3 }}
              >
                <div className="text-[#013566] text-2xl font-bold mb-1">
                  10+
                </div>
                <h6 className="font-medium text-gray-800 text-sm">
                  Years Experience
                </h6>
              </motion.div>

              <motion.div
                className="bg-white px-4 py-2 rounded-sm shadow-sm border border-gray-100"
                whileHover={{ y: -3 }}
              >
                <div className="text-[#013566] text-2xl font-bold mb-1">
                  10K+
                </div>
                <h6 className="font-medium text-gray-800 text-sm">
                  Happy Customers
                </h6>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="bg-[#013566] h-[12.8rem] text-white p-6 rounded-sm shadow-md"
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h5 className="text-xl font-bold mb-2">
              Our Presence Across Delhi
            </h5>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="bg-white/20 p-1.5 rounded-sm mr-3 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h6 className="font-semibold">Flagship Showroom</h6>
                  <p className="text-white/90 text-sm">Moti Nagar, Delhi</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white/20 p-1.5 rounded-sm mr-3 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0h6m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <h6 className="font-semibold">Service Centers</h6>
                  <ul className="text-white/90 text-sm space-y-1">
                    <li>• Badli • Zakhira • Naraina • Moti Nagar</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Compact Showroom Section */}
      {/* <motion.section 
    className="py-12 px-4 md:px-8 bg-gray-50"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
      <motion.div
        className="relative rounded-xl overflow-hidden shadow-md h-64"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
      >
        <img 
          src="https://images.unsplash.com/photo-1600188769045-bc60256a0d5a?auto=format&fit=crop&w=600" 
          alt="Hans Hyundai Showroom"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
      
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-[#013566] mb-4">
          A Premium Car Buying Experience
        </h2>
        <p className="text-gray-700 mb-4">
          Step into our state-of-the-art showroom in Moti Nagar and explore the latest Hyundai models.
        </p>
        
        <ul className="space-y-2">
          {[
            "Quick and easy car bookings",
            "Access to newest Hyundai launches",
            "Attractive finance solutions",
            "Transparent pricing",
            "Complimentary test drives"
          ].map((item, index) => (
            <motion.li
              key={index}
              className="flex items-start text-gray-700"
              initial={{ x: 10, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-[#013566] mr-2">•</span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  </motion.section> */}

      {/* Compact Services Section */}
      <motion.section
        className="py-2 px-4 md:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-2">
            <h2 className="text-2xl md:text-3xl font-bold text-[#013566] mb-2">
              Hyundai Car Services You Can Trust
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Backed by Hyundai-trained technicians and modern equipment.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {serviceData.map((service, index) => (
              <motion.button
                key={index}
                className={`px-4 py-2 text-sm rounded-sm font-medium homeFeature-title transition ${
                  current === index
                    ? "bg-[#013566] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setCurrent(index)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {service.title}
              </motion.button>
            ))}
          </div>

          <motion.div
            className="bg-gray-50 rounded-xl p-6 shadow-sm"
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h6 className="text-xl font-bold text-[#013566] mb-2 ">
                  {serviceData[current].title}
                </h6>
                <ul className="space-y-2">
                  {serviceData[current].points.map((point, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <span className="text-[#013566] mr-2">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-48 rounded-sm overflow-hidden">
                <img
                  src={
                    serviceData[current].image ||
                    "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600"
                  }
                  alt={serviceData[current].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Compact CTA Section */}
      <motion.section
        className="py-8 px-4 md:px-8 text-center bg-[#013566] text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Ready to Drive or Service Your Hyundai?
          </h2>
          <p className="text-white/90 mb-2">
            Book a test drive, visit our showroom, or schedule your next
            service.
          </p>

          <div className="flex flex-wrap justify-center gap-5 feature-buttons">
            <div className="relative ">
              <AnimatedButton
                text="Book Test Drive"
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
                text="Find a Nearest Center"
                href="#"
                bgColor="#2563eb"
                hoverShadow="#fbbf24"
                textColor="#fff"
                fontSize="1rem"
                padding="8px 10px"
              />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomeFeatures;
