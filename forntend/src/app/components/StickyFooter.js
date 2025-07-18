'use client'
import React from "react";
import { FaMapMarkerAlt, FaCar, FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";

const StickyFooter = () => {
  const router=useRouter();
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#05141f] text-white shadow-lg z-50 mx-auto  sticky-footer w-full" style={{maxWidth:"1320px"}}>
      <div className=" mx-auto flex justify-between items-center">
        {/* Locate Us */}
        <div className="flex-1 text-center border-r border-white/20 py-3  transition-colors  cursor-pointer hover:bg-[#002844]">
          <button className="flex flex-col items-center justify-center w-full px-2  cursor-pointer">
            <FaMapMarkerAlt className="text-xl mb-1" />
            <span className="text-xs sm:text-sm">Locate Us</span>
          </button>
        </div>
        
        {/* Request a Test Drive */}
        <div className="flex-1 text-center border-r border-white/20 py-3  transition-colors  cursor-pointer hover:bg-[#002844]" onClick={()=>"/test-drive" && router.push('/test-drive')}>
          <button className="flex flex-col items-center justify-center w-full px-2  cursor-pointer">
            <FaCar className="text-xl mb-1" />
            <span className="text-xs sm:text-sm">Request a Test Drive</span>
          </button>
        </div>
        
        {/* Click To Buy */}
        <div className="flex-1 text-center py-3 transition-colors  cursor-pointer hover:bg-[#002844]">
          <button className="flex flex-col items-center justify-center w-full px-2  cursor-pointer">
            <FaShoppingCart className="text-xl mb-1" />
            <span className="text-xs sm:text-sm">Click To Buy</span>
          </button>
        </div>
      </div>

    </footer>
  );
};

export default StickyFooter;