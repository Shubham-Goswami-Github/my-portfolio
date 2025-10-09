import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// Projects data
const projects = [
  {
    title: "Evoting System",
    description: "A secure Evoting System built using PHP, HTML, CSS, and JavaScript (2024).",
    image: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/Screenshot%202025-09-25%20145931.png",
    github: "https://github.com/Shubham-Goswami-Github/evoting-php",
    demo: "#"
  },
  {
    title: "Daily Expense Tracker",
    description: "Android Studio project built using Java and XML to track daily expenses (2025).",
    image: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/Screenshot%202025-09-25%20150733.png",
    github: "https://github.com/Shubham-Goswami-Github/Android-Daily-Expense-Tracker",
    demo: "#"
  },
  {
    title: "Unstop Clone Project",
    description: "A web application built using Django, PHP, HTML, CSS, Bootstrap, and JavaScript.",
    image: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/Screenshot%202025-09-25%20150607.png",
    github: "https://github.com/Shubham-Goswami-Github/unstop-clone",
    demo: "#"
  },
  {
    title: "Portfolio Website",
    description: "A responsive, animated portfolio website built using React, Tailwind CSS, and Framer Motion (2025).",
    image: "https://github.com/Shubham-Goswami-Github/portfolio-images/blob/main/portfolioproject.png?raw=true",
    github: "https://github.com/Shubham-Goswami-Github/portfolio-images",
    demo: "#"
  }
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-200 
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-20 transition-colors duration-500"
    >
      {/* Section Title */}
      <motion.h2
        className="text-5xl md:text-6xl font-bold text-[#e16928ff] dark:text-yellow-400 
                   text-center mb-16 drop-shadow-lg tracking-wide"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
      >
        🚀 My Projects
      </motion.h2>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="relative bg-white/30 dark:bg-black/30 rounded-2xl shadow-2xl overflow-hidden cursor-pointer
                       flex flex-col transition-all duration-500 hover:scale-105 hover:rotate-1 
                       hover:shadow-[0_25px_35px_rgba(0,0,0,0.5)]
                       border border-gray-200 dark:border-gray-700 backdrop-blur-lg group"
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 1, boxShadow: "0 25px 35px rgba(225,105,40,0.5)" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: false }}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 
                            bg-gradient-to-r from-[#e16928ff] to-yellow-400 blur-3xl transition-all duration-700"></div>

            {/* Cover Image */}
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-60 object-cover z-10 relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.25 }}
              viewport={{ once: false }}
            />

            {/* Project Details */}
            <motion.div
              className="p-6 flex flex-col justify-between flex-1 z-10 relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              viewport={{ once: false }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-[#e16928ff] dark:text-yellow-400 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-800 dark:text-gray-200 text-sm md:text-base mb-4">
                {project.description}
              </p>

              <div className="flex space-x-4 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full 
                             bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 
                             text-black dark:text-white transition"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full 
                             bg-gray-300 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-yellow-400 
                             text-black dark:text-black transition"
                >
                  <FaExternalLinkAlt size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
