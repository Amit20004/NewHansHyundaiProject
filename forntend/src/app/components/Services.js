"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
// axios is not needed for this simulated example, but would be used for a real external API.
import axios from "axios";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}



const Services = () => {
  const [homeService, setHomeService] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchServiceImages = async () => {
    setLoading(true)
    setError(null)
    try {
      // Simulate an API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const response = await axios.get("http://localhost:8000/api/home-service");
      if (response.data.success) {
        setHomeService(response.data.data);
      } else {
        setError("Failed to fetch services.");
      }
    } catch (err) {
      console.error("Error fetching service images:", err)
      setError("Failed to load services. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServiceImages()
  }, []) // The empty dependency array ensures this runs once on mount [^2]

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-lg">Loading services...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center h-64 text-lg text-red-500">{error}</div>
  }

  return (
   <motion.div
  className="main-service-box flex flex-wrap w-full h-full mx-auto"
  style={{ maxWidth: "1400px" }}
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  {homeService.map((service, idx) => (
    <motion.div
      key={idx}
      className="service-box shine-hover relative group w-1/2 h-[300px] overflow-hidden p-1"
      variants={cardVariants}
    >
      <div className="shine-line absolute inset-0 z-[3]"></div>
      
      {/* Background Image */}
      <img
        src={service.imageUrl || "/placeholder.svg"}
        alt={service.imageName}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Gradient overlay */}
      <div className="absolute "></div>
      
      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center z-[2]">
        <h2 className="text-white text-2xl md:text-3xl font-semibold text-center p-4">
          {service.imageName}
        </h2>
      </div>

      {/* Shine line */}
      <style jsx>{`
        .shine-hover {
          position: relative;
          overflow: hidden;
        }
        .shine-line {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          transition: all 0.7s ease;
        }
        .shine-hover:hover .shine-line {
          left: 125%;
        }
      `}</style>
    </motion.div>
  ))}
</motion.div>

  )
}

export default Services
