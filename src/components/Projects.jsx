import { motion,  AnimatePresence } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { LenisContext } from "../LenisProvider";
import { 
 
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
  BookOpen,
  Terminal,
  ArrowUpRight
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

/* -------------------- INJECT PREMIUM STYLES -------------------- */
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('projects-premium-styles');
  if (!existingStyle) {
    const style = document.createElement("style");
    style.id = 'projects-premium-styles';
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
      
      :root {
        --projects-gold: #C9A86C;
        --projects-gold-light: #E8D5B5;
        --projects-gold-dark: #A68B4B;
      }
      
      .projects-bg-pure-black {
        background-color: #000000;
      }
      
      .projects-text-gold {
        color: var(--projects-gold);
      }
      
      .projects-noise-texture {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        opacity: 0.015;
      }
      
      .projects-gold-gradient-text {
        background: linear-gradient(135deg, #D4AF37 0%, #C9A86C 30%, #E8D5B5 50%, #C9A86C 70%, #B8956A 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .projects-glow-line {
        background: linear-gradient(90deg, transparent, rgba(201, 168, 108, 0.5), transparent);
      }
      
      .projects-accent-dot {
        width: 6px;
        height: 6px;
        background: var(--projects-gold);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--projects-gold);
      }
      
      @keyframes projects-pulse-slow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      .projects-animate-pulse-slow {
        animation: projects-pulse-slow 3s ease-in-out infinite;
      }
      
      .projects-btn-gold {
        background: linear-gradient(135deg, #C9A86C 0%, #D4AF37 50%, #C9A86C 100%);
        box-shadow: 0 4px 20px rgba(201, 168, 108, 0.2);
      }
      
      .projects-btn-gold:hover {
        box-shadow: 0 6px 30px rgba(201, 168, 108, 0.3);
      }
      
      .projects-border-gold {
        border: 1px solid rgba(201, 168, 108, 0.3);
      }
      
      /* Project Card Styles */
      .project-card-premium {
        background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
        border: 1px solid rgba(255, 255, 255, 0.06);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .project-card-premium:hover {
        background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
        transform: translateY(-8px);
        box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.5);
      }
      
      .project-image-blend-left {
        mask-image: linear-gradient(to right, 
          black 0%,
          black 50%,
          rgba(0,0,0,0.7) 70%,
          rgba(0,0,0,0.3) 85%,
          transparent 100%
        );
        -webkit-mask-image: linear-gradient(to right, 
          black 0%,
          black 50%,
          rgba(0,0,0,0.7) 70%,
          rgba(0,0,0,0.3) 85%,
          transparent 100%
        );
      }
      
      .project-image-blend-right {
        mask-image: linear-gradient(to left, 
          black 0%,
          black 50%,
          rgba(0,0,0,0.7) 70%,
          rgba(0,0,0,0.3) 85%,
          transparent 100%
        );
        -webkit-mask-image: linear-gradient(to left, 
          black 0%,
          black 50%,
          rgba(0,0,0,0.7) 70%,
          rgba(0,0,0,0.3) 85%,
          transparent 100%
        );
      }
      
      .project-image-blend-bottom {
        mask-image: linear-gradient(to bottom, 
          black 0%,
          black 40%,
          rgba(0,0,0,0.6) 70%,
          transparent 100%
        );
        -webkit-mask-image: linear-gradient(to bottom, 
          black 0%,
          black 40%,
          rgba(0,0,0,0.6) 70%,
          transparent 100%
        );
      }
      
      .project-accent-line {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 0;
        border-radius: 0 0 16px 16px;
        transition: width 0.5s ease;
      }
      
      .project-card-premium:hover .project-accent-line {
        width: 100%;
      }
      
      .project-image-hover {
        transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .project-card-premium:hover .project-image-hover {
        transform: scale(1.08);
      }
      
      .category-btn-active {
        background: linear-gradient(135deg, #C9A86C 0%, #D4AF37 50%, #C9A86C 100%);
        box-shadow: 0 4px 20px rgba(201, 168, 108, 0.25);
      }
      
      .category-btn-inactive {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .category-btn-inactive:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(201, 168, 108, 0.3);
      }
      
      .tech-tag-premium {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        transition: all 0.3s ease;
      }
      
      .tech-tag-premium:hover {
        border-color: rgba(201, 168, 108, 0.4);
        background: rgba(201, 168, 108, 0.1);
      }
      
      .action-btn-premium {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .action-btn-premium:hover {
        transform: translateY(-3px);
      }
    `;
    document.head.appendChild(style);
  }
}

/* -------------------- TECH ICONS MAP -------------------- */
const techIcons = {
  "React": { icon: FaReact, color: "#61DAFB" },
  "Node.js": { icon: FaNodeJs, color: "#339933" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "PHP": { icon: FaPhp, color: "#777BB4" },
  "MySQL": { icon: SiMysql, color: "#4479A1" },
  "HTML": { icon: SiHtml5, color: "#E34F26" },
  "CSS": { icon: SiCss3, color: "#1572B6" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "Java": { icon: FaJava, color: "#007396" },
  "XML": { icon: FaCode, color: "#F59E0B" },
  "Android Studio": { icon: Terminal, color: "#3DDC84" },
  "SQLite": { icon: SiSqlite, color: "#003B57" },
  "Django": { icon: SiDjango, color: "#092E20" },
  "Bootstrap": { icon: SiBootstrap, color: "#7952B3" },
  "Framer Motion": { icon: SiFramer, color: "#0055FF" },
};

/* -------------------- PROJECT CATEGORIES -------------------- */
const projectCategories = [
  { id: "all", name: "All Projects", icon: Layers },
  { id: "fullstack", name: "Full Stack", icon: Code2 },
  { id: "frontend", name: "Frontend", icon: Eye },
  { id: "mobile", name: "Mobile", icon: Rocket },
];

/* -------------------- PROJECTS DATA WITH ACCENT COLORS -------------------- */
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
    accentColor: "#06B6D4", // Cyan
    accentGradient: "from-cyan-500 to-blue-600",
    image:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/ecomnew.png",
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
    accentColor: "#8B5CF6", // Purple
    accentGradient: "from-purple-500 to-pink-600",
    image:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/evotenew.png",
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
    accentColor: "#10B981", // Emerald
    accentGradient: "from-emerald-500 to-teal-600",
    image:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/ftnew.png",
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
    accentColor: "#F59E0B", // Amber
    accentGradient: "from-amber-500 to-orange-600",
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
    accentColor: "#C9A86C", // Gold
    accentGradient: "from-amber-500 to-yellow-600",
    image:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/portfolionew.png",
    github: "https://github.com/Shubham-Goswami-Github/my-portfolio",
    demo: "#",
    readme:
      "https://raw.githubusercontent.com/Shubham-Goswami-Github/my-portfolio/main/README.md",
  },
];

/* -------------------- SECTION BADGE -------------------- */
const SectionBadge = ({ text, icon: Icon }) => (
  <motion.div
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
               bg-[#C9A86C]/10 projects-border-gold"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1, duration: 0.4 }}
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    <span className="projects-accent-dot projects-animate-pulse-slow" />
    {Icon && <Icon className="w-4 h-4 projects-text-gold" />}
    <span className="text-xs sm:text-sm font-medium projects-text-gold tracking-wider uppercase">
      {text}
    </span>
  </motion.div>
);

/* -------------------- CATEGORY FILTER BUTTON -------------------- */
const CategoryButton = ({ category, isActive, onClick, index }) => {
  const Icon = category.icon;
  
  return (
    <motion.button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl
        font-medium text-xs sm:text-sm transition-all duration-300
        ${isActive 
          ? 'category-btn-active text-black' 
          : 'category-btn-inactive text-neutral-400 hover:text-white'
        }
      `}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 * index, duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'projects-text-gold'}`} />
      <span className="hidden sm:inline">{category.name}</span>
    </motion.button>
  );
};

/* -------------------- STATUS BADGE -------------------- */
const StatusBadge = ({ status }) => {
  const isInProgress = status === "In Progress";
  
  return (
    <span className={`
      inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
      ${isInProgress 
        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' 
        : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
      }
    `}>
      <span className={`w-1.5 h-1.5 rounded-full ${isInProgress ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
      {status}
    </span>
  );
};

/* -------------------- TECH TAG -------------------- */
const TechTag = ({ tech }) => {
  const techInfo = techIcons[tech] || { icon: FaCode, color: "#9CA3AF" };
  const Icon = techInfo.icon;
  
  return (
    <span
      className="tech-tag-premium inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                 text-xs font-medium text-neutral-300"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Icon className="w-3.5 h-3.5" style={{ color: techInfo.color }} />
      {tech}
    </span>
  );
};

/* -------------------- ACTION BUTTON -------------------- */
const ActionButton = ({ href, icon: Icon, label, variant = "default", accentColor }) => {
  const variants = {
    default: "bg-white/5 border-white/10 hover:border-[#C9A86C]/40 text-neutral-300 hover:text-white",
    primary: `border-transparent text-black shadow-lg`,
    github: "bg-white/5 border-white/10 text-white hover:bg-white/10",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        action-btn-premium inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
        font-medium text-xs sm:text-sm border
        ${variants[variant]}
      `}
      style={{ 
        fontFamily: "'Inter', sans-serif",
        background: variant === 'primary' ? `linear-gradient(135deg, ${accentColor}, #C9A86C)` : undefined,
        boxShadow: variant === 'primary' ? `0 4px 20px ${accentColor}40` : undefined
      }}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </a>
  );
};

/* -------------------- PROJECT CARD -------------------- */
const ProjectCard = ({ project, index }) => {
  const [setImageLoaded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.article
      className="project-card-premium group relative w-full rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ 
        borderColor: `${project.accentColor}15`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${project.accentColor}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${project.accentColor}15`;
      }}
    >
      {/* Featured badge */}
      {project.featured && (
        <motion.div 
          className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30 flex items-center gap-1.5 
                    px-3 py-1.5 rounded-full text-black text-xs font-bold shadow-lg"
          style={{ 
            background: `linear-gradient(135deg, ${project.accentColor}, #C9A86C)`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          Featured
        </motion.div>
      )}

      {/* Content Layout */}
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        
        {/* Image Section with Blended Background */}
        <div className="relative lg:w-[45%] h-64 sm:h-72 lg:h-auto lg:min-h-[450px] overflow-hidden">
          
          {/* Colored background glow based on project accent */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{ 
              background: `radial-gradient(ellipse at ${isEven ? 'left' : 'right'} center, ${project.accentColor}30, transparent 70%)`
            }}
          />

          {/* Image with blend effect */}
          <div className={`absolute inset-0 ${isEven ? 'project-image-blend-left' : 'project-image-blend-right'} lg:block hidden`}>
            <img
              src={project.image}
              alt={project.title}
              className="project-image-hover w-full h-full object-cover object-center"
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
            
            {/* Gradient overlays for smooth blending */}
            <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-transparent via-transparent to-black/90`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </div>

          {/* Mobile image with bottom blend */}
          <div className="absolute inset-0 project-image-blend-bottom lg:hidden">
            <img
              src={project.image}
              alt={project.title}
              className="project-image-hover w-full h-full object-cover object-top"
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
          </div>

          {/* Hover overlay with quick links - Desktop only */}
          <motion.div 
            className="hidden lg:flex absolute inset-0 items-center justify-center
                      bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100
                      transition-opacity duration-300"
          >
            <div className="flex gap-4">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl backdrop-blur-sm transition-all duration-300
                          border border-white/20 hover:border-white/40"
                style={{ background: `${project.accentColor}30` }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="w-6 h-6 text-white" />
              </motion.a>
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl backdrop-blur-sm transition-all duration-300
                          border border-white/20 hover:border-white/40"
                style={{ background: `${project.accentColor}30` }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-6 h-6 text-white" />
              </motion.a>
            </div>
          </motion.div>

          {/* Accent corner glow */}
          <div 
            className={`absolute ${isEven ? 'left-0' : 'right-0'} top-0 w-32 h-32 opacity-40 pointer-events-none hidden lg:block`}
            style={{ 
              background: `radial-gradient(circle at ${isEven ? 'top left' : 'top right'}, ${project.accentColor}40, transparent 70%)`,
            }}
          />
        </div>

        {/* Content Section */}
        <div className="lg:w-[55%] p-6 sm:p-8 lg:p-10 flex flex-col justify-center relative">
          
          {/* Status Badge */}
          <div className="mb-4">
            <StatusBadge status={project.status} />
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white"
              style={{ fontFamily: "'Outfit', sans-serif" }}>
            {project.title}
          </h3>

          {/* Accent line under title */}
          <div 
            className="h-1 w-16 rounded-full mb-5"
            style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }}
          />

          {/* Description */}
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-5"
             style={{ fontFamily: "'Inter', sans-serif" }}>
            {project.description}
          </p>

          {/* Duration */}
          <div className="flex items-center gap-2 mb-5">
            <Calendar className="w-4 h-4" style={{ color: project.accentColor }} />
            <span className="text-sm text-neutral-500"
                  style={{ fontFamily: "'Inter', sans-serif" }}>
              {project.duration}
            </span>
          </div>

          {/* Learnings */}
          <div className="mb-6 p-4 rounded-xl border"
               style={{ 
                 background: `${project.accentColor}08`,
                 borderColor: `${project.accentColor}20`
               }}>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4" style={{ color: project.accentColor }} />
              <span className="text-sm font-semibold" style={{ color: project.accentColor, fontFamily: "'Outfit', sans-serif" }}>
                Key Learnings
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed"
               style={{ fontFamily: "'Inter', sans-serif" }}>
              {project.learnings}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4" style={{ color: project.accentColor }} />
              <span className="text-sm font-semibold text-neutral-300"
                    style={{ fontFamily: "'Outfit', sans-serif" }}>
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
              icon={ArrowUpRight} 
              label="Live Demo" 
              variant="primary"
              accentColor={project.accentColor}
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

      {/* Bottom accent line */}
      <span 
        className="project-accent-line"
        style={{ background: `linear-gradient(90deg, ${project.accentColor}, #C9A86C, transparent)` }}
      />
    </motion.article>
  );
};

/* -------------------- STATS CARD -------------------- */
const StatsCard = ({ icon: Icon, value, label, index }) => (
  <motion.div
    className="flex flex-col items-center gap-2 p-4 sm:p-5 rounded-xl
               bg-white/[0.02] border border-white/5
               hover:border-[#C9A86C]/20 transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
  >
    <Icon className="w-5 h-5 projects-text-gold" />
    <span className="text-2xl sm:text-3xl font-bold text-white"
          style={{ fontFamily: "'Outfit', sans-serif" }}>
      {value}
    </span>
    <span className="text-[10px] sm:text-xs text-neutral-500 uppercase tracking-wider text-center"
          style={{ fontFamily: "'Inter', sans-serif" }}>
      {label}
    </span>
  </motion.div>
);

/* -------------------- MAIN PROJECTS SECTION -------------------- */
const Projects = () => {
  const lenisRef = useContext(LenisContext);
  
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
    { icon: FolderOpen, value: "5+", label: "Projects" },
    { icon: Code2, value: "10+", label: "Technologies" },
    { icon: Zap, value: "1000+", label: "Hours Coded" },
    { icon: Rocket, value: "100%", label: "Passion" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32
                 projects-bg-pure-black overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 projects-noise-texture pointer-events-none z-[1]" />
      
      {/* Subtle ambient glows */}
      <div className="absolute top-40 left-1/4 w-[500px] h-[500px] bg-[#C9A86C]/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-40 right-1/4 w-[400px] h-[400px] bg-neutral-800/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">

        {/* ========== SECTION HEADER ========== */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <SectionBadge text="Featured Work" icon={Rocket} />
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold 
                       tracking-tight mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <span className="projects-gold-gradient-text">My Projects</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed"
          >
            A collection of projects that showcase my passion for building 
            innovative solutions and learning new technologies.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            variants={itemVariants}
            className="mt-8 mx-auto w-20 h-px projects-glow-line"
          />
        </motion.div>

        {/* ========== STATS SECTION ========== */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-14 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat, index) => (
            <StatsCard key={stat.label} {...stat} index={index} />
          ))}
        </motion.div>

        {/* ========== CATEGORY FILTER ========== */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-14"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
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

        {/* ========== PROJECTS LIST ========== */}
        <div className="flex flex-col space-y-8 sm:space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ========== EMPTY STATE ========== */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <FolderOpen className="w-16 h-16 mx-auto mb-4 text-neutral-700" />
            <h3 className="text-xl font-semibold text-neutral-400 mb-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}>
              No projects found
            </h3>
            <p className="text-neutral-600"
               style={{ fontFamily: "'Inter', sans-serif" }}>
              Try selecting a different category
            </p>
          </motion.div>
        )}

        {/* ========== BOTTOM CTA SECTION ========== */}
        <motion.div
          className="mt-16 sm:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* More Projects Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8
                         bg-blue-500/10 border border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <Github className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400"
                  style={{ fontFamily: "'Inter', sans-serif" }}>
              More Projects on GitHub
            </span>
          </div>

          {/* CTA Button */}
          <div>
            <motion.a
              href="https://github.com/Shubham-Goswami-Github"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl
                        projects-btn-gold text-black font-bold text-base sm:text-lg
                        transition-all duration-300"
              style={{ fontFamily: "'Outfit', sans-serif" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>View All Projects</span>
              <ChevronRight className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Additional info */}
          <p className="mt-6 text-sm text-neutral-600 max-w-md mx-auto">
            Always working on something new. Check out my GitHub for latest updates.
          </p>
        </motion.div>

        {/* ========== BOTTOM DECORATIVE ========== */}
        <motion.div 
          className="flex justify-center mt-16 sm:mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-neutral-800" />
            <div className="projects-accent-dot" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-neutral-800" />
          </div>
        </motion.div>

        {/* Corner accents */}
        <div className="hidden lg:block absolute top-8 left-8 w-12 h-12">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-neutral-800/50 to-transparent" />
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-neutral-800/50 to-transparent" />
        </div>
        
        <div className="hidden lg:block absolute bottom-8 right-8 w-12 h-12">
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-neutral-800/50 to-transparent" />
          <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-neutral-800/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Projects;