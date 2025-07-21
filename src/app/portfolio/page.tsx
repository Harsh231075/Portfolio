"use client";
import React, { useState } from 'react';
import { Play, ExternalLink, Github, Filter, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  video?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.",
    category: "Web Development",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication and real-time transaction monitoring.",
    category: "Mobile Development",
    technologies: ["React Native", "TypeScript", "Firebase"],
    image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true
  },
  {
    id: 3,
    title: "AI Dashboard Analytics",
    description: "Data visualization dashboard with machine learning insights and predictive analytics for business intelligence.",
    category: "AI/ML",
    technologies: ["Python", "TensorFlow", "D3.js", "FastAPI"],
    image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpg?auto=compress&cs=tinysrgb&w=800",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: false
  },
  {
    id: 4,
    title: "Social Media Platform",
    description: "Modern social networking platform with real-time messaging, stories, and content sharing capabilities.",
    category: "Web Development",
    technologies: ["Next.js", "GraphQL", "PostgreSQL", "Redis"],
    image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpg?auto=compress&cs=tinysrgb&w=800",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: false
  },
  {
    id: 5,
    title: "IoT Smart Home System",
    description: "Complete smart home automation system with voice control, energy monitoring, and security features.",
    category: "IoT",
    technologies: ["Arduino", "Raspberry Pi", "React", "MQTT"],
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true
  },
  {
    id: 6,
    title: "Cryptocurrency Tracker",
    description: "Real-time cryptocurrency tracking app with portfolio management and price alerts.",
    category: "FinTech",
    technologies: ["Vue.js", "Node.js", "WebSocket", "Chart.js"],
    image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: false
  }
];

const categories = ["All", "Web Development", "Mobile Development", "AI/ML", "IoT", "FinTech"];

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isVideoPlaying, setIsVideoPlaying] = useState<number | null>(null);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = projects.filter(project => project.featured);

  const handleVideoPlay = (projectId: number) => {
    setIsVideoPlaying(projectId);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
            <span className="text-amber-400 text-sm font-medium">Portfolio</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Featured
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"> Works</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore my latest projects showcasing innovative solutions across web development,
            mobile apps, AI/ML, and emerging technologies.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full mr-4"></div>
            Featured Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-amber-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/10"
              >
                <div className="relative h-64 overflow-hidden">
                  {project.video && isVideoPlaying === project.id ? (
                    <video
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      src={project.video}
                    />
                  ) : (
                    <>
                      <Image
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                      {project.video && (
                        <button
                          onClick={() => handleVideoPlay(project.id)}
                          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                          </div>
                        </button>
                      )}
                    </>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-amber-500 text-slate-900 text-xs font-semibold rounded-full">
                      FEATURED
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-slate-700 text-slate-300 text-xs rounded-full">
                      {project.category}
                    </span>
                    <div className="flex space-x-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className="p-2 bg-slate-700 hover:bg-amber-500 text-slate-300 hover:text-slate-900 rounded-lg transition-colors duration-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          className="p-2 bg-slate-700 hover:bg-amber-500 text-slate-300 hover:text-slate-900 rounded-lg transition-colors duration-300"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded border border-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full mr-4"></div>
              All Projects
            </h3>
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-slate-400" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedCategory === category
                      ? 'bg-amber-500 text-slate-900'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-xl hover:border-slate-600 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                {project.video && isVideoPlaying === project.id ? (
                  <video
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    src={project.video}
                  />
                ) : (
                  <>
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    {project.video && (
                      <button
                        onClick={() => handleVideoPlay(project.id)}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
                        </div>
                      </button>
                    )}
                  </>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded">
                    {project.category}
                  </span>
                  <div className="flex space-x-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        className="p-1.5 bg-slate-700/50 hover:bg-slate-600 text-slate-400 hover:text-white rounded transition-colors duration-300"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        className="p-1.5 bg-slate-700/50 hover:bg-slate-600 text-slate-400 hover:text-white rounded transition-colors duration-300"
                      >
                        <Github className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-sm mb-3 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-slate-700/30 text-slate-400 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-0.5 bg-slate-700/30 text-slate-400 text-xs rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 font-semibold rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25 cursor-pointer">
            <span>View More Projects</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </div>
          <p className="text-slate-400 mt-4">
            Want to see more? Check out my GitHub for additional projects and contributions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;