import { motion } from "framer-motion";
import AnimatedPlanetStarBackground from "./AnimatedPlanetStarBackground";
import { FaGithub, FaExternalLinkAlt, FaFileDownload } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { LenisContext } from "../LenisProvider";

// 🧩 Project Data
const projects = [
  {
    title: "Universal Ecommerce Site",
    description:
      "A fully responsive, modern ecommerce platform supporting product browsing, cart system, authentication, and secure order handling. Built with a MERN stack architecture and optimized for performance.",
    learnings:
      "Gained hands-on experience with full-stack architecture, JWT authentication, REST API development, and efficient state management in React.",
    technologies: ["Node.js", "React", "Tailwind CSS", "MongoDB"],
    duration: "Nov 2025 – Under Devlopment",
    image:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/universalecommerce.png",
    github: "https://github.com/Shubham-Goswami-Github/universal-ecommerce",
    demo: "#",
    readme:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/universal-ecommerce/main/README.md",
  },

  {
    title: "Evoting System",
    description:
      "A secure digital voting platform developed with PHP, HTML, CSS, and JavaScript. Designed to ensure fairness, transparency, and a smooth user experience.",
    learnings:
      "Implemented session-based authentication, improved data security with SQL injection prevention, and learned structured backend management.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    duration: "March 2024 – May 2024",
    image:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/Screenshot%202025-09-25%20145931.png",
    github: "https://github.com/Shubham-Goswami-Github/evoting-php",
    demo: "#",
    readme:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/evoting-php/main/README.md",
  },

  {
    title: "Daily Expense Tracker (Android)",
    description:
      "An Android application that helps users track and analyze their daily spending. Built with Java and XML using Android Studio.",
    learnings:
      "Learned database integration with SQLite, efficient UI design with RecyclerView, and improved knowledge of Android activity lifecycle.",
    technologies: ["Java", "XML", "Android Studio", "SQLite"],
    duration: "Feb 2025 – April 2025",
    image:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/Screenshot%202025-09-25%20150733.png",
    github:
      "https://github.com/Shubham-Goswami-Github/Android-Daily-Expense-Tracker",
    demo: "#",
    readme:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/Android-Daily-Expense-Tracker/main/README.md",
  },

  {
    title: "Unstop Clone Project",
    description:
      "A full-stack web application replicating features of Unstop, created using Django, PHP, HTML, CSS, Bootstrap, and JavaScript.",
    learnings:
      "Enhanced backend knowledge with Django, improved multi-page data flow, and mastered responsive layouts using Bootstrap.",
    technologies: ["Django", "PHP", "Bootstrap", "JavaScript"],
    duration: "Jan 2025 – March 2025",
    image:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/Screenshot%202025-09-25%20150607.png",
    github: "https://github.com/Shubham-Goswami-Github/unstop-clone",
    demo: "#",
    readme:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/unstop-clone/main/README.md",
  },

  {
    title: "Portfolio Website",
    description:
      "A responsive and animated personal portfolio designed with React, Tailwind CSS, and Framer Motion to showcase projects and skills.",
    learnings:
      "Learned advanced component-based design, optimized animations for performance, and implemented dark/light theme switching.",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    duration: "Sept 2024 – Oct 2024",
    image:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/portfolioproject.png",
    github: "https://github.com/Shubham-Goswami-Github/my-portfolio",
    demo: "#",
    readme:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/my-portfolio/main/README.md",
  },
];

const Projects = (props) => {
  const lenisRef = useContext(LenisContext);
  useEffect(() => {
    if (lenisRef && lenisRef.current) {
      lenisRef.current.scrollTo(window.scrollY, { immediate: true });
    }
  }, [lenisRef]);

  return (
    <section
      id="projects"
      className="relative flex flex-col items-center px-6 py-20 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-700 overflow-hidden"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      {/* Animated Planets & Stars Background - covers full section */}
      <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
        <AnimatedPlanetStarBackground />
      </div>

      {/* Section Title */}
      <motion.h2
        className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text 
                   bg-gradient-to-r from-[#e16928ff] to-yellow-400 mb-16 tracking-wide z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        🚀 My Projects
      </motion.h2>

      {/* Projects List */}
      <div className="flex flex-col space-y-16 w-full max-w-6xl z-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="relative flex flex-col md:flex-row items-center gap-10 
                       bg-white/15 dark:bg-black/15 backdrop-blur-xl rounded-3xl shadow-xl 
                       border border-gray-200 dark:border-gray-700 p-8 overflow-hidden
                       hover:border-yellow-300 transition-all duration-700 group"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: index * 0.15, ease: "easeInOut" }}
            viewport={{ once: false }}
            whileHover={{
              scale: 1.015,
              boxShadow: "0 0 25px 6px rgba(225, 105, 40, 0.25)",
            }}
          >
            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-70 bg-gradient-to-r from-[#e16928ff]/25 to-yellow-400/25 blur-2xl transition-all duration-700"></div>

            {/* Left: Project Image */}
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full md:w-1/2 h-64 object-cover rounded-2xl z-10 relative shadow-md hover:scale-105 transition-transform duration-1000 ease-in-out"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              viewport={{ once: false }}
            />

            {/* Right: Project Details */}
            <motion.div
              className="flex-1 z-10 relative space-y-4"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              viewport={{ once: false }}
            >
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e16928ff] to-yellow-400">
                {project.title}
              </h3>

              <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
                {project.description}
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-[#e16928ff] dark:text-yellow-400">
                  Duration:
                </strong>{" "}
                {project.duration}
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-[#e16928ff] dark:text-yellow-400">
                  Learnings:
                </strong>{" "}
                {project.learnings}
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-[#e16928ff] dark:text-yellow-400">
                  Technologies Used:
                </strong>{" "}
                {project.technologies.join(", ")}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-6">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold
                             bg-gray-200 dark:bg-gray-700 hover:bg-[#e16928ff]/80 dark:hover:bg-yellow-400/80
                             text-gray-900 dark:text-white hover:text-white transition-all duration-500 shadow-md"
                >
                  <FaGithub size={18} /> GitHub
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold
                             bg-gray-200 dark:bg-gray-700 hover:bg-blue-500/80 dark:hover:bg-yellow-400/80
                             text-gray-900 dark:text-white hover:text-white transition-all duration-500 shadow-md"
                >
                  <FaExternalLinkAlt size={16} /> Live Demo
                </a>
                <a
                  href={project.readme}
                  download
                  className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold
                             bg-gray-200 dark:bg-gray-700 hover:bg-green-500/80 dark:hover:bg-yellow-400/80
                             text-gray-900 dark:text-white hover:text-white transition-all duration-500 shadow-md"
                >
                  <FaFileDownload size={16} /> README
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
