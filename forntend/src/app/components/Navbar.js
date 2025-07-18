"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  User,
  MapPin,
  Share2,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BsTypeH4 } from "react-icons/bs";

const Navbar = () => {
    const router = useRouter()
  const [carData, setCarData] = useState([]); // Store all car data here
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const fetchCarLogos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/car-logos");
      if (response.data.success) {
        setCarData(response.data.data); // Save API data to state
        console.log("All car data:", response.data.data);
      } else {
        console.log("API call failed:", response.data.message);
      }
    } catch (err) {
      console.error("Error fetching car logos:", err);
    }
  };

  useEffect(() => {
    fetchCarLogos();
  }, []);

  // 🔥 Helper: Get all cars by category (e.g., SUV)
  const getCarsByCategory = (category) => {
    return carData.filter((car) => car.category === category);
  };

  // 🔥 Helper: Get a single car by name (e.g., CRETA)
  const getCarByName = (name) => {
    return carData.find((car) => car.name === name);
  };

const carModels = {
  SUV: [
    { name: "EXTER", image: getCarByName("EXTER")?.image || "/placeholder.png" },
    { name: "CRETA", image: getCarByName("CRETA")?.image || "/placeholder.png" },
    { name: "ALCAZAR", image: getCarByName("ALCAZAR")?.image || "/placeholder.png" },
    { name: "TUCSON", image: getCarByName("TUCSON")?.image || "/placeholder.png" },
    { name: "VENUE", image: getCarByName("VENUE")?.image || "/placeholder.png" },
  ],
  Sedan: [
    { name: "AURA", image: getCarByName("AURA")?.image || "/placeholder.png" },
    { name: "VERNA", image: getCarByName("VERNA")?.image || "/placeholder.png" },
  ],
  Hatchback: [
    { name: "i10 NIOS", image: getCarByName("GRAND i10 NIOSA")?.image || "/placeholder.png" },
    { name: "i20", image: getCarByName("i20")?.image || "/placeholder.png" },
  ],
  Electric: [
    { name: "IONIQ 5", image: getCarByName("IONIQ 5")?.image || "/placeholder.png" },
    { name: "KONA Electric", image: getCarByName("CRETA ELECTRIC")?.image || "/placeholder.png" },
    { name: "CRETA EV", image: getCarByName("CRETA ELECTRIC")?.image || "/placeholder.png" },
  ],
  "N Line": [
    { name: "CRETA N LINE", image: getCarByName("CRETA N LINE")?.image || "/placeholder.png" },
    { name: "VENUE N LINE", image: getCarByName("VENUE N LINE")?.image || "/placeholder.png" },
    { name: "i20 N LINE", image: getCarByName("i20 N LINE")?.image || "/placeholder.png" },
  ],
};



