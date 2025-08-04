'use client'
import React from 'react'
import { Award, Calendar, ExternalLink, Download } from 'lucide-react';
import certificates from '@/Data/Certificates';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileNav';
import Header from '@/components/Header';


function page() {


  return (
    <>
      <Header />
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

      <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className={`bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl ${index % 2 === 0 ? 'fade-left' : 'fade-right'
                  }`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    <Award className="h-4 w-4 inline mr-1" />
                    Certified
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                  <p className="text-blue-300 font-medium mb-2">{cert.issuer}</p>

                  <div className="flex items-center text-white/60 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {cert.date}
                  </div>

                  <p className="text-white/80 text-sm mb-4 leading-relaxed">
                    {cert.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-lg text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-white/20 pt-4">
                    <p className="text-white/60 text-xs mb-3">
                      Credential ID: {cert.credentialId}
                    </p>

                    <div className="flex space-x-3">
                      <button className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors duration-300">
                        <ExternalLink className="h-4 w-4" />
                        <span>Verify</span>
                      </button>
                      <button className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm transition-colors duration-300">
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <MobileBottomNav />
      <Footer />
    </>
  )
}

export default page