"use client"
import { CheckCircle, Shield, Car, Heart, Home } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import AnimatedButton from "@/app/components/AnimatedButton"
import BreadCrumbs from "@/app/components/BreadCrumbs"
import CarEnquiryForm from '@/app/components/CarEnquiryForm'

const insuranceData = [
    {
        title: "Hyundai Preferred Insurance Benefits",
        icon: Car,
        items: [
            "Zero Depreciation (Bumper To Bumper Cover)",
            "RTI (Return To Invoice)",
            "Zero Depreciation + Engine Protect & Consumable Cover",
            "Rental Car Coverage",
            "Glass Repair Services",
        ],
    },
    {
        title: "Health Insurance",
        icon: Heart,
        items: [
            "Medical Coverage",
            "Prescription Benefits",
            "Preventive Care",
            "Emergency Services",
            "Specialist Consultations",
        ],
    },
    {
        title: "Home Insurance",
        icon: Home,
        items: [
            "Property Protection",
            "Personal Belongings",
            "Liability Coverage",
            "Natural Disaster Protection",
            "Temporary Living Expenses",
        ],
    },
    {
        title: "Life Insurance",
        icon: Shield,
        items: [
            "Term Life Coverage",
            "Whole Life Options",
            "Beneficiary Protection",
            "Cash Value Building",
            "Premium Flexibility",
        ],
    },
]

export default function HyundaiInsuranceCards() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                {/* Header Section */}
                <div className="relative h-80 md:h-[400px] w-full max-w-[1400px] mx-auto overflow-hidden">
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
                            className="text-4xl md:text-6xl font-bold text-white mb-4"
                        >
                            Insurance Coverage
                        </motion.h1>
                        <BreadCrumbs/>

                    </div>
                </div>

                {/* Insurance Cards Section */}
                <div className="mt-10 px-4 md:px-10 w-full max-w-[1400px] mx-auto">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {insuranceData.map((card, index) => {
                            const IconComponent = card.icon
                            const isHovered = hoveredCard === index

                            return (
                                <div
                                    key={index}
                                    className="relative"
                                    onMouseEnter={() => setHoveredCard(index)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Main Card */}
                                    <motion.div
                                        className="relative overflow-hidden cursor-pointer"
                                        whileHover={{ y: -2 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Holographic border effect */}
                                        <div
                                            className={`absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-gray-200 to-transparent transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                                        >
                                            <div className="absolute inset-[1px] rounded-xl bg-white"></div>
                                        </div>

                                        {/* Card content */}
                                        <div
                                            className="relative bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
                                            style={{
                                                background: isHovered
                                                    ? "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)"
                                                    : "#ffffff",
                                            }}
                                        >
                                            {/* Holographic shine effect */}
                                            <div
                                                className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? "opacity-20" : "opacity-0"}`}
                                                style={{
                                                    background:
                                                        "linear-gradient(45deg, transparent 30%, rgba(1, 53, 102, 0.1) 50%, transparent 70%)",
                                                    transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
                                                    transition: "transform 0.8s ease-in-out",
                                                }}
                                            ></div>

                                            <div className="flex items-center justify-between p-2">
                                                <div className="flex items-center space-x-4">
                                                    <div
                                                        className="p-2 rounded-sm transition-all duration-300"
                                                        style={{ backgroundColor: "#013566" }}
                                                    >
                                                        <IconComponent className="w-5 h-5 text-white" />
                                                    </div>
                                                    <h5 className="text-xl md:text-2xl font-semibold text-gray-800">{card.title}</h5>
                                                </div>

                                                <motion.div
                                                    animate={{ rotate: isHovered ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center"
                                                    style={{ borderColor: "#013566" }}
                                                >
                                                    <div
                                                        className="w-2 h-2 rounded-full transition-all duration-300"
                                                        style={{
                                                            backgroundColor: isHovered ? "#013566" : "transparent",
                                                            transform: isHovered ? "scale(1.2)" : "scale(1)",
                                                        }}
                                                    ></div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Expandable Content - No gap and maintains hover */}
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: isHovered ? "auto" : 0,
                                            opacity: isHovered ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mx-2 -mt-1">
                                            {" "}
                                            {/* Negative margin to remove gap */}
                                            <div
                                                className="rounded-b-lg p-6 relative overflow-hidden border-x border-b border-gray-200 shadow-lg"
                                                style={{ backgroundColor: "#f8fafc" }}
                                            >
                                                {/* Subtle holographic background */}
                                                <div
                                                    className="absolute inset-0 opacity-5"
                                                    style={{
                                                        background: `linear-gradient(45deg, 
                            transparent 25%, 
                            #013566 25%, 
                            #013566 50%, 
                            transparent 50%, 
                            transparent 75%, 
                            #013566 75%
                          )`,
                                                        backgroundSize: "20px 20px",
                                                    }}
                                                ></div>

                                                <div className="relative">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                                        {card.items.map((item, itemIndex) => (
                                                            <motion.div
                                                                key={itemIndex}
                                                                initial={{ x: -20, opacity: 0 }}
                                                                animate={{
                                                                    x: isHovered ? 0 : -20,
                                                                    opacity: isHovered ? 1 : 0,
                                                                }}
                                                                transition={{
                                                                    duration: 0.3,
                                                                    delay: isHovered ? itemIndex * 0.1 : 0,
                                                                }}
                                                                className="flex items-center space-x-3"
                                                            >
                                                                <div className="flex-shrink-0 p-1 rounded-full" style={{ backgroundColor: "#013566" }}>
                                                                    <CheckCircle className="w-4 h-4 text-white" />
                                                                </div>
                                                                <span className="text-gray-700 text-[1rem] font-medium">{item}</span>
                                                            </motion.div>
                                                        ))}
                                                    </div>

                                                    <div className="relative right-80">
                                                        <AnimatedButton
                                                        text="Learn More"
                                                        href="#"
                                                        bgColor="#2563eb"
                                                        hoverShadow="#fbbf24"
                                                        textColor="#fff"
                                                        fontSize="0.9rem"
                                                        padding="6px 8px"
                                                        textCenter="center"
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <CarEnquiryForm/>
        </>
    )
}
