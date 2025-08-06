import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Download CV Button */}
          <Link
            href="/Harsh-singh-baghel-resume.pdf" // <-- Replace with actual resume path
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white text-sm px-4 py-2 rounded-full hover:bg-red-500 transition-colors shadow"
          >
            Download CV
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-red-500 font-medium hover:text-red-400 transition-colors">
              Home
            </Link>
            {/* <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link> */}
            <Link href="/portfolio" className="text-gray-300 hover:text-red-400 transition-colors">
              Projects
            </Link>
            <Link href="/achievements" className="text-white-500 font-medium hover:text-red-400 transition-colors">
              achievements
            </Link>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <Link href="https://github.com/harsh231075" className="text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
            </Link>
            <Link href="https://www.linkedin.com/in/harsh-singh-baghel/" className="text-gray-400 hover:text-white transition-colors">
              <FaLinkedinIn size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
