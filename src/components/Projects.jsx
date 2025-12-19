import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import AnimatedPlanetStarBackground from "./AnimatedPlanetStarBackground";
import { useContext, useEffect, useState } from "react";
import { LenisContext } from "../LenisProvider";
import { 
  Sparkles, 
  Code2, 
  ExternalLink,
  Github,
  FileText,
  Calendar,
  Lightbulb,
  Layers,
  Rocket,
  Eye,
  FolderOpen,
  ChevronRight,
  Star,
  Zap,
  ArrowUpRight,
  BookOpen,
  Clock,
  Terminal
} from "lucide-react";
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaFileDownload,
  FaReact,
  FaNodeJs,
  FaPhp,
  FaJava,
  FaCode
} from "react-icons/fa";
import { 
  SiMongodb, 
  SiTailwindcss,
  SiDjango,
  SiMysql,
  SiFramer,
  SiSqlite,
  SiBootstrap,
  SiJavascript,
  SiHtml5,
  SiCss3
} from "react-icons/si";

/* -------------------- SHIMMER STYLES -------------------- */
const projectsShimmerStyle = document.createElement("style");
projectsShimmerStyle.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800;900&display=swap');

@keyframes shimmer-projects {
  0% { background-position: 0% 0%; }
  50% { background-position: 150% 0%; }
  100% { background-position: 0% 0%; }
}

@keyframes float-project {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(2deg); }
}

@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 0; }
  50% { opacity: 0.5; }
  100% { transform: scale(1.3); opacity: 0; }
}

@keyframes gradient-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes card-shine {
  0% { left: -100%; }
  50%, 100% { left: 100%; }
}

.shimmer-text-projects {
  background-image: linear-gradient(90deg, #e16928, #fbbf24, #f59e0b, #e16928);
  background-size: 300% 100%;
  animation: shimmer-projects 6s infinite linear;
  -webkit-background-clip: text;
  background-clip: text;
}

.project-card-shine::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: 0.7s;
  pointer-events: none;
}

.project-card-shine:hover::before {
  left: 100%;
}

