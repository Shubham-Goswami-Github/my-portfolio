import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import AnimatedPlanetStarBackground from "./AnimatedPlanetStarBackground";
import { useContext, useEffect, useState } from "react";
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
  FaJs
} from "react-icons/fa";
import { 
  SiDjango, 
  SiMysql, 
  SiTailwindcss,
  SiFirebase
} from "react-icons/si";

/* -------------------- OPTIMIZED CSS STYLES -------------------- */
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('skills-optimized-styles');
  if (!existingStyle) {
    const style = document.createElement("style");
    style.id = 'skills-optimized-styles';
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800;900&display=swap');

      .skills-shimmer {
        background-image: linear-gradient(90deg, #e16928, #fbbf24, #f59e0b, #e16928);
        background-size: 200% 100%;
        animation: skillsShimmer 4s ease-in-out infinite;
        -webkit-background-clip: text;
        background-clip: text;
      }
      
      @keyframes skillsShimmer {
        0%, 100% { background-position: 0% 0%; }
        50% { background-position: 100% 0%; }
      }
      
      .skills-pulse {
        animation: skillsPulse 3s ease-in-out infinite;
      }
      
      @keyframes skillsPulse {
        0%, 100% { opacity: 0.15; transform: scale(1); }
        50% { opacity: 0.25; transform: scale(1.03); }
      }
      
      .skill-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .skill-card:hover {
        transform: translateY(-8px);
      }
      
      .skill-card:hover .skill-progress-line {
        width: 100%;
      }
      
      .skill-progress-line {
        transition: width 0.5s ease-out;
      }
      
      .skill-card:hover .skill-icon-container {
        transform: scale(1.1);
      }
      
      .skill-icon-container {
        transition: transform 0.3s ease;
      }
      
      .skill-level-fill {
        transition: width 0.8s ease-out;
      }
    `;
    document.head.appendChild(style);
  }
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
    borderColor: "border-orange-500/20"
  },
  { 
    name: "CSS3", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/CSS.png",
    icon: FaCss3Alt,
    category: "frontend",
    level: 92,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
  },
  { 
    name: "JavaScript", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/javascript.png",
    icon: FaJs,
    category: "frontend",
    level: 90,
    color: "from-yellow-400 to-yellow-500",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/20"
  },
  { 
    name: "React", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/reactlogo.png",
    icon: FaReact,
    category: "frontend",
    level: 88,
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/20"
  },
  { 
    name: "Tailwind CSS", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/tailwindcsslogo.png",
    icon: SiTailwindcss,
    category: "frontend",
    level: 92,
    color: "from-teal-400 to-cyan-500",
    bgColor: "bg-teal-400/10",
    borderColor: "border-teal-400/20"
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
    borderColor: "border-green-500/20"
  },
  { 
    name: "Django", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/djangologo.png",
    icon: SiDjango,
    category: "backend",
    level: 75,
    color: "from-emerald-600 to-green-700",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20"
  },
  { 
    name: "PHP", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/PHP.png",
    icon: FaPhp,
    category: "backend",
    level: 78,
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20"
  },
  { 
    name: "Firebase", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/firebaselogo.png",
    icon: SiFirebase,
    category: "backend",
    level: 80,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20"
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
    borderColor: "border-red-500/20"
  },
  { 
    name: "Python", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/pythone.png",
    icon: FaPython,
    category: "languages",
    level: 85,
    color: "from-blue-500 to-yellow-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
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
    borderColor: "border-blue-600/20"
  },
];

/* -------------------- SECTION BADGE -------------------- */
const SectionBadge = ({ text, icon: Icon }) => (
  <motion.div
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
               bg-[#e16928]/10 border border-[#e16928]/30 
               text-[#e16928] dark:text-orange-400"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1, duration: 0.4 }}
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
        flex items-center gap-2 px-4 py-2.5 rounded-xl
        font-medium text-sm transition-all duration-200
        ${isActive 
          ? 'bg-gradient-to-r from-[#e16928] to-yellow-500 text-white shadow-lg shadow-[#e16928]/25' 
          : 'bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#e16928]/40'
        }
      `}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 * index, duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#e16928]'}`} />
      <span className="hidden sm:inline">{category.name}</span>
    </motion.button>
  );
};

