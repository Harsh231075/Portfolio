// VideoCard.tsx
import React, { useState, useRef } from 'react';
import { Eye, Github, Info } from 'lucide-react';

interface VideoCardProps {
  title: string;
  description: string;
  videoSrc: string;
  category: 'mini' | 'major'; // optional but good for future use
}

const VideoCard: React.FC<VideoCardProps> = ({ title, description, videoSrc }) => {
  const [isHovered, setIsHovered] = useState(false);
  // const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
      // setIsPlaying(true);
    }
  };

  const handleGithub = () => {
    console.log('GitHub clicked');
  };

  const handleView = () => {
    console.log('View clicked');
  };

  const handleDetails = () => {
    console.log('Details clicked');
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-sm group cursor-pointer overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
        onMouseEnter={handleMouseEnter}
      >
        <div className="relative w-full h-64">
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-2xl"
            autoPlay
            muted
            loop
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className={`absolute inset-0 bg-black/20 bg-opacity-30 transition-all duration-300 rounded-2xl ${isHovered ? 'bg-opacity-50' : ''}`} />

          <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent rounded-b-2xl transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-white text-lg font-bold mb-2">{title}</h3>
            <p className="text-gray-200 text-sm">{description}</p>
          </div>
        </div>

        <div className={`absolute top-4 left-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button onClick={handleGithub} className="group/btn relative bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110">
            <Github size={16} />
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              GitHub
            </div>
          </button>
        </div>

        <div className={`absolute top-4 right-4 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button onClick={handleView} className="group/btn relative bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110">
            <Eye size={16} />
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              View
            </div>
          </button>

          <button onClick={handleDetails} className="group/btn relative bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110">
            <Info size={16} />
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Details
            </div>
          </button>
        </div>

        <div className={`absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl opacity-0 transition-opacity duration-500 -z-10 ${isHovered ? 'opacity-20 animate-pulse' : ''}`}></div>
      </div>
    </div>
  );
};

export default VideoCard;
