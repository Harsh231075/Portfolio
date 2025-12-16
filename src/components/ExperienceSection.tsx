import React from 'react';

const ExperienceSection = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700 transition-all duration-500 hover:shadow-gray-700/50">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-teal-400 mb-8 pb-4 border-b-2 border-teal-600 tracking-wide text-center uppercase">
            Professional Experience
          </h2>

          {/* Current Role - MyMoment */}
          <div className="border-l-4 border-teal-500 pl-6 sm:pl-8 mb-10 relative group">
            {/* Timeline dot */}
            <div className="absolute -left-3 top-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-500 border-4 border-gray-900 shadow-lg transform group-hover:scale-125 transition-transform duration-300 ease-in-out"></div>

            <div className="flex justify-between items-start flex-wrap mb-6">
              <div className="flex-1">
                <h3 className="text-xl sm:text-3xl font-serif font-bold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">
                  Full Stack Developer
                </h3>
                <h4 className="text-base sm:text-xl text-gray-300 italic mb-2 font-medium">
                  MyMoment (Hyderabad/Remote)
                </h4>
              </div>
              <div className="text-xs sm:text-sm text-gray-200 font-medium bg-teal-800 px-3 py-1 rounded-full shadow-md mt-2 sm:mt-0">
                Nov 10, 2025 - Present
              </div>
            </div>

            <div className="text-gray-300 mb-8">
              <p className="mb-5 leading-relaxed text-sm sm:text-lg">
                Building scalable full-stack features using MERN/Next.js, optimized for performance and user experience, while working closely with product and design teams.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Building scalable full-stack features using MERN/Next.js, optimized for performance and user experience",
                  "Working closely with product and design teams to convert business requirements into efficient solutions",
                  "Handling API integrations, authentication flows, and deployment pipelines"
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
                  "React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "JavaScript",
                  "API Integration", "Authentication", "Deployment Pipelines"
                ].map((tech, index) => (
                  <span key={index} className="bg-gray-700 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-teal-300 border border-teal-700 hover:bg-teal-700 hover:text-white transition-colors duration-300 shadow-md">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Previous Role - Daphnis Labs */}
          <div className="border-l-4 border-gray-600 pl-6 sm:pl-8 mb-10 relative group opacity-80">
            {/* Timeline dot */}
            <div className="absolute -left-3 top-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-600 border-4 border-gray-900 shadow-lg transform group-hover:scale-125 transition-transform duration-300 ease-in-out"></div>

            <div className="flex justify-between items-start flex-wrap mb-6">
              <div className="flex-1">
                <h3 className="text-xl sm:text-3xl font-serif font-bold text-white mb-2 group-hover:text-gray-300 transition-colors duration-300">
                  Full Stack Developer Intern
                </h3>
                <h4 className="text-base sm:text-xl text-gray-300 italic mb-2 font-medium">
                  Daphnis Labs (Remote/New Delhi)
                </h4>
              </div>
              <div className="text-xs sm:text-sm text-gray-200 font-medium bg-gray-700 px-3 py-1 rounded-full shadow-md mt-2 sm:mt-0">
                July 28, 2025 - Nov 2025
              </div>
            </div>

            <div className="text-gray-300 mb-8">
              <p className="mb-5 leading-relaxed text-sm sm:text-lg">
                Worked under a Tech Lead to build scalable solutions using MERN/Next.js stack, coordinating with client teams for real-time requirement gathering and implementation.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Working under a Tech Lead to build scalable solutions using MERN/Next.js stack",
                  "Coordinating with client teams for real-time requirement gathering and implementation"
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
                  "MongoDB", "Express.js", "React.js", "Next.js", "Node.js", "JavaScript",
                  "MERN Stack", "Client Coordination"
                ].map((tech, index) => (
                  <span key={index} className="bg-gray-700 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-gray-400 border border-gray-600 hover:bg-gray-600 hover:text-white transition-colors duration-300 shadow-md">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Previous Role - iLegalLearn */}
          <div className="border-l-4 border-gray-600 pl-6 sm:pl-8 mb-10 relative group opacity-80">
            {/* Timeline dot */}
            <div className="absolute -left-3 top-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-600 border-4 border-gray-900 shadow-lg transform group-hover:scale-125 transition-transform duration-300 ease-in-out"></div>

            <div className="flex justify-between items-start flex-wrap mb-6">
              <div className="flex-1">
                <h3 className="text-xl sm:text-3xl font-serif font-bold text-white mb-2 group-hover:text-gray-300 transition-colors duration-300">
                  Software Engineer Intern
                </h3>
                <h4 className="text-base sm:text-xl text-gray-300 italic mb-2 font-medium">
                  iLegalLearn (Mumbai/Remote)
                </h4>
              </div>
              <div className="text-xs sm:text-sm text-gray-200 font-medium bg-gray-700 px-3 py-1 rounded-full shadow-md mt-2 sm:mt-0">
                Sep 2025 - Nov 2025
              </div>
            </div>

            <div className="text-gray-300 mb-8">
              <p className="mb-5 leading-relaxed text-sm sm:text-lg">
                Built backend and frontend modules for legal-tech platforms using Node.js, Express, MongoDB, and React, collaborating in an agile team environment.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Built backend and frontend modules for legal-tech platforms using Node.js, Express, MongoDB, and React",
                  "Integrated authentication, user dashboards, and data-driven components",
                  "Collaborated in an agile team, delivering features with proper documentation"
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
                  "Node.js", "Express.js", "MongoDB", "React.js", "JavaScript",
                  "Authentication", "Agile Development", "Documentation"
                ].map((tech, index) => (
                  <span key={index} className="bg-gray-700 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-gray-400 border border-gray-600 hover:bg-gray-600 hover:text-white transition-colors duration-300 shadow-md">
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
                  Full Stack Developer Intern
                </h3>
                <h4 className="text-base sm:text-xl text-gray-300 italic mb-2 font-medium">
                  Webseeder Pvt. Ltd (Indore)
                </h4>
              </div>
              <div className="text-xs sm:text-sm text-gray-200 font-medium bg-gray-700 px-3 py-1 rounded-full shadow-md mt-2 sm:mt-0">
                June 9, 2025 - July 27, 2025
              </div>
            </div>

            <div className="text-gray-300 mb-8">
              <p className="mb-5 leading-relaxed text-sm sm:text-lg">
                Developed full-stack web applications using the MERN stack, utilizing Git-based collaboration and agile practices to deliver modules on time.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Developed full-stack web applications using the MERN stack",
                  "Used Git-based collaboration and agile practices to deliver modules on time"
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
                  "MERN Stack", "Git", "Agile Development"
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
  const keywords = ["React.js", "Next.js", "JavaScript", "Node.js", "Express.js", "MongoDB", "Git", "GitHub", "API", "APIs", "Full Stack", "MERN", "frontend", "backend", "Agile", "authentication"];
  const parts = text.split(new RegExp(`(${keywords.join("|")})`, "gi"));
  return parts.map((part, i) =>
    keywords.some(keyword => keyword.toLowerCase() === part.toLowerCase()) ? (
      <strong key={i} className="text-teal-300">{part}</strong>
    ) : (
      part
    )
  );
};

export default ExperienceSection;