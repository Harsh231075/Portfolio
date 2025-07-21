import React from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "MERN Stack", icon: "/mern.png" },
  { name: "Next.js", icon: "/next.png" },
  { name: "Sokect.io", icon: "/socket.png" },
  { name: "Python", icon: "/python.png" },
  { name: "Java", icon: "/java.png" },
  { name: "C++", icon: "/c++.png" },
  { name: "Tailwind CSS", icon: "/tailwind.png" },
  { name: "PostgreSQL", icon: "/post.png" },
  { name: "Prisma", icon: "/prisma.png" },
  { name: "Langchain", icon: "/langchain.png" },
  { name: "N-8-N", icon: "/n-8-n.png" },
  { name: "Swagger", icon: "/swagger.avif" },

];

const Skills = () => {
  return (
    <>
      <section id="skills" className="py-8 bg-black">
        <div className="max-w-5xl mx-auto px-6">
          {/* Section Title */}
          <motion.h2
            className="text-center text-3xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Skills
          </motion.h2>

          {/* Skills Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 place-items-center">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Circular Icon */}
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <img
                    src={`${skill.icon}`} // Replace with your skill icons
                    alt={skill.name}
                    className="w-16 h-16 rounded-full "
                  />
                </div>
                {/* Skill Name */}
                <p className="text-sm font-medium text-white mt-2">{skill.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default Skills;