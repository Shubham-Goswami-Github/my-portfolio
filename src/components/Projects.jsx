import { motion, useReducedMotion } from "framer-motion";
import AnimatedPlanetStarBackground from "./AnimatedPlanetStarBackground";
import { useContext, useEffect, useState, memo, useMemo, useCallback } from "react";
import { LenisContext } from "../LenisProvider";
import { 
  Sparkles, 
  Code2, 
  ExternalLink,
  Github,
  Calendar,
  Lightbulb,
  Layers,
  Rocket,
  Eye,
  FolderOpen,
  ChevronRight,
  Star,
  Zap,
  BookOpen
} from "lucide-react";
import { 
  FaGithub, 
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
import { Terminal } from "lucide-react";

/* -------------------- OPTIMIZED CSS STYLES -------------------- */
const projectsOptimizedStyles = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap');

@keyframes shimmer-projects {
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.15; transform: scale(1); }
  50% { opacity: 0.25; transform: scale(1.03); }
}

@keyframes ping-slow {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes gradient-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.gpu-layer {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
}

.shimmer-text-projects {
  background-image: linear-gradient(90deg, #e16928, #fbbf24, #f59e0b, #e16928);
  background-size: 200% 100%;
  animation: shimmer-projects 4s infinite linear;
  -webkit-background-clip: text;
  background-clip: text;
}

/* Project Card Hover Effects - Pure CSS */
.project-card {
  transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(225, 105, 40, 0.15);
  border-color: rgba(225, 105, 40, 0.3);
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-card:hover .project-overlay-content {
  transform: translateY(0);
  opacity: 1;
}

.project-card:hover .progress-line {
  width: 100%;
}

.project-card:hover .gradient-border {
  opacity: 1;
}

/* Image transitions */
.project-image {
  transition: transform 0.5s ease;
}

/* Overlay transitions */
.project-overlay {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-overlay-content {
  transform: translateY(20px);
  opacity: 0;
  transition: transform 0.3s ease 0.1s, opacity 0.3s ease 0.1s;
}

/* Category Button */
.category-btn {
  transition: all 0.2s ease;
}

.category-btn:hover {
  transform: scale(1.05) translateY(-2px);
}

.category-btn:active {
  transform: scale(0.98);
}

/* Action Button */
.action-btn {
  transition: all 0.2s ease;
}

.action-btn:hover {
  transform: scale(1.05) translateY(-2px);
}

.action-btn:active {
  transform: scale(0.98);
}

/* Stats Card */
.stats-card {
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.stats-card:hover {
  transform: scale(1.05) translateY(-5px);
  border-color: rgba(225, 105, 40, 0.3);
}

/* Tech Tag */
.tech-tag {
  transition: all 0.2s ease;
}

.tech-tag:hover {
  transform: scale(1.05) translateY(-2px);
  border-color: rgba(225, 105, 40, 0.4);
  background-color: rgba(225, 105, 40, 0.1);
}

/* Gradient border animation */
.gradient-border-animated {
  background: linear-gradient(135deg, #e16928, #fbbf24, #f59e0b, #e16928);
  background-size: 300% 300%;
  animation: gradient-flow 4s ease infinite;
  opacity: 0;
  transition: opacity 0.5s ease;
}

/* Progress line */
.progress-line {
  transition: width 0.7s ease;
}
`;

// Inject styles once
if (typeof document !== 'undefined' && !document.getElementById('projects-optimized-styles')) {
  const styleSheet = document.createElement("style");
  styleSheet.id = 'projects-optimized-styles';
  styleSheet.innerHTML = projectsOptimizedStyles;
  document.head.appendChild(styleSheet);
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

/* -------------------- SIMPLIFIED FLOATING BACKGROUND (CSS Only) -------------------- */
const FloatingBackground = memo(() => (
  <>
    <div 
      className="absolute w-80 h-80 rounded-full top-20 -left-40 gpu-layer"
      style={{
        background: "linear-gradient(to right, rgba(225, 105, 40, 0.12), rgba(251, 191, 36, 0.12))",
        filter: "blur(50px)",
        animation: "pulse-slow 10s ease-in-out infinite",
      }}
    />
    <div 
      className="absolute w-72 h-72 rounded-full bottom-20 -right-36 gpu-layer"
      style={{
        background: "linear-gradient(to right, rgba(168, 85, 247, 0.08), rgba(236, 72, 153, 0.08))",
        filter: "blur(50px)",
        animation: "pulse-slow 12s ease-in-out infinite 3s",
      }}
    />
    <div 
      className="absolute w-56 h-56 rounded-full top-1/3 right-1/4 gpu-layer"
      style={{
        background: "linear-gradient(to right, rgba(56, 189, 248, 0.1), rgba(59, 130, 246, 0.1))",
        filter: "blur(40px)",
        animation: "pulse-slow 8s ease-in-out infinite 2s",
      }}
    />
  </>
));

/* -------------------- SECTION BADGE (Simplified) -------------------- */
const SectionBadge = memo(({ text, icon: Icon }) => (
  <div
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
               bg-[#e16928]/10 border border-[#e16928]/30 
               text-[#e16928] dark:text-orange-400"
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    <span className="relative flex h-2.5 w-2.5">
      <span 
        className="absolute inline-flex h-full w-full rounded-full bg-[#e16928] opacity-75"
        style={{ animation: "ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" }}
      />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#e16928]" />
    </span>
    {Icon && <Icon className="w-4 h-4" />}
    <span className="text-sm font-medium">{text}</span>
  </div>
));

/* -------------------- CATEGORY FILTER BUTTON (CSS-based) -------------------- */
const CategoryButton = memo(({ category, isActive, onClick }) => {
  const Icon = category.icon;
  
  return (
    <button
      onClick={onClick}
      className={`
        category-btn flex items-center gap-2 px-4 py-2.5 rounded-xl
        font-medium text-sm
        ${isActive 
          ? 'bg-gradient-to-r from-[#e16928] to-yellow-500 text-white shadow-lg shadow-[#e16928]/25' 
          : 'bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#e16928]/40'
        }
      `}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#e16928]'}`} />
      <span className="hidden sm:inline">{category.name}</span>
    </button>
  );
});

/* -------------------- STATUS BADGE (Simple) -------------------- */
const StatusBadge = memo(({ status }) => {
  const isInProgress = status === "In Progress";
  
  return (
    <span className={`
      inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
      ${isInProgress 
        ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30' 
        : 'bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30'
      }
    `}>
      <span className={`w-1.5 h-1.5 rounded-full ${isInProgress ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ animation: isInProgress ? 'pulse-slow 2s ease-in-out infinite' : 'none' }} />
      {status}
    </span>
  );
});

/* -------------------- TECH TAG (Simplified) -------------------- */
const TechTag = memo(({ tech }) => {
  const techInfo = techIcons[tech] || { icon: FaCode, color: "text-gray-400" };
  const Icon = techInfo.icon;
  
  return (
    <span
      className="tech-tag inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                 bg-white/50 dark:bg-white/5 backdrop-blur-sm
                 border border-white/40 dark:border-white/10
                 text-xs font-medium text-gray-700 dark:text-gray-300"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Icon className={`w-3.5 h-3.5 ${techInfo.color}`} />
      {tech}
    </span>
  );
});

/* -------------------- ACTION BUTTON (CSS-based) -------------------- */
const ActionButton = memo(({ href, icon: Icon, label, variant = "default" }) => {
  const variants = {
    default: "bg-white/60 dark:bg-white/5 border-white/40 dark:border-white/10 hover:border-[#e16928]/50 hover:bg-[#e16928]/10 text-gray-700 dark:text-gray-300",
    primary: "bg-gradient-to-r from-[#e16928] to-yellow-500 border-transparent text-white shadow-lg shadow-[#e16928]/20",
    github: "bg-gray-900 dark:bg-white/10 border-gray-700 dark:border-white/20 text-white hover:bg-gray-800",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        action-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
        font-semibold text-sm backdrop-blur-sm border
        ${variants[variant]}
      `}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </a>
  );
});

/* -------------------- STATS CARD (CSS-based) -------------------- */
const StatsCard = memo(({ icon: Icon, value, label, color }) => (
  <div
    className="stats-card flex flex-col items-center p-4 sm:p-6 rounded-2xl
               bg-white/60 dark:bg-white/5 backdrop-blur-sm
               border border-white/40 dark:border-white/10 gpu-layer"
  >
    <Icon className={`w-8 h-8 mb-2 ${color}`} />
    <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white
                    font-['Montserrat',sans-serif]">
      {value}
    </span>
    <span className="text-sm text-gray-500 dark:text-gray-400 font-['Inter',sans-serif]">
      {label}
    </span>
  </div>
));

/* -------------------- PROJECT CARD (Optimized with CSS) -------------------- */
const ProjectCard = memo(({ project, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <article
      className="project-card group relative w-full gpu-layer
                 bg-white/70 dark:bg-white/[0.03] backdrop-blur-lg
                 rounded-3xl overflow-hidden
                 border border-white/40 dark:border-white/10
                 shadow-lg dark:shadow-xl"
    >
      {/* Gradient border - CSS transition */}
      <div
        className="gradient-border gradient-border-animated absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          padding: "2px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Background glow - CSS transition */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                      bg-gradient-to-r from-[#e16928]/5 via-transparent to-yellow-400/5 
                      transition-opacity duration-500 pointer-events-none" />

      {/* Featured badge */}
      {project.featured && (
        <div
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 
                     px-3 py-1.5 rounded-full
                     bg-gradient-to-r from-[#e16928] to-yellow-500
                     text-white text-xs font-bold shadow-lg"
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          Featured
        </div>
      )}

      {/* Content Layout */}
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0`}>
        
        {/* Image Section */}
        <div className="relative lg:w-1/2 h-64 sm:h-72 lg:h-auto lg:min-h-[400px] overflow-hidden">
          {/* Image skeleton loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 
                           dark:from-gray-800 dark:to-gray-700 animate-pulse" />
          )}
          
          <img
            src={project.image}
            alt={project.title}
            className="project-image w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
            decoding="async"
          />
          
          {/* Image overlay gradient */}
          <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} 
                          from-transparent via-transparent to-white/80 dark:to-black/80
                          opacity-0 lg:opacity-100 pointer-events-none`} />
          
          {/* Hover overlay - CSS only, no AnimatePresence */}
          <div className="project-overlay absolute inset-0 flex items-center justify-center
                         bg-black/50 backdrop-blur-sm">
            <div className="project-overlay-content flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/20 backdrop-blur-md
                         hover:bg-[#e16928] transition-colors duration-200"
              >
                <FaGithub className="w-6 h-6 text-white" />
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/20 backdrop-blur-md
                         hover:bg-[#e16928] transition-colors duration-200"
              >
                <ExternalLink className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          {/* Status Badge */}
          <div className="mb-4">
            <StatusBadge status={project.status} />
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4
                         font-['Montserrat',sans-serif]">
            <span className="shimmer-text-projects text-transparent bg-clip-text">
              {project.title}
            </span>
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg 
                       leading-relaxed mb-6 font-['Inter',sans-serif]">
            {project.description}
          </p>

          {/* Duration */}
          <div className="flex items-center gap-2 mb-4 text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 text-[#e16928]" />
            <span className="text-sm font-medium font-['Inter',sans-serif]">
              {project.duration}
            </span>
          </div>

          {/* Learnings */}
          <div className="mb-6 p-4 rounded-2xl bg-[#e16928]/5 dark:bg-[#e16928]/10
                         border border-[#e16928]/20">
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
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-[#e16928]" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300
                             font-['Poppins',sans-serif]">
                Tech Stack
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <TechTag key={tech} tech={tech} />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
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
          </div>
        </div>
      </div>

      {/* Bottom progress line - CSS transition */}
      <span className="progress-line absolute bottom-0 left-0 h-1 w-0 
                      bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400" />
    </article>
  );
});

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

  // Memoize filtered projects
  const filteredProjects = useMemo(() => {
    return activeCategory === "all" 
      ? projects 
      : projects.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  // Memoize category change handler
  const handleCategoryChange = useCallback((categoryId) => {
    setActiveCategory(categoryId);
  }, []);

  // Stats data
  const stats = useMemo(() => [
    { icon: FolderOpen, value: "5+", label: "Projects", color: "text-[#e16928]" },
    { icon: Code2, value: "10+", label: "Technologies", color: "text-blue-500" },
    { icon: Zap, value: "1000+", label: "Hours Coded", color: "text-yellow-500" },
    { icon: Rocket, value: "100%", label: "Passion", color: "text-green-500" },
  ], []);

  // Simple fade animation
  const fadeInUp = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.4 }
  }), []);

  return (
    <section
      id="projects"
      className="relative min-h-screen flex flex-col justify-center items-center 
                 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24
                 bg-gradient-to-br from-white via-gray-50 to-orange-50/30 
                 dark:from-gray-950 dark:via-black dark:to-gray-900
                 overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <AnimatedPlanetStarBackground />
      </div>

      {/* Simplified floating elements - CSS only */}
      {!shouldReduceMotion && <FloatingBackground />}

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          {...fadeInUp}
        >
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <SectionBadge text="Featured Work" icon={Rocket} />
          </div>

          {/* Title */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold 
                       tracking-tight mb-4 font-['Montserrat',sans-serif]"
          >
            <span className="shimmer-text-projects text-transparent bg-clip-text">
              My Projects
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 
                       max-w-3xl mx-auto leading-relaxed font-['Inter',sans-serif]"
          >
            A collection of projects that showcase my passion for building 
            innovative solutions and learning new technologies.
          </p>

          {/* Decorative underline */}
          <div className="mt-6 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400" />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16"
          {...fadeInUp}
        >
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-14"
          {...fadeInUp}
        >
          {projectCategories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => handleCategoryChange(category.id)}
            />
          ))}
        </motion.div>

        {/* Projects List - Simple fade, no layout animation */}
        <div className="flex flex-col space-y-8 sm:space-y-12">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.1, 0.3) }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2
                          font-['Poppins',sans-serif]">
              No projects found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 font-['Inter',sans-serif]">
              Try selecting a different category
            </p>
          </div>
        )}

        {/* Bottom CTA Section */}
        <motion.div
          className="mt-16 sm:mt-20 text-center"
          {...fadeInUp}
        >
          {/* More Projects Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6
                       bg-blue-500/10 border border-blue-500/30 
                       text-blue-600 dark:text-blue-400"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm font-medium font-['Inter',sans-serif]">
              More Projects on GitHub
            </span>
          </div>

          {/* CTA Button */}
          <div>
            <a
              href="https://github.com/Shubham-Goswami-Github"
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn inline-flex items-center gap-3 px-8 py-4 rounded-2xl
                        bg-gradient-to-r from-[#e16928] to-yellow-500
                        text-white font-bold text-lg
                        shadow-lg shadow-[#e16928]/25
                        hover:shadow-xl hover:shadow-[#e16928]/35
                        font-['Poppins',sans-serif]"
            >
              <FaGithub className="w-6 h-6" />
              <span>View All Projects</span>
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#e16928]" />
            <Sparkles className="w-6 h-6 text-[#e16928] animate-pulse" />
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-yellow-400" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;