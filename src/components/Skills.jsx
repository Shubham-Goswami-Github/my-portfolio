import { motion, useReducedMotion } from "framer-motion";
import AnimatedPlanetStarBackground from "./AnimatedPlanetStarBackground";
import { useContext, useEffect, useState, memo, useMemo, useCallback } from "react";
import { LenisContext } from "../LenisProvider";
import { 
  Sparkles, 
  Code2, 
  Database, 
  Server, 
  Layout,
  TrendingUp
} from "lucide-react";
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaJava, 
  FaPhp,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaCode,
  FaRocket,
  FaFire,
  FaBolt
} from "react-icons/fa";
import { 
  SiDjango, 
  SiMysql, 
  SiTailwindcss,
  SiFirebase
} from "react-icons/si";

/* -------------------- OPTIMIZED CSS STYLES -------------------- */
const skillsOptimizedStyles = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap');

@keyframes shimmer-skills {
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

@keyframes progress-fill {
  from { width: 0; }
}

.gpu-layer {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
}

.shimmer-text-skills {
  background-image: linear-gradient(90deg, #e16928, #fbbf24, #f59e0b, #e16928);
  background-size: 200% 100%;
  animation: shimmer-skills 4s infinite linear;
  -webkit-background-clip: text;
  background-clip: text;
}

/* Skill Card Hover Effects - Pure CSS */
.skill-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(225, 105, 40, 0.15);
}

.skill-card:hover .skill-icon {
  transform: scale(1.1);
}

.skill-card:hover .skill-glow {
  opacity: 0.5;
}

.skill-card:hover .skill-border-glow {
  opacity: 1;
}

.skill-card:hover .skill-name {
  background-image: linear-gradient(90deg, #e16928, #fbbf24, #f59e0b, #e16928);
  background-size: 200% 100%;
  animation: shimmer-skills 4s infinite linear;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.skill-card:hover .progress-line {
  width: 100%;
}

/* Progress Bar Animation */
.progress-bar {
  transition: width 0.8s ease-out;
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

/* Skill Image Hover */
.skill-img-container {
  transition: transform 0.4s ease;
}

.skill-card:hover .skill-img-container {
  transform: translateY(-8px);
}
`;

// Inject styles once
if (typeof document !== 'undefined' && !document.getElementById('skills-optimized-styles')) {
  const styleSheet = document.createElement("style");
  styleSheet.id = 'skills-optimized-styles';
  styleSheet.innerHTML = skillsOptimizedStyles;
  document.head.appendChild(styleSheet);
}

/* -------------------- SKILLS DATA -------------------- */
const skillCategories = [
  { id: "all", name: "All Skills", icon: Sparkles },
  { id: "frontend", name: "Frontend", icon: Layout },
  { id: "backend", name: "Backend", icon: Server },
  { id: "languages", name: "Languages", icon: Code2 },
  { id: "database", name: "Database", icon: Database },
];

const skills = [
  // Frontend
  { 
    name: "HTML5", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/html.png",
    icon: FaHtml5,
    category: "frontend",
    level: 95,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30"
  },
  { 
    name: "CSS3", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/CSS.png",
    icon: FaCss3Alt,
    category: "frontend",
    level: 92,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30"
  },
  { 
    name: "JavaScript", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/javascript.png",
    icon: FaJs,
    category: "frontend",
    level: 90,
    color: "from-yellow-400 to-yellow-500",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/30"
  },
  { 
    name: "React", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/reactlogo.png",
    icon: FaReact,
    category: "frontend",
    level: 88,
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/30"
  },
  { 
    name: "Tailwind CSS", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/tailwindcsslogo.png",
    icon: SiTailwindcss,
    category: "frontend",
    level: 92,
    color: "from-teal-400 to-cyan-500",
    bgColor: "bg-teal-400/10",
    borderColor: "border-teal-400/30"
  },
  
  // Backend
  { 
    name: "Node.js", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/nodejslogo.png",
    icon: FaNodeJs,
    category: "backend",
    level: 82,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30"
  },
  { 
    name: "Django", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/djangologo.png",
    icon: SiDjango,
    category: "backend",
    level: 75,
    color: "from-emerald-600 to-green-700",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30"
  },
  { 
    name: "PHP", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/PHP.png",
    icon: FaPhp,
    category: "backend",
    level: 78,
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/30"
  },
  { 
    name: "Firebase", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/firebaselogo.png",
    icon: SiFirebase,
    category: "backend",
    level: 80,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30"
  },
  
  // Languages
  { 
    name: "Java", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/JAVA.png",
    icon: FaJava,
    category: "languages",
    level: 80,
    color: "from-red-500 to-orange-600",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30"
  },
  { 
    name: "Python", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/pythone.png",
    icon: FaPython,
    category: "languages",
    level: 85,
    color: "from-blue-500 to-yellow-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30"
  },

  // Database
  { 
    name: "MySQL", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/MYSQL-ICON.png",
    icon: SiMysql,
    category: "database",
    level: 85,
    color: "from-blue-600 to-orange-500",
    bgColor: "bg-blue-600/10",
    borderColor: "border-blue-600/30"
  },
];

/* -------------------- SIMPLIFIED FLOATING BACKGROUND (CSS Only) -------------------- */
const FloatingBackground = memo(() => (
  <>
    <div 
      className="absolute w-72 h-72 rounded-full top-10 -left-36 gpu-layer"
      style={{
        background: "linear-gradient(to right, rgba(225, 105, 40, 0.12), rgba(251, 191, 36, 0.12))",
        filter: "blur(50px)",
        animation: "pulse-slow 8s ease-in-out infinite",
      }}
    />
    <div 
      className="absolute w-80 h-80 rounded-full bottom-10 -right-40 gpu-layer"
      style={{
        background: "linear-gradient(to right, rgba(56, 189, 248, 0.08), rgba(168, 85, 247, 0.08))",
        filter: "blur(50px)",
        animation: "pulse-slow 10s ease-in-out infinite 2s",
      }}
    />
    <div 
      className="absolute w-48 h-48 rounded-full top-1/4 right-1/4 gpu-layer"
      style={{
        background: "linear-gradient(to right, rgba(251, 191, 36, 0.1), rgba(249, 115, 22, 0.1))",
        filter: "blur(40px)",
        animation: "pulse-slow 6s ease-in-out infinite 1s",
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

/* -------------------- SKILL LEVEL BAR (CSS-based) -------------------- */
const SkillLevelBar = memo(({ level, color }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${color} progress-bar`}
        style={{ width: isVisible ? `${level}%` : '0%' }}
      />
    </div>
  );
});