.gradient-border {
  background: linear-gradient(135deg, #e16928, #fbbf24, #f59e0b, #e16928);
  background-size: 300% 300%;
  animation: gradient-flow 4s ease infinite;
}

.image-shine::after {
  content: '';
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transform: skewX(-25deg);
  transition: 0.75s;
}

.image-shine:hover::after {
  left: 125%;
}
`;
if (!document.querySelector('#projects-shimmer-style')) {
  projectsShimmerStyle.id = 'projects-shimmer-style';
  document.head.appendChild(projectsShimmerStyle);
}

/* -------------------- TECH ICONS MAP -------------------- */
const techIcons = {
  "React": { icon: FaReact, color: "text-cyan-400" },
  "Node.js": { icon: FaNodeJs, color: "text-green-500" },
  "MongoDB": { icon: SiMongodb, color: "text-green-600" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "text-teal-400" },
  "PHP": { icon: FaPhp, color: "text-indigo-400" },
  "MySQL": { icon: SiMysql, color: "text-blue-500" },
  "HTML": { icon: SiHtml5, color: "text-orange-500" },
  "CSS": { icon: SiCss3, color: "text-blue-400" },
  "JavaScript": { icon: SiJavascript, color: "text-yellow-400" },
  "Java": { icon: FaJava, color: "text-red-500" },
  "XML": { icon: FaCode, color: "text-orange-400" },
  "Android Studio": { icon: Terminal, color: "text-green-400" },
  "SQLite": { icon: SiSqlite, color: "text-blue-300" },
  "Django": { icon: SiDjango, color: "text-emerald-600" },
  "Bootstrap": { icon: SiBootstrap, color: "text-purple-500" },
  "Framer Motion": { icon: SiFramer, color: "text-pink-500" },
};

/* -------------------- PROJECT CATEGORIES -------------------- */
const projectCategories = [
  { id: "all", name: "All Projects", icon: Layers },
  { id: "fullstack", name: "Full Stack", icon: Code2 },
  { id: "frontend", name: "Frontend", icon: Eye },
  { id: "mobile", name: "Mobile", icon: Rocket },
];

/* -------------------- PROJECTS DATA -------------------- */
const projects = [
  {
    title: "Universal Ecommerce Site",
    description:
      "A fully responsive, modern ecommerce platform supporting product browsing, cart system, authentication, and secure order handling. Built with a MERN stack architecture and optimized for performance.",
    learnings:
      "Gained hands-on experience with full-stack architecture, JWT authentication, REST API development, and efficient state management in React.",
    technologies: ["Node.js", "React", "Tailwind CSS", "MongoDB"],
    duration: "Nov 2025 – Under Development",
    category: "fullstack",
    status: "In Progress",
    featured: true,
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
    category: "fullstack",
    status: "Completed",
    featured: false,
    image:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/Screenshot%202025-09-25%20145931.png",
    github: "https://github.com/Shubham-Goswami-Github/evoting-php",
    demo: "#",
    readme:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/evoting-php/main/README.md",
  },
  {
    title: "Daily Expense Tracker",
    description:
      "An Android application that helps users track and analyze their daily spending. Built with Java and XML using Android Studio.",
    learnings:
      "Learned database integration with SQLite, efficient UI design with RecyclerView, and improved knowledge of Android activity lifecycle.",
    technologies: ["Java", "XML", "Android Studio", "SQLite"],
    duration: "Feb 2025 – April 2025",
    category: "mobile",
    status: "Completed",
    featured: false,
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
    category: "fullstack",
    status: "Completed",
    featured: false,
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
    category: "frontend",
    status: "Completed",
    featured: true,
    image:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/portfolioproject.png",
    github: "https://github.com/Shubham-Goswami-Github/my-portfolio",
    demo: "#",
    readme:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/my-portfolio/main/README.md",
  },
];

/* -------------------- FLOATING DECORATIVE ELEMENTS -------------------- */
const FloatingElement = ({ delay, duration, className }) => (
  <motion.div
    className={`absolute rounded-full pointer-events-none ${className}`}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: duration || 8,
      repeat: Infinity,
      delay: delay || 0,
      ease: "easeInOut",
    }}
  />
);

/* -------------------- SECTION BADGE -------------------- */
const SectionBadge = ({ text, icon: Icon }) => (
  <motion.div
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
               bg-[#e16928]/10 border border-[#e16928]/30 
               text-[#e16928] dark:text-orange-400"
    initial={{ opacity: 0, scale: 0.8, y: -20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e16928] opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#e16928]"></span>
    </span>
    {Icon && <Icon className="w-4 h-4" />}
    <span className="text-sm font-medium">{text}</span>
  </motion.div>
);

/* -------------------- CATEGORY FILTER BUTTON -------------------- */
const CategoryButton = ({ category, isActive, onClick, index }) => {
  const Icon = category.icon;
  
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative flex items-center gap-2 px-4 py-2.5 rounded-xl
        font-medium text-sm transition-all duration-300
        ${isActive 
          ? 'bg-gradient-to-r from-[#e16928] to-yellow-500 text-white shadow-lg shadow-[#e16928]/30' 
          : 'bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#e16928]/40'
        }
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#e16928]'}`} />
      <span className="hidden sm:inline">{category.name}</span>
    </motion.button>
  );
};

/* -------------------- STATUS BADGE -------------------- */
const StatusBadge = ({ status }) => {
  const isInProgress = status === "In Progress";
  
  return (
    <span className={`
      inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
      ${isInProgress 
        ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30' 
        : 'bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30'
      }
    `}>
      <span className={`w-1.5 h-1.5 rounded-full ${isInProgress ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
      {status}
    </span>
  );
};

/* -------------------- TECH TAG -------------------- */
const TechTag = ({ tech, index }) => {
  const techInfo = techIcons[tech] || { icon: FaCode, color: "text-gray-400" };
  const Icon = techInfo.icon;
  
  return (
    <motion.span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                 bg-white/50 dark:bg-white/5 backdrop-blur-sm
                 border border-white/40 dark:border-white/10
                 text-xs font-medium text-gray-700 dark:text-gray-300
                 hover:border-[#e16928]/40 hover:bg-[#e16928]/10
                 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.05, y: -2 }}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Icon className={`w-3.5 h-3.5 ${techInfo.color}`} />
      {tech}
    </motion.span>
  );
};

/* -------------------- ACTION BUTTON -------------------- */
const ActionButton = ({ href, icon: Icon, label, variant = "default" }) => {
  const variants = {
    default: "bg-white/60 dark:bg-white/5 border-white/40 dark:border-white/10 hover:border-[#e16928]/50 hover:bg-[#e16928]/10",
    primary: "bg-gradient-to-r from-[#e16928] to-yellow-500 border-transparent text-white shadow-lg shadow-[#e16928]/25",
    github: "bg-gray-900 dark:bg-white/10 border-gray-700 dark:border-white/20 text-white hover:bg-gray-800",
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
        font-semibold text-sm backdrop-blur-sm border
        transition-all duration-300 ${variants[variant]}
        ${variant === 'default' ? 'text-gray-700 dark:text-gray-300' : ''}
      `}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
      {variant === 'primary' && <ArrowUpRight className="w-4 h-4" />}
    </motion.a>
  );
};

