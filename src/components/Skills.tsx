import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaAws } from "react-icons/fa";
import { SiEthereum } from "react-icons/si";

const skills = [
  { name: "MERN Stack", icon: "/mern.png" },
  { name: "Next.js", icon: "/next.png" },
  { name: "Socket.IO", icon: "/socket.png" },
  { name: "Python", icon: "/python.png" },
  { name: "Java", icon: "/java.png" },
  { name: "WordPress", icon: "/wordpress.png" },
  { name: "Tailwind", icon: "/tailwind.png" },
  { name: "PostgreSQL", icon: "/post.png" },
  { name: "Prisma", icon: "/prisma.png" },
  { name: "LangChain", icon: "/langchain.png" },
  { name: "n8n", icon: "/n-8-n.png" },
  { name: "Swagger", icon: "/swagger.avif" },

];

const additionalSkills = [
  {
    title: "AWS & DevOps",
    icon: FaAws,
    description: "Deploying and managing web applications on AWS.",
    technologies: ["EC2 Instances", "S3 Buckets", "IAM", "Amazon Cognito", "Elastic Beanstalk", "CI/CD Pipelines"],
  },
  {
    title: "Blockchain",
    icon: SiEthereum,
    description: "Solidity development and local smart-contract testing with Hardhat.",
    technologies: ["Ethereum", "Solidity", "Hardhat"],
  },
];

const Skills = () => {
  return (
    <>
      <section id="skills" className="py-8 bg-black
      
      ">
        <div className="max-w-5xl mx-auto px-6
         
        ">
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
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 place-items-center
               ">
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
                  <Image
                    width={100}
                    height={100}
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
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {additionalSkills.map(({ title, icon: Icon, description, technologies }) => (
              <div key={title} className="rounded-xl border border-gray-800 bg-gray-900/60 p-5">
                <div className="flex items-center gap-3">
                  <Icon aria-hidden="true" className="h-7 w-7 shrink-0 text-teal-400" />
                  <h3 className="text-base font-semibold text-white">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-400">{description}</p>
                <ul aria-label={`${title} skills`} className="mt-4 flex flex-wrap gap-2">
                  {technologies.map(technology => (
                    <li key={technology} className="rounded-md border border-teal-900/60 bg-teal-950/30 px-2.5 py-1.5 text-xs text-teal-200">
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default Skills;