const categories = ["ALL", ...Object.keys(carModels)];

  const mainNavItems = [
    {
      name: "Find a Car",
      hasDropdown: true,
      isFullWidth: true,
      dropdownContent: (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-2 pb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200
          ${
            activeCategory === category
              ? "text-[#05141f] after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-[1px] after:h-[2px] after:bg-[#013566]"
              : "text-gray-700 hover:text-[#05141f]"
          }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="py-2">
            {activeCategory === "ALL" ? (
              <div className="space-y-0 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {Object.entries(carModels).map(([category, cars]) => (
                  <div key={category} className="space-y-0">
                    <h6 className="text-xl font-bold text-gray-900 flex items-center">
                      <span className=" text-[#013566] px-4 py-2 rounded-full mr-2 text-md font-semibold">
                        {category}
                      </span>
                    </h6>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                      {cars.map((car) => (
                        <div
                          key={`${category}-${car.name}`}
                          className="group flex flex-col items-center  rounded-xl transition-all duration-300 cursor-pointer border border-transparent  "
                          //   onClick={() => navigate(`/models/${car.name.toLowerCase().replace(/\s+/g, "-")}`)}
                        >
                          <div className="w-full h-25 mb-1 flex items-center justify-center">
                            <img
                              src={car?.image || "/placeholder.png"} // fallback if image missing
                              alt={car?.name || "Car"}
                              className="object-contain h-full w-full transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <span className="text-base font-semibold text-gray-800 group-hover:text-[#05141f] text-center">
                            {car.name}
                          </span>
                          <span className="text-xs text-[#013566] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 flex items-center">
                            Explore <ChevronRight size={14} className="ml-1" />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {carModels[activeCategory]?.map((car) => (
                  <div
                    key={car.name}
                    className="group flex flex-col items-center p-4 font-medium rounded-xl transition-all duration-300 cursor-pointer border border-transparent "
                    // onClick={() => navigate(`/models/${car.name.toLowerCase().replace(/\s+/g, "-")}`)}
                  >
                    <div className="w-full h-32 mb-4 flex items-center justify-center">
                      <img
                        src={car?.image || "/placeholder.png"} // fallback if image missing
                        alt={car?.name || "Car"}
                        className="object-contain h-full w-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <span className="text-base font-semibold text-gray-800 group-hover:text-[#05141f] text-center">
                      {car.name}
                    </span>
                    <span className="text-xs text-[#05141f] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 flex items-center">
                      Explore <ChevronRight size={14} className="ml-1" />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      name: "Buyers Guide",
      hasDropdown: true,
      isFullWidth: true,
      dropdownContent: (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
            {/* Column 1 */}
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/accessories"
                  className="relative block py-2 px-4 font-medium text-gray-700 transition-all duration-300 hover:text-[#05141f]"
                >
                  <span
                    className="relative inline-block
                   before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-[#013566]
                   before:transition-all before:duration-300 hover:before:w-full"
                  >
                    Accessories
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/car-price"
                  className="relative block py-2 px-4 font-medium text-gray-700 transition-all duration-300 hover:text-[#05141f]"
                >
                  <span
                    className="relative inline-block
                   before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-[#013566]
                   before:transition-all before:duration-300 hover:before:w-full"
                  >
                    Prices & Offers
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/insurance"
                  className="relative block py-2 px-4 font-medium text-gray-700 transition-all duration-300 hover:text-[#05141f]"
                >
                  <span
                    className="relative inline-block
                   before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-[#013566]
                   before:transition-all before:duration-300 hover:before:w-full"
                  >
                    Insurance
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="ebrochure"
                  className="relative block py-2 px-4 font-medium text-gray-700 transition-all duration-300 hover:text-[#05141f]"
                >
                  <span
                    className="relative inline-block
                   before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-[#013566]
                   before:transition-all before:duration-300 hover:before:w-full"
                  >
                    Download Brochure
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    {
      name: "Services",
      hasDropdown: true,
      isFullWidth: true,
      dropdownContent: (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
            {/* Column 1 */}
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/service"
                  className="relative block py-2 px-4 font-medium text-gray-700 transition-all duration-300 hover:text-[#05141f]"
                >
                  <span
                    className="relative inline-block
                   before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-[#013566]
                   before:transition-all before:duration-300 hover:before:w-full"
                  >
                    Book Service
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/pickdrop-service"
                  className="relative block py-2 px-4 font-medium text-gray-700 transition-all duration-300 hover:text-[#05141f]"
                >
                  <span
                    className="relative inline-block
                   before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-[#013566]
                   before:transition-all before:duration-300 hover:before:w-full"
                  >
                    Pickup & Drop Service
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/roadside-assistance"
                  className="relative block py-2 px-4 font-medium text-gray-700 transition-all duration-300 hover:text-[#05141f]"
                >
                  <span
                    className="relative inline-block
                   before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-[#013566]
                   before:transition-all before:duration-300 hover:before:w-full"
                  >
                    Roadside Assistance
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/maintenance-service"
                  className="relative block py-2 px-4 font-medium text-gray-700 transition-all duration-300 hover:text-[#05141f]"
                >
                  <span
                    className="relative inline-block
                   before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-[#013566]
                   before:transition-all before:duration-300 hover:before:w-full"
                  >
                    Periodic Maintenance
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/alignment-service"
                  className="relative block py-2 px-4 font-medium text-gray-700 transition-all duration-300 hover:text-[#05141f]"
                >
                  <span
                    className="relative inline-block
                   before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-[#013566]
                   before:transition-all before:duration-300 hover:before:w-full"
                  >
                    Tire & Alignment
                  </span>
                </a>
              </li>
            </ul>

            {/* Column 2 */}
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/battery-service"
                  className="relative block py-2 px-4 font-medium text-gray-700 transition-all duration-300 hover:text-[#05141f]"
                >
                  <span
                    className="relative inline-block
                   before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-[#013566]
                   before:transition-all before:duration-300 hover:before:w-full"
                  >
                    Battery Services
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/beautification-service"
                  className="relative block py-2 px-4 font-medium text-gray-700 transition-all duration-300 hover:text-[#05141f]"
                >
                  <span
                    className="relative inline-block
                   before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-[#013566]
                   before:transition-all before:duration-300 hover:before:w-full"
                  >
                    Beautification
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/durability-service"
                  className="relative block py-2 px-4 font-medium text-gray-700 transition-all duration-300 hover:text-[#05141f]"
                >
                  <span
                    className="relative inline-block
                   before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-[#013566]
                   before:transition-all before:duration-300 hover:before:w-full"
                  >
                    Protection
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/interior-service"
                  className="relative block py-2 px-4 font-medium text-gray-700 transition-all duration-300 hover:text-[#05141f]"
                >
                  <span
                    className="relative inline-block
                   before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-[#013566]
                   before:transition-all before:duration-300 hover:before:w-full"
                  >
                    Interior Care
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    {
      name: "Finance",
      hasDropdown: true,
      isFullWidth: true,
      dropdownContent: (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
            {/* Column 1 */}
            <ul className="space-x-4">
              <li>
                <a
                  href="/loan-finance"
                  className="relative block py-2 px-4 font-medium text-gray-700 transition-all duration-300 hover:text-[#05141f]"
                >
                  <span
                    className="relative inline-block
                   before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-[#013566]
                   before:transition-all before:duration-300 hover:before:w-full"
                  >
                    Loan Enquiry
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/documentation-finance"
                  className="relative block py-2 px-4 font-medium text-gray-700 transition-all duration-300 hover:text-[#05141f]"
                >
                  <span
                    className="relative inline-block
                   before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-[#013566]
                   before:transition-all before:duration-300 hover:before:w-full"
                  >
                    Documentation
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      name: "Offers",
      hasDropdown: true,
      isFullWidth: true,
      dropdownContent: (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
            {/* Column 1 */}
            <ul className="space-x-4">
              <li>
                <a
                  href="/sales-offers"
                  className="relative block py-2 px-4 font-medium text-gray-700 transition-all duration-300 hover:text-[#05141f]"
                >
                  <span
                    className="relative inline-block
                   before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-[#013566]
                   before:transition-all before:duration-300 hover:before:w-full"
                  >
                    Sales Offers
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/services-offers"
                  className="relative block py-2 px-4 font-medium text-gray-700 transition-all duration-300 hover:text-[#05141f]"
                >
                  <span
                    className="relative inline-block
                   before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-[#013566]
                   before:transition-all before:duration-300 hover:before:w-full"
                  >
                    Service Offers
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      className={`bg-white sticky top-0 z-50 transition-all duration-300 mx-auto w-full max-w-[1400px] ${
        isScrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
      {/* Main navigation container */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-7">
        <div className="relative flex items-center justify-between h-20 ">
          {/* Logo - Left aligned */}
          <div className="flex items-center">
            <div
              className="text-2xl font-bold text-[#05141f] cursor-pointer flex items-center transition-transform duration-300 hover:scale-105"
              onClick={() => {
                closeAllMenus();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2"
                viewBox="0 0 24 24"
                fill="#05141f"
              >
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3zM3 5h2v2H3V5zm0 4h2v2H3V9zm0 4h2v2H3v-2zm12-8h2v2h-2V5zm0 4h2v2h-2V9zm0 4h2v2h-2v-2z" />
              </svg>
              <span className="hidden sm:inline">HYUNDAI</span>
            </div>
          </div>

          {/* Desktop Navigation - Center aligned */}
<div className="hidden lg:flex items-center justify-center flex-1">
  <div className="flex space-x-1">
    {mainNavItems?.map((item) => (
      <div key={item.name} className="relative group">
        <button
          onClick={() => toggleDropdown(item.name)}
          className={`text-gray-800 px-2 py-2 xl:text-[0.9rem] lg:text-[0.8rem] font-medium transition-all duration-300 hover:text-[#05141f] flex items-center relative group ${
            activeDropdown === item.name ? "text-[#05141f] font-semibold" : ""
          }`}
        >
          {item.name}
          {item.hasDropdown && (
            <ChevronDown
              size={14}
              className={`ml-1 transition-transform duration-300 ease-in-out ${
                activeDropdown === item.name ? "rotate-180" : ""
              }`}
            />
          )}
          <span
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#013566] transition-all duration-300 ${
              activeDropdown === item.name
                ? "w-4/5"
                : "w-0 group-hover:w-4/5"
            }`}
          ></span>
        </button>
      </div>
    ))}
  </div>
</div>



          {/* Right side icons - Search and Account */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-[#05141f] transition-colors p-2 rounded-full hover:bg-gray-100 hidden lg:block">
              <Search size={20} />
            </button>
            <button className="text-gray-600 hover:text-[#05141f] transition-colors p-2 rounded-full hover:bg-gray-100 hidden lg:block">
              <User size={20} />
            </button>
            <button className="bg-[#013566] text-white  px-4 py-2 rounded-sm text-sm font-medium transition-colors duration-300 hidden lg:block btn">
              Find a Dealer
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setActiveDropdown(null);
              }}
              className="lg:hidden text-gray-600 hover:text-[#05141f] transition-colors p-2 rounded-full hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Desktop Dropdown Panels */}
        {activeDropdown && (
          <div className="hidden lg:block absolute left-0 right-0 bg-white shadow-xl border-t border-gray-100 z-40 animate-fadeIn">
            <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
              {
                mainNavItems.find((item) => item.name === activeDropdown)
                  ?.dropdownContent
              }
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-40 mt-20 overflow-y-auto pb-20">
          <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 py-4">
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <div key={item.name} className="border-b border-gray-100">
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`block w-full text-left text-gray-700 hover:text-[#05141f] py-4 px-2 text-base font-medium transition-colors ${
                      activeDropdown === item.name
                        ? "text-[#05141f] font-semibold"
                        : ""
                    } flex justify-between items-center`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          activeDropdown === item.name
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Mobile Dropdown Content */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div className="pl-4 pb-4 space-y-4">
                      {item.name === "Our Cars" ? (
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2 pb-2">
                            {categories.map((category) => (
                              <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`text-sm font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                                  activeCategory === category
                                    ? "text-white bg-[#05141f] shadow-md"
                                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                                }`}
                              >
                                {category}
                              </button>
                            ))}
                          </div>
                          <div className="space-y-6">
                            {activeCategory === "ALL" ? (
                              Object.entries(carModels).map(
                                ([category, cars]) => (
                                  <div key={category} className="space-y-3">
                                    <h4 className="font-bold text-gray-900 text-base flex items-center">
                                      <span className="bg-blue-100 text-[#05141f] px-2 py-1 rounded-full mr-2 text-xs">
                                        {category}
                                      </span>
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3 pl-1">
                                      {cars.map((car) => (
                                        <div
                                          key={`${category}-${car.name}`}
                                          className="flex flex-col items-center p-3 font-medium rounded-lg transition-all duration-200 border border-transparent hover:border-blue-100"
                                          onClick={() => {
                                            //   navigate(`/models/${car.name.toLowerCase().replace(/\s+/g, "-")}`)
                                            closeAllMenus();
                                          }}
                                        >
                                          <div className="w-full h-20 mb-2 flex items-center justify-center">
                                            <img
                                              src={
                                                car?.image || "/placeholder.png"
                                              } // fallback if image missing
                                              alt={car?.name || "Car"}
                                              className="object-contain h-full w-full transition-transform duration-300 group-hover:scale-110"
                                            />
                                          </div>
                                          <span className="text-sm font-semibold text-gray-700 text-center">
                                            {car.name}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )
                              )
                            ) : (
                              <div className="grid grid-cols-2 gap-3">
                                {carModels[activeCategory]?.map((car) => (
                                  <div
                                    key={car.name}
                                    className="flex flex-col items-center p-3 font-medium rounded-lg transition-all duration-200 border border-transparent hover:border-blue-100"
                                    onClick={() => {
                                      //   navigate(`/models/${car.name.toLowerCase().replace(/\s+/g, "-")}`)
                                      closeAllMenus();
                                    }}
                                  >
                                    <div className="w-full h-20 mb-2 flex items-center justify-center">
                                      <img
                                        src={car?.image || "/placeholder.png"} // fallback if image missing
                                        alt={car?.name || "Car"}
                                        className="object-contain h-full w-full transition-transform duration-300 group-hover:scale-110"
                                      />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700 text-center">
                                      {car.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        React.cloneElement(item.dropdownContent, {
                          className: "py-2 w-full",
                        })
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile bottom action buttons */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between">
                <button className="flex-1 bg-[#05141f] text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-[#00408F] transition-colors duration-300 mx-1">
                  Find a Dealer
                </button>
                <button className="flex-1 bg-white border border-[#05141f] text-[#05141f] py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-300 mx-1">
                  Book Test Drive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {(isMobileMenuOpen || activeDropdown) && (
        <div
          className="fixed inset-0 bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={closeAllMenus}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
