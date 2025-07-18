'use client'
import React from "react";
import { FaFacebookF, FaYoutube, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
// import hyundaiLogo from "../assets/hyundai-logo-white.png"; // Left logo
// import hansHyundaiLogo from "../assets/hyundai-logo.png";    // Right logo

const MainFooter = () => {
  return (
    <footer className="bg-[#191919] text-gray-300 text-sm  p-0 m-0 px-4 w-full mx-auto max-w-full" style={{maxWidth:"1400px"}} >
      <div className="mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center border-b border-gray-700">
        {/* Left Section */}
        <div className="flex items-center gap-6 mb-4 md:mb-0">
          {/* <img src={hyundaiLogo} alt="Hyundai" className="h-6" /> */}
          <div className="flex gap-4 items-center">
            <a href="#" className="hover:text-white">Hyundai India</a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:text-white">Contact Us</a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:text-white">Legal Disclaimer</a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex gap-5 text-xl social-icons">
          <a href="#" className="hover:text-white"><FaFacebookF /></a>
          <a href="#" className="hover:text-white"><FaYoutube /></a>
          <a href="#" className="hover:text-white"><FaTwitter /></a>
          <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          <a href="#" className="hover:text-white"><FaInstagram /></a>
        </div>
      </div>

      {/* Bottom Text + Logo */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-xs text-gray-500 mb-2 md:mb-0">
          Copyright 2025 Hyundai Motor India. All Rights Reserved.
        </p>
        <div className="flex items-center gap-2">
          {/* <img src={hansHyundaiLogo} alt="HANS HYUNDAI" className="h-5" /> */}
          <span className="text-[#0033A1] font-medium text-sm">HANS HYUNDAI</span>
        </div>
      </div>
        <div className="text-white text-center py-2 text-xs">
        <p>©   Your Company Name. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default MainFooter;