/* -------------------- SKILL CARD (Optimized with CSS) -------------------- */
const SkillCard = memo(({ skill, index }) => {
  const Icon = skill.icon;

  return (
    <article
      className={`
        skill-card group relative flex flex-col items-center justify-center
        p-6 sm:p-8 rounded-3xl cursor-pointer gpu-layer
        bg-white/70 dark:bg-white/[0.04] backdrop-blur-lg
        border ${skill.borderColor} dark:border-white/10
        shadow-lg dark:shadow-xl
        overflow-hidden
      `}
      style={{
        animationDelay: `${index * 0.05}s`
      }}
    >
      {/* Gradient border on hover - CSS only */}
      <div
        className="skill-border-glow absolute inset-0 rounded-3xl opacity-0 
                   transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(225,105,40,0.3), rgba(250,204,21,0.3))`,
          padding: "2px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Background glow - CSS transition */}
      <div className={`absolute inset-0 rounded-3xl ${skill.bgColor} opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Skill Icon/Image Container */}
      <div className="skill-img-container relative z-10 mb-4">
        {/* Glow behind icon - CSS transition */}
        <div
          className={`skill-glow absolute inset-0 rounded-full bg-gradient-to-r ${skill.color} 
                     opacity-0 transition-opacity duration-300`}
          style={{ filter: "blur(20px)", transform: 'scale(1.5)' }}
        />
        
        {/* Icon Container */}
        <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl 
                        bg-gradient-to-br ${skill.bgColor} 
                        border border-white/20 dark:border-white/10
                        flex items-center justify-center
                        group-hover:border-[#e16928]/40 transition-all duration-300`}>
          {skill.img ? (
            <img 
              src={skill.img} 
              alt={skill.name}
              className="skill-icon w-14 h-14 sm:w-16 sm:h-16 object-contain
                        transition-transform duration-300"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <Icon className={`skill-icon w-12 h-12 sm:w-14 sm:h-14 
                            text-gray-700 dark:text-gray-300
                            transition-transform duration-300`} />
          )}
        </div>

        {/* Level badge */}
        <div
          className="absolute -top-2 -right-2 px-2 py-1 rounded-full
                    bg-gradient-to-r from-[#e16928] to-yellow-500
                    text-white text-xs font-bold shadow-lg"
        >
          {skill.level}%
        </div>
      </div>

      {/* Skill Name */}
      <h3
        className="skill-name relative z-10 text-lg sm:text-xl font-bold 
                   text-gray-900 dark:text-white
                   mb-3 font-['Poppins',sans-serif] text-center
                   transition-all duration-300"
      >
        {skill.name}
      </h3>

      {/* Skill Level Bar */}
      <div className="relative z-10 w-full px-2">
        <SkillLevelBar level={skill.level} color={skill.color} />
      </div>

      {/* Category Tag */}
      <span
        className="relative z-10 mt-3 px-3 py-1 rounded-full text-xs font-medium
                  bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400
                  capitalize font-['Inter',sans-serif]"
      >
        {skill.category}
      </span>

      {/* Bottom progress line - CSS transition */}
      <span className="progress-line absolute bottom-0 left-0 h-1 w-0 
                      transition-all duration-500 
                      bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400 rounded-b-3xl" />
    </article>
  );
});

/* -------------------- MAIN SKILLS SECTION -------------------- */
const Skills = () => {
  const lenisRef = useContext(LenisContext);
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(window.scrollY, { immediate: true });
    }
  }, [lenisRef]);

  // Memoize filtered skills
  const filteredSkills = useMemo(() => {
    return activeCategory === "all" 
      ? skills 
      : skills.filter(skill => skill.category === activeCategory);
  }, [activeCategory]);

  // Memoize category change handler
  const handleCategoryChange = useCallback((categoryId) => {
    setActiveCategory(categoryId);
  }, []);

  // Simple fade animation for section
  const fadeInUp = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.4 }
  }), []);

  return (
    <section
      id="skills"
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
            <SectionBadge text="What I Work With" icon={Code2} />
          </div>

          {/* Title */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold 
                       tracking-tight mb-4 font-['Montserrat',sans-serif]"
          >
            <span className="shimmer-text-skills text-transparent bg-clip-text">
              My Skills
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 
                       max-w-2xl mx-auto leading-relaxed font-['Inter',sans-serif]"
          >
            Technologies and tools I use to bring ideas to life and create amazing digital experiences.
          </p>

          {/* Decorative underline */}
          <div className="mt-6 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-12"
          {...fadeInUp}
        >
          {skillCategories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => handleCategoryChange(category.id)}
            />
          ))}
        </motion.div>

        {/* Skills Grid - Simple CSS transition for filtering */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
            >
              <SkillCard skill={skill} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="mt-16 sm:mt-20 text-center"
          {...fadeInUp}
        >
          {/* Learning Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6
                       bg-green-500/10 border border-green-500/30 
                       text-green-600 dark:text-green-400"
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium font-['Inter',sans-serif]">
              Always Learning & Growing
            </span>
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

export default Skills;