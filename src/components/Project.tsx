'use client';
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Project = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden
     bg-[url('https://static.vecteezy.com/system/resources/previews/010/042/254/non_2x/dark-green-luxury-background-with-indian-mandala-ornament-elegant-and-classic-illustration-vector.jpg')]
      ">
      {/* Background Video */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center min-h-screen px-4
       bg-[url('https://static.vecteezy.com/system/resources/previews/010/042/254/non_2x/dark-green-luxury-background-with-indian-mandala-ornament-elegant-and-classic-illustration-vector.jpg')]
      bg-cover bg-center text-white
      ">
        <div
          className={`transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            Creative
            <span className="block bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover amazing projects and innovative solutions crafted with passion
          </p>

          {/* Button */}
          <div
            className={`transition-all duration-1200 delay-300 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
          >
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out overflow-hidden">
              {/* Hover Layer */}
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
              <Link href='/portfolio' ><span className="relative z-10 mr-3">View My Projects</span> </Link>
              <ArrowRight className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Project;
