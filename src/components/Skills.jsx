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


/* -------------------- SHIMMER STYLES -------------------- */
const skillsShimmerStyle = document.createElement("style");
skillsShimmerStyle.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800;900&display=swap');

@keyframes shimmer-skills {
  0% { background-position: 0% 0%; }
  50% { background-position: 150% 0%; }
  100% { background-position: 0% 0%; }
}

@keyframes float-skill {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(225, 105, 40, 0.3); }
  50% { box-shadow: 0 0 40px rgba(225, 105, 40, 0.6); }
}

@keyframes rotate-border {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes skill-shine {
  0% { left: -100%; }
  50%, 100% { left: 100%; }
}

.shimmer-text-skills {
  background-image: linear-gradient(90deg, #e16928, #fbbf24, #f59e0b, #e16928);
  background-size: 300% 100%;
  animation: shimmer-skills 6s infinite linear;
  -webkit-background-clip: text;
  background-clip: text;
}

.skill-card-shine::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.skill-card-shine:hover::before {
  left: 100%;
}
`;
if (!document.querySelector('#skills-shimmer-style')) {
  skillsShimmerStyle.id = 'skills-shimmer-style';
  document.head.appendChild(skillsShimmerStyle);
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

/* -------------------- SKILL LEVEL BAR -------------------- */
const SkillLevelBar = ({ level, color, delay }) => (
  <motion.div
    className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: delay + 0.3, duration: 0.4 }}
  >
    <motion.div
      className={`h-full rounded-full bg-gradient-to-r ${color}`}
      initial={{ width: 0 }}
      whileInView={{ width: `${level}%` }}
      viewport={{ once: true }}
      transition={{ delay: delay + 0.5, duration: 0.8, ease: "easeOut" }}
    />
  </motion.div>
);

/* -------------------- SKILL CARD -------------------- */
const SkillCard = ({ skill, index }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const Icon = skill.icon;
  const delay = index * 0.08;

  return (
    <motion.div
      className={`
        group relative flex flex-col items-center justify-center
        p-6 sm:p-8 rounded-3xl cursor-pointer
        bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl
        border ${skill.borderColor} dark:border-white/10
        shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        transition-all duration-500 ease-out overflow-hidden
        hover:shadow-[0_20px_50px_rgba(225,105,40,0.2)] 
        dark:hover:shadow-[0_20px_50px_rgba(225,105,40,0.3)]
        skill-card-shine
      `}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        delay: delay, 
        duration: 0.5, 
        type: "spring",
        stiffness: 100
      }}
      whileHover={!shouldReduceMotion ? { 
        y: -12, 
        scale: 1.03,
        transition: { duration: 0.3, ease: "easeOut" } 
      } : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated gradient border on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
                   transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(225,105,40,0.4), rgba(250,204,21,0.4))`,
          padding: "2px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Background glow */}
      <div className={`absolute inset-0 rounded-3xl ${skill.bgColor} opacity-0 
                      group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Floating particles on hover */}
      <AnimatePresence>
        {isHovered && !shouldReduceMotion && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#e16928]"
                initial={{ 
                  opacity: 0, 
                  x: 0, 
                  y: 0,
                  scale: 0
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [-20, -60],
                  x: [(i - 1) * 20, (i - 1) * 30],
                  scale: [0, 1, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: i * 0.2,
                  repeat: Infinity
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Skill Icon/Image Container */}
      <motion.div
        className="relative z-10 mb-4"
        animate={isHovered && !shouldReduceMotion ? { 
          y: -8,
          rotate: [0, -5, 5, 0]
        } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Glow behind icon */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${skill.color} 
                     blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
          style={{ transform: 'scale(1.5)' }}
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
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain
                        group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <Icon className={`w-12 h-12 sm:w-14 sm:h-14 
                            bg-gradient-to-r ${skill.color} bg-clip-text text-transparent
                            group-hover:scale-110 transition-transform duration-500`} />
          )}
        </div>

        {/* Level badge */}
        <motion.div
          className="absolute -top-2 -right-2 px-2 py-1 rounded-full
                    bg-gradient-to-r from-[#e16928] to-yellow-500
                    text-white text-xs font-bold shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.4, duration: 0.3, type: "spring" }}
        >
          {skill.level}%
        </motion.div>
      </motion.div>

      {/* Skill Name */}
      <motion.h3
        className="relative z-10 text-lg sm:text-xl font-bold text-gray-900 dark:text-white
                   mb-3 font-['Poppins',sans-serif] text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 0.4 }}
      >
        <span className="group-hover:shimmer-text-skills group-hover:text-transparent 
                        group-hover:bg-clip-text transition-all duration-300">
          {skill.name}
        </span>
      </motion.h3>

      {/* Skill Level Bar */}
      <div className="relative z-10 w-full px-2">
        <SkillLevelBar level={skill.level} color={skill.color} delay={delay} />
      </div>

      {/* Category Tag */}
      <motion.span
        className="relative z-10 mt-3 px-3 py-1 rounded-full text-xs font-medium
                  bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400
                  capitalize font-['Inter',sans-serif]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.5, duration: 0.3 }}
      >
        {skill.category}
      </motion.span>

      {/* Bottom progress line */}
      <span className="pointer-events-none absolute bottom-0 left-0 h-1 w-0 
                      group-hover:w-full transition-[width] duration-700 
                      bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400 rounded-b-3xl" />
    </motion.div>
  );
};

/* -------------------- STATS CARD -------------------- */

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
            duration={10} 
            className="w-72 h-72 bg-gradient-to-r from-[#e16928]/20 to-yellow-400/20 blur-3xl top-10 -left-36" 
          />
          <FloatingElement 
            delay={2} 
            duration={12} 
            className="w-96 h-96 bg-gradient-to-r from-sky-400/10 to-purple-400/10 blur-3xl bottom-10 -right-48" 
          />
          <FloatingElement 
            delay={4} 
            duration={8} 
            className="w-48 h-48 bg-gradient-to-r from-yellow-400/25 to-orange-400/25 blur-2xl top-1/4 right-1/4" 
          />
          <FloatingElement 
            delay={3} 
            duration={14} 
            className="w-56 h-56 bg-gradient-to-r from-green-400/15 to-teal-400/15 blur-3xl bottom-1/4 left-1/4" 
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
            <SectionBadge text="What I Work With" icon={Code2} />
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
            <span className="shimmer-text-skills text-transparent bg-clip-text">
              My Skills
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 
                       max-w-2xl mx-auto leading-relaxed font-['Inter',sans-serif]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Technologies and tools I use to bring ideas to life and create amazing digital experiences.
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

    

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
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
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <SkillCard skill={skill} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          className="mt-16 sm:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Learning Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6
                       bg-green-500/10 border border-green-500/30 
                       text-green-600 dark:text-green-400"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium font-['Inter',sans-serif]">
              Always Learning & Growing
            </span>
          </motion.div>

          {/* CTA Button */}
          
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          className="flex justify-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.5 }}
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

export default Skills;