/* -------------------- SKILL CARD (OPTIMIZED) -------------------- */
const SkillCard = ({ skill, index }) => {
  const [inView, setInView] = useState(false);

  return (
    <motion.div
      className={`
        skill-card group relative flex flex-col items-center
        p-5 sm:p-6 rounded-2xl cursor-default
        bg-white/70 dark:bg-white/[0.04] backdrop-blur-lg
        border ${skill.borderColor} dark:border-white/10
        shadow-md hover:shadow-xl hover:shadow-[#e16928]/10
      `}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onViewportEnter={() => setInView(true)}
    >
      {/* Skill Icon/Image Container */}
      <div className="skill-icon-container relative mb-4">
        {/* Icon Container */}
        <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl 
                        ${skill.bgColor} border border-white/20 dark:border-white/10
                        flex items-center justify-center
                        group-hover:border-[#e16928]/30`}>
          {skill.img ? (
            <img 
              src={skill.img} 
              alt={skill.name}
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              loading="lazy"
            />
          ) : (
            <skill.icon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-700 dark:text-gray-300" />
          )}
        </div>

        {/* Level badge */}
        <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full
                       bg-gradient-to-r from-[#e16928] to-yellow-500
                       text-white text-xs font-bold shadow-md">
          {skill.level}%
        </div>
      </div>

      {/* Skill Name */}
      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white
                     mb-3 font-['Poppins',sans-serif] text-center
                     group-hover:text-[#e16928] dark:group-hover:text-orange-400
                     transition-colors duration-200">
        {skill.name}
      </h3>

      {/* Skill Level Bar */}
      <div className="w-full">
        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`skill-level-fill h-full rounded-full bg-gradient-to-r ${skill.color}`}
            style={{ width: inView ? `${skill.level}%` : '0%' }}
          />
        </div>
      </div>

      {/* Category Tag */}
      <span className="mt-3 px-3 py-1 rounded-full text-xs font-medium
                      bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400
                      capitalize font-['Inter',sans-serif]">
        {skill.category}
      </span>

      {/* Bottom progress line on hover */}
      <span className="skill-progress-line absolute bottom-0 left-0 h-0.5 w-0
                      bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400 rounded-b-2xl" />
    </motion.div>
  );
};

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

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col justify-center items-center 
                 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24
                 bg-gradient-to-br from-white via-gray-50 to-orange-50/30 
                 dark:from-gray-950 dark:via-black dark:to-gray-900
                 transition-colors duration-500 overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <AnimatedPlanetStarBackground />
      </div>

      {/* Simplified decorative elements - CSS only */}
      {!shouldReduceMotion && (
        <>
          <div className="absolute w-64 h-64 bg-gradient-to-r from-[#e16928]/15 to-yellow-400/15 
                         blur-xl rounded-full top-20 -left-32 skills-pulse" />
          <div className="absolute w-72 h-72 bg-gradient-to-r from-sky-400/10 to-purple-400/10 
                         blur-xl rounded-full bottom-20 -right-36 skills-pulse" 
               style={{ animationDelay: '1.5s' }} />
        </>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <SectionBadge text="What I Work With" icon={Code2} />
          </div>

          {/* Title */}
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold 
                       tracking-tight mb-4 font-['Montserrat',sans-serif]"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="skills-shimmer text-transparent bg-clip-text">
              My Skills
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 
                       max-w-2xl mx-auto leading-relaxed font-['Inter',sans-serif]"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Technologies and tools I use to bring ideas to life and create amazing digital experiences.
          </motion.p>

          {/* Decorative underline */}
          <motion.div
            className="mt-6 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {skillCategories.map((category, index) => (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
              index={index}
            />
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <SkillCard skill={skill} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          className="mt-14 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Learning Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                         bg-green-500/10 border border-green-500/30 
                         text-green-600 dark:text-green-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium font-['Inter',sans-serif]">
              Always Learning & Growing
            </span>
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-12 sm:mt-14">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#e16928]" />
            <Sparkles className="w-5 h-5 text-[#e16928] animate-pulse" />
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-yellow-400" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;