/* -------------------- PROJECT CARD -------------------- */
const ProjectCard = ({ project, index }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const delay = index * 0.15;
  const isEven = index % 2 === 0;

  return (
    <motion.article
      className={`
        group relative w-full
        bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl
        rounded-3xl overflow-hidden
        border border-white/40 dark:border-white/10
        shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        transition-all duration-700 ease-out
        hover:shadow-[0_25px_60px_rgba(225,105,40,0.15)] 
        dark:hover:shadow-[0_25px_60px_rgba(225,105,40,0.25)]
        hover:border-[#e16928]/30
        project-card-shine
      `}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        delay: delay, 
        duration: 0.7, 
        type: "spring",
        stiffness: 80
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
                   transition-opacity duration-700 pointer-events-none gradient-border"
        style={{
          padding: "2px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Background glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                      bg-gradient-to-r from-[#e16928]/10 via-transparent to-yellow-400/10 
                      transition-opacity duration-700 pointer-events-none" />

      {/* Featured badge */}
      {project.featured && (
        <motion.div
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 
                     px-3 py-1.5 rounded-full
                     bg-gradient-to-r from-[#e16928] to-yellow-500
                     text-white text-xs font-bold shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3, duration: 0.4 }}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          Featured
        </motion.div>
      )}

      {/* Content Layout */}
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0`}>
        
        {/* Image Section */}
        <motion.div 
          className="relative lg:w-1/2 h-64 sm:h-72 lg:h-auto lg:min-h-[400px] overflow-hidden image-shine"
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 0.6 }}
        >
          {/* Image skeleton loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 
                           dark:from-gray-800 dark:to-gray-700 animate-pulse" />
          )}
          
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700
                       group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Image overlay gradient */}
          <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} 
                          from-transparent via-transparent to-white/80 dark:to-black/80
                          opacity-0 lg:opacity-100 pointer-events-none`} />
          
          {/* Floating overlay on hover */}
          <AnimatePresence>
            {isHovered && !shouldReduceMotion && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center
                           bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="flex gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/20 backdrop-blur-md
                             hover:bg-[#e16928] transition-colors duration-300"
                  >
                    <FaGithub className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/20 backdrop-blur-md
                             hover:bg-[#e16928] transition-colors duration-300"
                  >
                    <ExternalLink className="w-6 h-6 text-white" />
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Content Section */}
        <motion.div 
          className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center"
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3, duration: 0.6 }}
        >
          {/* Status Badge */}
          <div className="mb-4">
            <StatusBadge status={project.status} />
          </div>

          {/* Title */}
          <motion.h3
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4
                       font-['Montserrat',sans-serif]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.4, duration: 0.5 }}
          >
            <span className="shimmer-text-projects text-transparent bg-clip-text">
              {project.title}
            </span>
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-gray-600 dark:text-gray-300 text-base sm:text-lg 
                       leading-relaxed mb-6 font-['Inter',sans-serif]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.45, duration: 0.5 }}
          >
            {project.description}
          </motion.p>

          {/* Duration */}
          <motion.div
            className="flex items-center gap-2 mb-4 text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.5, duration: 0.4 }}
          >
            <Calendar className="w-4 h-4 text-[#e16928]" />
            <span className="text-sm font-medium font-['Inter',sans-serif]">
              {project.duration}
            </span>
          </motion.div>

          {/* Learnings */}
          <motion.div
            className="mb-6 p-4 rounded-2xl bg-[#e16928]/5 dark:bg-[#e16928]/10
                       border border-[#e16928]/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.55, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-[#e16928]" />
              <span className="text-sm font-semibold text-[#e16928] dark:text-orange-400
                             font-['Poppins',sans-serif]">
                Key Learnings
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed
                         font-['Inter',sans-serif]">
              {project.learnings}
            </p>
          </motion.div>

          {/* Technologies */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.6, duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-[#e16928]" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300
                             font-['Poppins',sans-serif]">
                Tech Stack
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <TechTag key={tech} tech={tech} index={idx} />
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.65, duration: 0.5 }}
          >
            <ActionButton 
              href={project.github} 
              icon={FaGithub} 
              label="GitHub" 
              variant="github"
            />
            <ActionButton 
              href={project.demo} 
              icon={ExternalLink} 
              label="Live Demo" 
              variant="primary"
            />
            <ActionButton 
              href={project.readme} 
              icon={BookOpen} 
              label="README" 
              variant="default"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom progress line */}
      <span className="absolute bottom-0 left-0 h-1 w-0 
                      group-hover:w-full transition-[width] duration-1000 
                      bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400" />
    </motion.article>
  );
};

