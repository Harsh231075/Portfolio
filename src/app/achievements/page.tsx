'use client'
import React, { useState } from 'react'
// import { Award, Calendar, ExternalLink, Download } from 'lucide-react';
import certificates from '@/Data/Certificates';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileNav';
import Header from '@/components/Header';
import Image from 'next/image';
import { X } from 'lucide-react';
import Chat from '@/components/Chat';
import SectionWrapper from '@/components/SectionWrapper';


function Page() {


  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openFullScreen = (image: string) => {
    setSelectedImage(image as string);
    // document.body.style.overflow = 'hidden'; // Prevent scrolling when image is open
  };

  const closeFullScreen = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Header />
      <SectionWrapper >
        {/* Hero Section */}
        <div className="bg-[url('/achivement.jpg')] bg-cover bg-center py-30 px-4 sm:px-6 lg:py-80 lg:px-8">
          <div className="text-center mb-16 fade-up ">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Professional Certificates
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Industry-recognized certifications that validate my expertise and commitment to continuous learning.
            </p>
            <a
              href="#certificates"
              className="inline-block mt-10 text-white text-6xl animate-bounce "
            >
              ↓
            </a>
          </div>
        </div>

        {/* Certificates Section */}
        <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl group"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      width={400}
                      height={300}
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-48 sm:h-56 md:h-48 object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openFullScreen(cert.image);
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                        Click to view full
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">{cert.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Full Screen Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-2 sm:p-4"
            onClick={closeFullScreen}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeFullScreen();
                }}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-red-600 hover:bg-red-700 text-white p-2 sm:p-3 rounded-full transition-colors duration-300 shadow-lg"
              >
                <X className="h-4 w-4 sm:h-6 sm:w-6" />
              </button>

              {/* Full Screen Image */}
              <Image
                width={800}
                height={600}
                src={selectedImage}
                alt="Certificate Full View"
                className="max-w-[95%] max-h-[95%] w-auto h-auto object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Click to close hint - Hidden on mobile */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-xs sm:text-sm bg-black/60 px-2 sm:px-3 py-1 rounded-full hidden sm:block">
                Click outside to close
              </div>

              {/* Mobile close hint */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white/80 text-xs bg-black/60 px-2 py-1 rounded-full sm:hidden">
                Tap X to close
              </div>
            </div>
          </div>
        )}
      </SectionWrapper >
      <Chat />
      <Footer />
      <MobileBottomNav />
    </>
  );
}
export default Page