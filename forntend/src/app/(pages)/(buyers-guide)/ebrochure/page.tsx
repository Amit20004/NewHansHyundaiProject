"use client";

import { useEffect, useState } from "react";
import { Download, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import BreadCrumbs from "@/app/components/BreadCrumbs";

interface Brochure {
  id: string;
  title: string;
  model: string;
  year: string;
  image: string;
  category: string;
  fileSize: string;
  pages: number;
}

const categories = ["All", "Sedan", "SUV", "Hybrid", "Electric", "Crossover", "Luxury"];

export default function BrochureGrid() {
  const [ebrochure, setEbrochure] = useState<Brochure[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchEbrochure = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/car-ebrochure");
      if (response.data.success) {
        setEbrochure(response.data.data);
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

  const filteredBrochures =
    selectedCategory === "All"
      ? ebrochure
      : ebrochure.filter((brochure) => brochure.category === selectedCategory);

  const handleDownload = (brochure: Brochure) => {
    console.log(`Downloading ${brochure.title} brochure...`);
    // Implement actual download logic here
  };

  const handlePreview = (brochure: Brochure) => {
    console.log(`Previewing ${brochure.title} brochure...`);
    // Implement actual preview logic here
  };

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
            Car E-Brochures
          </motion.h1> 
          <BreadCrumbs/>
        </div>
      </div>



    <div className="space-y-6 mt-5 sm:space-y-8 max-w-[1400px] w-full mx-auto my-10">

        <div className="relative  w-full max-w-[1500px] mx-auto overflow-hidden banner">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-black mb-4 h2"
          >
            Car E-Brochures
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-black max-w-2xl"
          >
            Discover premium accessories tailored for your Hyundai
          </motion.p>
        </div>
      </div>


      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full max-w-[1250px] mx-auto">
        {filteredBrochures.map((brochure) => (
          <div
            key={brochure.id}
            className="group relative transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            {/* Parallelogram Image Container */}
<div className="relative aspect-[4/4] overflow-hidden group">
  <img
    src={brochure.imageUrl || "/placeholder.svg"}
    alt={`${brochure.title} brochure cover`}
    className="absolute inset-0 w-full h-full object-cover transition duration-500 ease-out group-hover:scale-105 group-hover:brightness-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
  />

  {/* Light Sweep */}
  <div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 ease-out pointer-events-none"
    style={{
      transform: "translateX(-100%) rotate(15deg)",
      animation: "sweep 1s forwards",
    }}
  ></div>

  <span
    className="absolute max-w-full top-2 sm:top-3 left-0 sm:left-0 bg-[#0000006b] italic text-white text-md font-bold px-5 py-1"
    style={{
      clipPath: "polygon(5% 0px, 100% 0px, 95% 100%, 0 100%)",
    }}
  >
    {brochure.carModel}
  </span>

  {/* Download Button */}
<button
  className="absolute top-3 right-5 w-7 h-7 rounded-full text-gray-800 opacity-0 
             group-hover:opacity-100 transition-all duration-300 flex items-center justify-center shadow-md 
             group-hover:shadow-lg group-hover:ring-2 group-hover:ring-white 
             group-hover:ring-offset-2 group-hover:ring-offset-gray-800 cursor-pointer"
  onClick={() => {
    console.log('Download clicked');
  }}
  aria-label="Download brochure"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
</button>

</div>


           
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBrochures.length === 0 && (
        <div className="text-center py-12 sm:py-16">
          <p className="text-gray-500 text-sm sm:text-base">No brochures found for the selected category.</p>
        </div>
      )}
    </div>
   </>
  );
}
