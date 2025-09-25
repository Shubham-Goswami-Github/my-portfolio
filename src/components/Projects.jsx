import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// Projects data
const projects = [
  {
    title: "Evoting System",
    description: "A secure Evoting System built using PHP, HTML, CSS, and JavaScript (2024).",
    image: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/Screenshot%202025-09-25%20145931.png", // replace with your cover photo
    github: "https://github.com/Shubham-Goswami-Github/evoting-php",
    demo: "#" // replace with live demo if available
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
  }
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen bg-gradient-to-b from-black to-primary px-6 py-20"
    >
      {/* Section Title */}
      <motion.h2
        className="text-5xl md:text-6xl font-bold text-secondary text-center mb-16"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        🚀 My Projects
      </motion.h2>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="bg-gradient-to-r from-gray-800 to-black rounded-2xl shadow-2xl overflow-hidden cursor-pointer flex flex-col"
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 2, boxShadow: "0 25px 35px rgba(0,0,0,0.5)" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Cover Image */}
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-60 object-cover"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.25 }}
            />

            {/* Project Details */}
            <motion.div
              className="p-6 flex flex-col justify-between flex-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-secondary mb-2">{project.title}</h3>
              <p className="text-gray-300 text-sm md:text-base mb-4">{project.description}</p>

              <div className="flex space-x-4 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-blue-600 text-white transition"
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
