import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaExternalLinkAlt, FaComments } from 'react-icons/fa';

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800/60 backdrop-blur-sm  flex justify-around items-center py-4 z-40 lg:hidden">

      {/* Phone */}
      <a
        href="#"
        className="flex flex-col items-center text-[#05468D] relative"
      >
        <div className="absolute -top-6 bg-gradient-to-r from-red-500 to-indigo-500 text-white text-[10px] px-2 py-1 rounded-full shadow-md animate-bounce">
          Acheivemnt
        </div>
        <img src="/award.png" alt="Phone" className="w-6 h-6 object-contain" />
      </a>

      {/* Gmail */}
      <a
        href="mailto:harshsingh231075@gmail.com"
        className="flex flex-col items-center text-[#05468D] relative"
      >
        <div className="absolute -top-6  bg-gradient-to-r from-red-500 to-indigo-500 text-white text-[10px] px-2 py-1 rounded-full shadow-md animate-bounce">
          Contact
        </div>
        <FaEnvelope size={25} className="text-rose-700" />
      </a>

      {/* LinkedIn */}
      <a
        href="/portfolio"
        className="flex flex-col items-center text-[#05468D] relative"
      >
        <div className="absolute -top-6  bg-gradient-to-r from-red-500 to-indigo-500 text-white text-[10px] px-2 py-1 rounded-full shadow-md animate-bounce">
          Projects
        </div>
        <img src="/project.png" alt="project" className="w-6 h-6 object-contain text-white" />

      </a>

      {/* Talk to Me */}
      <a
        href="#" // Or WhatsApp/chat route
        className="relative flex flex-col items-center text-[#05468D]"
      >
        {/* Hello bubble */}
        <div className="absolute -top-6  bg-gradient-to-r from-red-500 to-indigo-500 text-white text-[10px] px-2 py-1 rounded-full shadow-md animate-bounce">
          Hello👋
        </div>

        {/* Chat Icon */}
        <FaComments size={26} className="text-red-500" />


      </a>
    </div>
  );
}
