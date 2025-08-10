'use client';
import React, { useState } from 'react';
import { Eye, Github, Info, Filter } from 'lucide-react';
import MobileBottomNav from '@/components/MobileNav';
import Chat from '@/components/Chat';
import { useRouter } from 'next/navigation';
// import Link from 'next/link';

interface VideoCardProps {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  category: 'mini' | 'major';
  GitHub?: string;
  link?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ id, title, description, videoSrc, GitHub, link }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleGithub = (link: string) => {
    <a href={link} target="_blank" rel="noopener noreferrer"></a>
  };

  const handleView = (link: string) => {
    <a href={link} target="_blank" rel="noopener noreferrer"></a>

  };

  const handleDetails = (id: string) => {

    router.push(`/portfolio/${id}`);

  };

  return (
    <div className="flex items-center justify-center p-4 ">
      <div
        className="relative w-full max-w-sm group cursor-pointer overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
        onMouseEnter={handleMouseEnter}
      >
        <div className="relative w-full h-64">
          <video
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
          <button onClick={() => GitHub && handleGithub(GitHub)} className="group/btn relative bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110">
            <a href={GitHub} target="_blank" rel="noopener noreferrer">    <Github size={16} /> </a>
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              GitHub
            </div>
          </button>
        </div>

        <div className={`absolute top-4 right-4 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button onClick={() => link && handleView(link)} className="group/btn relative bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110">
            <a href={link} target="_blank" rel="noopener noreferrer"> <Eye size={16} /></a>
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              View
            </div>
          </button>


          <button onClick={() => link && handleDetails(id)} className="group/btn relative bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110">
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

interface Project {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  category: 'mini' | 'major';
  GitHub?: string;
  link?: string
}

interface FilterButton {
  key: 'all' | 'mini' | 'major';
  label: string;
  count: number;
}

const ProjectGallery: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'mini' | 'major'>('all');

  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'NextGen Learn',
      description: 'Unlock Your True Potential with AI-Powered Personalized Learning!',
      videoSrc: '/bg.mp4',
      category: 'major',
      GitHub: 'https://github.com/Harsh231075/NextGen_Learn',
      link: 'https://next-gen-learn-eta.vercel.app/'
    },
    {
      id: '2',
      title: 'Self-Learning',
      description: 'AI-Powered Self-Learning Platform 1.0 is Live!',
      videoSrc: '/bg.mp4',
      category: 'mini',
      GitHub: 'https://github.com/Harsh231075/Self_Learning',
      link: 'https://self-learning-4xv7.vercel.app/'
    },
    {
      id: '3',
      title: 'E-Commerce Platform',
      description: 'e-commerce platform with usrer/admin authentication and a seamless shopping experience.',
      videoSrc: '/bg.mp4',
      category: 'mini',
      GitHub: 'https://github.com/Harsh231075/shoping',
      link: 'https://shoping-git-main-harsh-singhs-projects-a7a5f95c.vercel.app/'
    },
    {
      id: '4',
      title: 'College Website',
      description: 'A modern, responsive, and interactive college website',
      videoSrc: '/bg.mp4',
      category: 'major',
      GitHub: 'https://github.com/Harsh231075/College',
      link: 'https://college-hazel.vercel.app/'
    },
    {
      id: '5',
      title: 'CodeReviewPro',
      description: 'An AI-powered code review and learning platform with typing test and certification.',
      videoSrc: '/bg.mp4',
      category: 'major',
      GitHub: 'https://github.com/Harsh231075/CodeReviewPro',
      link: '"https://code-review-pro.vercel.app/'
    },
    {
      id: '6',
      title: 'URL Shortener',
      description: 'A full-stack URL shortener with analytics, authentication, and user-specific dashboards.',
      videoSrc: '/bg.mp4',
      category: 'major',
      GitHub: 'https://github.com/Harsh231075/url_shortner',
      link: "https://url-shortner-lemon-rho.vercel.app/"
    },
  ];

  const filteredProjects: Project[] = filter === 'all'
    ? mockProjects
    : mockProjects.filter((project: Project) => project.category === filter);

  const filterButtons: FilterButton[] = [
    { key: 'all', label: 'All Projects', count: mockProjects.length },
    { key: 'mini', label: 'Mini Projects', count: mockProjects.filter((p: Project) => p.category === 'mini').length },
    { key: 'major', label: 'Major Projects', count: mockProjects.filter((p: Project) => p.category === 'major').length }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className=" bg-[url('https://media.istockphoto.com/id/1248520802/photo/display-stand-design-3d-rendering.jpg?s=612x612&w=0&k=20&c=q0CfjDPB3gcLD_g1hHE3ltE-KS5qt_pDPVRlNz-iIFw=')] bg-cover bg-center bg-no-repeat">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h1 className=" text-2xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Project Gallery
            </h1>
            <p className="text-sm md:text-xl text-gray-400 max-w-2xl mx-auto">
              Explore my collection of innovative projects, from mini experiments to major applications
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="w-full overflow-x-auto">
            <div className="flex gap-3 sm:gap-4 px-2 sm:px-0 py-2 sm:py-4 justify-start sm:justify-center min-w-max sm:min-w-0">
              {filterButtons.map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`group relative px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm rounded-lg sm:rounded-xl font-medium transition-all duration-300 flex items-center gap-1 sm:gap-2 whitespace-nowrap
          ${filter === key
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700 hover:border-gray-600'}
        `}
                >
                  <Filter size={14} className="sm:size-4" />
                  <span>{label}</span>
                  <span
                    className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full 
            ${filter === key ? 'bg-white/20' : 'bg-gray-700 group-hover:bg-gray-600'}`}
                  >
                    {count}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Projects Grid */}
      <div className=" mx-auto px-6 md:px-24 py-12 bg-[url('https://media.istockphoto.com/id/1140265911/photo/modern-brick-wall-3d-rendering.jpg?s=612x612&w=0&k=20&c=T_ObRkTzdFtYkBAekQoXFvrTkI5j8VXVXGjQEwRyi1g=')] bg-cover bg-center bg-no-repeat">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No projects found</h3>
            <p className="text-gray-500">Try selecting a different filter</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-200">
                  {filter === 'all' ? 'All Projects' :
                    filter === 'mini' ? 'Mini Projects' : 'Major Projects'}
                </h2>
                <span className="text-sm text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
                  {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProjects.map((project: Project, index: number) => (
                // <Link href={`/portfolio/${project.id}`} key={index}>
                <div
                  key={index}
                  className="opacity-0 animate-fade-in"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <VideoCard
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    videoSrc={project.videoSrc}
                    category={project.category}
                    GitHub={project.GitHub}
                    link={project.link}
                  />
                </div>
                // </Link>
              ))}
            </div>
          </>
        )}
        <Chat />
        <MobileBottomNav />
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProjectGallery;