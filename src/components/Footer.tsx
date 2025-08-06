import { FaGithub, FaLinkedin, FaHeart, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-8 px-4 pb-25 md:py-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-6 ">
        <p className="text-sm md:text-2xl flex items-center leading-snug">
          Created with
          <FaHeart className="inline mx-2 text-red-500 animate-pulse relative top-[1px]" />
          by <span className="font-semibold text-base sm:text-lg md:text-xl ml-1">Harsh Singh Baghel</span>
        </p>


        <div className="flex items-center justify-center gap-6 bg-gray-700/30 px-6 py-3 rounded-full">
          <a
            href="https://github.com/harsh231075"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors duration-300 flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-700/70"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://linkedin.com/in/harsh-singh-baghel"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors duration-300 flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-700/70"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="mailto:harshsingh231075@example.com"
            className="hover:text-blue-400 transition-colors duration-300 flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-700/70"
          >
            <MdEmail size={18} />
          </a>
          <a
            href="https://www.instagram.com/harsh_singh_9685/"
            className="hover:text-blue-400 transition-colors duration-300 flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-700/70"
          >
            <FaInstagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;