
'use client'
import React, { useState } from 'react';
import { ArrowLeft, Github, ExternalLink, Calendar, User, Code, Star, Eye, GitBranch, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import projectData from '@/Data/Project'; // Importing the project data

const ProjectDetailsPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const params = useParams();
  const id = parseInt(params.id as string);
  // console.log("Project ID:", id);

  const project = projectData.find((p) => p.id === id);

  // console.log("Matched Project:", projectData);

  if (!project) {
    return <div>Project not found</div>;
  }

  const toggleTheme = () => {
    setIsDark(!isDark);
  };




  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Fixed Header */}
      <div className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button className={`flex items-center transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              <Link href="/portfolio"> <span className="text-sm sm:text-base">Back to Projects</span></Link>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Added top padding for fixed header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-20 sm:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Project Header */}
            <div className={`rounded-lg shadow-sm border transition-colors duration-300 p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h1 className={`text-2xl sm:text-3xl font-bold mb-2 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </h1>
                  <p className={`text-base sm:text-lg transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.subtitle}
                  </p>
                </div>
                <div className="flex gap-3 mt-4 sm:mt-0">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-4 py-2 border rounded-lg transition-colors text-sm ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                </div>
              </div>

              {/* Project Stats */}
              <div className={`flex flex-wrap gap-4 text-sm transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  {project.stats.stars} stars
                </div>
                <div className="flex items-center">
                  <GitBranch className="w-4 h-4 mr-1" />
                  {project.stats.forks} forks
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {project.stats.watchers} watching
                </div>
              </div>
            </div>

            {/* Project Images */}
            <div className={`rounded-lg shadow-sm border transition-colors duration-300 p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>Screenshots</h2>

              {/* Main Image */}
              <div className="mb-4">
                <Image
                  key={currentImageIndex}
                  width={800}
                  height={500}
                  loading="lazy"
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                  className="w-full h-64 sm:h-80 object-cover rounded-lg"
                />
              </div>

              {/* Image Thumbnails */}
              <div className="flex gap-2 overflow-x-auto">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-colors ${currentImageIndex === index ? 'border-blue-500' : isDark ? 'border-gray-600' : 'border-gray-200'
                      }`}
                  >
                    <Image
                      width={800}
                      height={500}
                      loading="lazy"
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className={`rounded-lg shadow-sm border transition-colors duration-300 p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>About This Project</h2>
              <p className={`leading-relaxed mb-4 text-sm sm:text-base transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {project.description}
              </p>
              <p className={`leading-relaxed text-sm sm:text-base transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {project.longDescription}
              </p>
            </div>

            {/* Features */}
            <div className={`rounded-lg shadow-sm border transition-colors duration-300 p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className={`text-sm sm:text-base transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">

            {/* Project Info */}
            <div className={`rounded-lg shadow-sm border transition-colors duration-300 p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>Project Info</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className={`w-4 h-4 mr-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <div>
                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Created: </span>
                    <span className={`${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{project.createdDate}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <User className={`w-4 h-4 mr-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <div>
                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Team: </span>
                    <span className={`${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{project.teamSize}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Code className={`w-4 h-4 mr-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <div>
                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Category: </span>
                    <span className={`${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{project.category}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-4 h-4 mr-3 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Status: </span>
                    <span className="text-green-600 font-medium">{project.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className={`rounded-lg shadow-sm border transition-colors duration-300 p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-xs sm:text-sm rounded-full border transition-colors duration-300 ${isDark ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-gray-100 text-gray-700 border-gray-200'}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className={`rounded-lg shadow-sm border transition-colors duration-300 p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>Links</h3>
              <div className="space-y-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center w-full p-3 border rounded-lg transition-colors duration-300 ${isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <ExternalLink className={`w-5 h-5 mr-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <div>
                    <div className={`text-sm font-medium transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Live Demo</div>
                    <div className={`text-xs transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>View the live project</div>
                  </div>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center w-full p-3 border rounded-lg transition-colors duration-300 ${isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <Github className={`w-5 h-5 mr-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <div>
                    <div className={`text-sm font-medium transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Source Code</div>
                    <div className={`text-xs transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>View on GitHub</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;