/* -------------------- STATS CARD -------------------- */
const StatsCard = ({ icon: Icon, value, label, color, delay }) => (
  <motion.div
    className="flex flex-col items-center p-4 sm:p-6 rounded-2xl
               bg-white/60 dark:bg-white/5 backdrop-blur-sm
               border border-white/40 dark:border-white/10
               hover:border-[#e16928]/30 transition-all duration-300"
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5, type: "spring" }}
    whileHover={{ scale: 1.05, y: -5 }}
  >
    <Icon className={`w-8 h-8 mb-2 ${color}`} />
    <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white
                    font-['Montserrat',sans-serif]">
      {value}
    </span>
    <span className="text-sm text-gray-500 dark:text-gray-400 font-['Inter',sans-serif]">
      {label}
    </span>
  </motion.div>
);

/* -------------------- MAIN PROJECTS SECTION -------------------- */
const Projects = () => {
  const lenisRef = useContext(LenisContext);
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(window.scrollY, { immediate: true });
    }
  }, [lenisRef]);

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const stats = [
    { icon: FolderOpen, value: "5+", label: "Projects", color: "text-[#e16928]" },
    { icon: Code2, value: "10+", label: "Technologies", color: "text-blue-500" },
    { icon: Zap, value: "1000+", label: "Hours Coded", color: "text-yellow-500" },
    { icon: Rocket, value: "100%", label: "Passion", color: "text-green-500" },
  ];

  return (
    <section
      id="projects"
      className="relative min-h-screen flex flex-col justify-center items-center 
                 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24
                 bg-gradient-to-br from-white via-gray-50 to-orange-50/30 
                 dark:from-gray-950 dark:via-black dark:to-gray-900
                 transition-colors duration-700 overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <AnimatedPlanetStarBackground />
      </div>

      {/* Decorative floating elements */}
      {!shouldReduceMotion && (
        <>
          <FloatingElement 
            delay={0} 
            duration={12} 
            className="w-80 h-80 bg-gradient-to-r from-[#e16928]/20 to-yellow-400/20 blur-3xl top-20 -left-40" 
          />
          <FloatingElement 
            delay={3} 
            duration={14} 
            className="w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-3xl bottom-20 -right-48" 
          />
          <FloatingElement 
            delay={2} 
            duration={10} 
            className="w-64 h-64 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 blur-3xl top-1/3 right-1/4" 
          />
          <FloatingElement 
            delay={5} 
            duration={16} 
            className="w-48 h-48 bg-gradient-to-r from-green-400/20 to-teal-400/20 blur-3xl bottom-1/3 left-1/4" 
          />
        </>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.div className="flex justify-center mb-4">
            <SectionBadge text="Featured Work" icon={Rocket} />
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold 
                       tracking-tight mb-4 font-['Montserrat',sans-serif]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="shimmer-text-projects text-transparent bg-clip-text">
              My Projects
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 
                       max-w-3xl mx-auto leading-relaxed font-['Inter',sans-serif]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            A collection of projects that showcase my passion for building 
            innovative solutions and learning new technologies.
          </motion.p>

          {/* Decorative underline */}
          <motion.div
            className="mt-6 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {stats.map((stat, index) => (
            <StatsCard key={stat.label} {...stat} delay={0.1 * index} />
          ))}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {projectCategories.map((category, index) => (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
              index={index}
            />
          ))}
        </motion.div>

        {/* Projects List */}
        <motion.div
          className="flex flex-col space-y-8 sm:space-y-12"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2
                          font-['Poppins',sans-serif]">
              No projects found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 font-['Inter',sans-serif]">
              Try selecting a different category
            </p>
          </motion.div>
        )}

        {/* Bottom CTA Section */}
        <motion.div
          className="mt-16 sm:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* More Projects Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6
                       bg-blue-500/10 border border-blue-500/30 
                       text-blue-600 dark:text-blue-400"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
          >
            <Github className="w-4 h-4" />
            <span className="text-sm font-medium font-['Inter',sans-serif]">
              More Projects on GitHub
            </span>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.a
              href="https://github.com/Shubham-Goswami-Github"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl
                        bg-gradient-to-r from-[#e16928] to-yellow-500
                        text-white font-bold text-lg
                        shadow-lg shadow-[#e16928]/30
                        hover:shadow-xl hover:shadow-[#e16928]/40
                        transition-all duration-300
                        font-['Poppins',sans-serif]"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaGithub className="w-6 h-6" />
              <span>View All Projects</span>
              <ChevronRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          className="flex justify-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#e16928]" />
            <Sparkles className="w-6 h-6 text-[#e16928] animate-pulse" />
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-yellow-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;