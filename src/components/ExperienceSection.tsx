import React from 'react';

const ExperienceSection = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700 transition-all duration-500 hover:shadow-gray-700/50">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-teal-400 mb-8 pb-4 border-b-2 border-teal-600 tracking-wide text-center uppercase">
            Professional Experience
          </h2>

          {/* Current Role - Daphis Lab */}
          <div className="border-l-4 border-teal-500 pl-6 sm:pl-8 mb-10 relative group">
            {/* Timeline dot */}
            <div className="absolute -left-3 top-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-500 border-4 border-gray-900 shadow-lg transform group-hover:scale-125 transition-transform duration-300 ease-in-out"></div>

            <div className="flex justify-between items-start flex-wrap mb-6">
              <div className="flex-1">
                <h3 className="text-xl sm:text-3xl font-serif font-bold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">
                  Full Stack Developer Intern
                </h3>
                <h4 className="text-base sm:text-xl text-gray-300 italic mb-2 font-medium">
                  Daphis Lab (Delhi)
                </h4>
              </div>
              <div className="text-xs sm:text-sm text-gray-200 font-medium bg-teal-800 px-3 py-1 rounded-full shadow-md mt-2 sm:mt-0">
                July 29, 2025 - Present
              </div>
            </div>

            <div className="text-gray-300 mb-8">
              <p className="mb-5 leading-relaxed text-sm sm:text-lg">
                Currently working remotely as a Full Stack Developer Intern, contributing to real-world applications by handling both frontend and backend tasks, integrating APIs, and refining features based on feedback.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Contributing to real-world applications with full-stack development",
                  "Handling both frontend and backend development tasks",
                  "Integrating APIs and implementing seamless data flow",
                  "Refining features based on user and team feedback",
                  "Working in agile development environment with team collaboration",
                  "Enhancing skills in scalable system design and architecture"
                ].map((item, index) => (
                  <li key={index} className="flex items-start group">
                    <span className="text-teal-400 font-extrabold text-lg sm:text-xl mr-3 mt-0.5 transform group-hover:translate-x-1 transition-transform duration-200">»</span>
                    <span className="group-hover:text-white transition-colors duration-300 text-sm sm:text-lg">
                      {highlightTech(item)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <span className="font-serif font-bold text-white mr-3 text-base sm:text-lg">Technologies:</span>
              <div className="inline-flex flex-wrap gap-3 mt-4">
                {[
                  "React.js", "Node.js", "Express.js", "MongoDB", "JavaScript",
                  "API Integration", "Full Stack Development", "Agile Development"
                ].map((tech, index) => (
                  <span key={index} className="bg-gray-700 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-teal-300 border border-teal-700 hover:bg-teal-700 hover:text-white transition-colors duration-300 shadow-md">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Previous Role - Webseeder */}
          <div className="border-l-4 border-gray-600 pl-6 sm:pl-8 mb-10 relative group opacity-80">
            {/* Timeline dot */}
            <div className="absolute -left-3 top-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-600 border-4 border-gray-900 shadow-lg transform group-hover:scale-125 transition-transform duration-300 ease-in-out"></div>

            <div className="flex justify-between items-start flex-wrap mb-6">
              <div className="flex-1">
                <h3 className="text-xl sm:text-3xl font-serif font-bold text-white mb-2 group-hover:text-gray-300 transition-colors duration-300">
                  MERN Stack Developer Intern
                </h3>
                <h4 className="text-base sm:text-xl text-gray-300 italic mb-2 font-medium">
                  Webseeder Technologies
                </h4>
              </div>
              <div className="text-xs sm:text-sm text-gray-200 font-medium bg-gray-700 px-3 py-1 rounded-full shadow-md mt-2 sm:mt-0">
                June 2025 - July 28, 2025
              </div>
            </div>

            <div className="text-gray-300 mb-8">
              <p className="mb-5 leading-relaxed text-sm sm:text-lg">
                Worked as a MERN Stack Developer Intern, focusing on full-stack web development using modern JavaScript technologies.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Developed responsive web applications using React.js and modern JavaScript (ES6+)",
                  "Built RESTful APIs and backend services using Node.js and Express.js",
                  "Designed and implemented database schemas using MongoDB",
                  "Collaborated with team members on version control using Git and GitHub"
                ].map((item, index) => (
                  <li key={index} className="flex items-start group">
                    <span className="text-gray-400 font-extrabold text-lg sm:text-xl mr-3 mt-0.5 transform group-hover:translate-x-1 transition-transform duration-200">»</span>
                    <span className="group-hover:text-white transition-colors duration-300 text-sm sm:text-lg">
                      {highlightTech(item)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <span className="font-serif font-bold text-white mr-3 text-base sm:text-lg">Technologies:</span>
              <div className="inline-flex flex-wrap gap-3 mt-4">
                {[
                  "MongoDB", "Express.js", "React.js", "Node.js", "JavaScript",
                  "HTML5", "CSS3", "Git", "RESTful APIs"
                ].map((tech, index) => (
                  <span key={index} className="bg-gray-700 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-gray-400 border border-gray-600 hover:bg-gray-600 hover:text-white transition-colors duration-300 shadow-md">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Optional: highlight keywords like React.js, MongoDB, etc.
const highlightTech = (text: string) => {
  const keywords = ["React.js", "JavaScript", "Node.js", "Express.js", "MongoDB", "Git", "GitHub", "API", "APIs", "Full Stack", "frontend", "backend"];
  const parts = text.split(new RegExp(`(${keywords.join("|")})`, "gi"));
  return parts.map((part, i) =>
    keywords.includes(part) ? (
      <strong key={i} className="text-teal-300">{part}</strong>
    ) : (
      part
    )
  );
};

export default ExperienceSection;