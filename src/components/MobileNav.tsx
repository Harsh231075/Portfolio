'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { FaEnvelope, FaComments, FaHome } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isPortfolio = pathname === '/portfolio';
  const isAchievement = pathname === '/achievements';
  const isChat = pathname === '/chat';

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800/60 backdrop-blur-sm flex justify-around items-center py-4 z-40 lg:hidden">
      {/* Achievement or Home */}
      <Link
        href={isAchievement ? '/' : '/achievements'}
        className="flex flex-col items-center text-[#05468D] relative"
      >
        <div className="absolute -top-6 bg-gradient-to-r from-red-500 to-indigo-500 text-white text-[10px] px-2 py-1 rounded-full shadow-md animate-bounce">
          {isAchievement ? 'Home' : 'Achievement'}
        </div>
        {isAchievement ? (
          <FaHome size={24} className="text-green-500" />
        ) : (
          <Image
            width={100}
            height={100}
            src="/award.png"
            alt="Achievement"
            className="w-6 h-6 object-contain"
          />
        )}
      </Link>

      {/* Gmail - Always same */}
      <a
        href="mailto:harshsingh231075@gmail.com"
        className="flex flex-col items-center text-[#05468D] relative"
      >
        <div className="absolute -top-6 bg-gradient-to-r from-red-500 to-indigo-500 text-white text-[10px] px-2 py-1 rounded-full shadow-md animate-bounce">
          Contact
        </div>
        <FaEnvelope size={25} className="text-rose-700" />
      </a>

      {/* Project or Home */}
      <Link
        href={isPortfolio ? '/' : '/portfolio'}
        className="flex flex-col items-center text-[#05468D] relative"
      >
        <div className="absolute -top-6 bg-gradient-to-r from-red-500 to-indigo-500 text-white text-[10px] px-2 py-1 rounded-full shadow-md animate-bounce">
          {isPortfolio ? 'Home' : 'Projects'}
        </div>
        {isPortfolio ? (
          <FaHome size={24} className="text-green-500" />
        ) : (
          <Image
            width={100}
            height={100}
            src="/project.png"
            alt="Project"
            className="w-6 h-6 object-contain"
          />
        )}
      </Link>

      {/* Chat or Home */}
      <Link
        href={isChat ? '/' : '/chat'}
        className="relative flex flex-col items-center text-[#05468D]"
      >
        <div className="absolute -top-6 bg-gradient-to-r from-red-500 to-indigo-500 text-white text-[10px] px-2 py-1 rounded-full shadow-md animate-bounce">
          {isChat ? 'Home' : 'Hello👋'}
        </div>
        {isChat ? (
          <FaHome size={24} className="text-green-500" />
        ) : (
          <FaComments size={26} className="text-red-500" />
        )}
      </Link>
    </div>
  );
}
