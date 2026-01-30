import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { LenisContext } from "../LenisProvider";
import { 
  Sparkles, 
  Code2, 
  Database, 
  Server, 
  Layout,
  TrendingUp,
  Zap,
  Star
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

/* -------------------- INJECT PREMIUM STYLES -------------------- */
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('skills-premium-styles');
  if (!existingStyle) {
    const style = document.createElement("style");
    style.id = 'skills-premium-styles';
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
      
      :root {
        --skills-gold: #C9A86C;
        --skills-gold-light: #E8D5B5;
        --skills-gold-dark: #A68B4B;
      }
      
      .skills-bg-pure-black {
        background-color: #000000;
      }
      
      .skills-text-gold {
        color: var(--skills-gold);
      }
      
      .skills-noise-texture {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        opacity: 0.015;
      }
      
      .skills-gold-gradient-text {
        background: linear-gradient(135deg, #D4AF37 0%, #C9A86C 30%, #E8D5B5 50%, #C9A86C 70%, #B8956A 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .skills-glow-line {
        background: linear-gradient(90deg, transparent, rgba(201, 168, 108, 0.5), transparent);
      }
      
      .skills-accent-dot {
        width: 6px;
        height: 6px;
        background: var(--skills-gold);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--skills-gold);
      }
      
      @keyframes skills-pulse-slow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      .skills-animate-pulse-slow {
        animation: skills-pulse-slow 3s ease-in-out infinite;
      }
      
      .skills-btn-gold {
        background: linear-gradient(135deg, #C9A86C 0%, #D4AF37 50%, #C9A86C 100%);
        box-shadow: 0 4px 20px rgba(201, 168, 108, 0.2);
      }
      
      .skills-btn-gold:hover {
        box-shadow: 0 6px 30px rgba(201, 168, 108, 0.3);
      }
      
      .skills-border-gold {
        border: 1px solid rgba(201, 168, 108, 0.3);
      }
      
      .skills-border-gold:hover {
        border-color: rgba(201, 168, 108, 0.5);
      }
      
      /* Skill Card Styles */
      .skill-card-premium {
        background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
        border: 1px solid rgba(255, 255, 255, 0.06);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .skill-card-premium:hover {
        background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
        border-color: rgba(201, 168, 108, 0.3);
        transform: translateY(-6px);
        box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5),
                    0 0 0 1px rgba(201, 168, 108, 0.15);
      }
      
      .skill-progress-bar {
        transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .skill-icon-glow {
        transition: all 0.3s ease;
      }
      
      .skill-card-premium:hover .skill-icon-glow {
        box-shadow: 0 0 30px rgba(201, 168, 108, 0.2);
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
      
      .skill-accent-line {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 0;
        border-radius: 0 0 12px 12px;
        transition: width 0.4s ease;
      }
      
      .skill-card-premium:hover .skill-accent-line {
        width: 100%;
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
    color: "#E34F26",
  },
  { 
    name: "CSS3", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/CSS.png",
    icon: FaCss3Alt,
    category: "frontend",
    level: 92,
    color: "#1572B6",
  },
  { 
    name: "JavaScript", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/javascript.png",
    icon: FaJs,
    category: "frontend",
    level: 90,
    color: "#F7DF1E",
  },
  { 
    name: "React", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/reactlogo.png",
    icon: FaReact,
    category: "frontend",
    level: 88,
    color: "#61DAFB",
  },
  { 
    name: "Tailwind CSS", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/tailwindcsslogo.png",
    icon: SiTailwindcss,
    category: "frontend",
    level: 92,
    color: "#06B6D4",
  },
  
  // Backend
  { 
    name: "Node.js", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/nodejslogo.png",
    icon: FaNodeJs,
    category: "backend",
    level: 82,
    color: "#339933",
  },
  { 
    name: "Django", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/djangologo.png",
    icon: SiDjango,
    category: "backend",
    level: 75,
    color: "#092E20",
  },
  { 
    name: "PHP", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/PHP.png",
    icon: FaPhp,
    category: "backend",
    level: 78,
    color: "#777BB4",
  },
  { 
    name: "Firebase", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/firebaselogo.png",
    icon: SiFirebase,
    category: "backend",
    level: 80,
    color: "#FFCA28",
  },
  
  // Languages
  { 
    name: "Java", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/JAVA.png",
    icon: FaJava,
    category: "languages",
    level: 80,
    color: "#007396",
  },
  { 
    name: "Python", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/pythone.png",
    icon: FaPython,
    category: "languages",
    level: 85,
    color: "#3776AB",
  },

  // Database
  { 
    name: "MySQL", 
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/MYSQL-ICON.png",
    icon: SiMysql,
    category: "database",
    level: 85,
    color: "#4479A1",
  },
];

/* -------------------- SECTION BADGE -------------------- */
const SectionBadge = ({ text, icon: Icon }) => (
  <motion.div
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
               bg-[#C9A86C]/10 skills-border-gold"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1, duration: 0.4 }}
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    <span className="skills-accent-dot skills-animate-pulse-slow" />
    {Icon && <Icon className="w-4 h-4 skills-text-gold" />}
    <span className="text-xs sm:text-sm font-medium skills-text-gold tracking-wider uppercase">
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
      <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'skills-text-gold'}`} />
      <span className="hidden sm:inline">{category.name}</span>
    </motion.button>
  );
};

/* -------------------- SKILL CARD -------------------- */
const SkillCard = ({ skill, index }) => {
  const [inView, setInView] = useState(false);

  return (
    <motion.div
      className="skill-card-premium group relative flex flex-col items-center
                 p-5 sm:p-6 rounded-2xl cursor-default"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onViewportEnter={() => setInView(true)}
    >
      {/* Skill Icon/Image Container */}
      <div className="skill-icon-glow relative mb-5">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl 
                       bg-white/[0.03] border border-white/10
                       flex items-center justify-center
                       group-hover:border-[#C9A86C]/30 transition-all duration-300">
          {skill.img ? (
            <img 
              src={skill.img} 
              alt={skill.name}
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              loading="lazy"
            />
          ) : (
            <skill.icon 
              className="w-10 h-10 sm:w-12 sm:h-12" 
              style={{ color: skill.color }}
            />
          )}
        </div>

        {/* Level badge */}
        <div className="absolute -top-2 -right-2 px-2.5 py-1 rounded-lg
                       skills-btn-gold
                       text-black text-[10px] sm:text-xs font-bold shadow-lg">
          {skill.level}%
        </div>
      </div>

      {/* Skill Name */}
      <h3 className="text-sm sm:text-base font-semibold text-white
                     mb-4 text-center
                     group-hover:skills-text-gold transition-colors duration-300"
          style={{ fontFamily: "'Outfit', sans-serif" }}>
        {skill.name}
      </h3>

      {/* Skill Level Bar */}
      <div className="w-full mb-3">
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="skill-progress-bar h-full rounded-full"
            style={{ 
              width: inView ? `${skill.level}%` : '0%',
              background: `linear-gradient(90deg, ${skill.color}, #C9A86C)`
            }}
          />
        </div>
      </div>

      {/* Category Tag */}
      <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium
                      bg-white/5 text-neutral-500
                      capitalize tracking-wider uppercase
                      group-hover:bg-[#C9A86C]/10 group-hover:text-[#C9A86C]
                      transition-all duration-300"
            style={{ fontFamily: "'Inter', sans-serif" }}>
        {skill.category}
      </span>

      {/* Bottom accent line */}
      <span 
        className="skill-accent-line"
        style={{ background: `linear-gradient(90deg, ${skill.color}, #C9A86C)` }}
      />
    </motion.div>
  );
};

/* -------------------- STATS SECTION -------------------- */
const SkillStats = () => {
  const statsData = [
    { label: "Technologies", value: "12+", icon: Code2 },
    { label: "Frameworks", value: "5+", icon: Layout },
    { label: "Years Exp", value: "2+", icon: Zap },
    { label: "Projects", value: "5+", icon: Star },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-14 sm:mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            className="flex flex-col items-center gap-2 p-4 sm:p-5 rounded-xl
                       bg-white/[0.02] border border-white/5
                       hover:border-[#C9A86C]/20 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
          >
            <Icon className="w-5 h-5 skills-text-gold" />
            <span className="text-2xl sm:text-3xl font-bold text-white"
                  style={{ fontFamily: "'Outfit', sans-serif" }}>
              {stat.value}
            </span>
            <span className="text-[10px] sm:text-xs text-neutral-500 uppercase tracking-wider text-center"
                  style={{ fontFamily: "'Inter', sans-serif" }}>
              {stat.label}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

/* -------------------- MAIN SKILLS SECTION -------------------- */
const Skills = () => {
  const lenisRef = useContext(LenisContext);

  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(window.scrollY, { immediate: true });
    }
  }, [lenisRef]);

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

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
      id="skills"
      className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32
                 skills-bg-pure-black overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 skills-noise-texture pointer-events-none z-[1]" />
      
      {/* Subtle ambient glows */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#C9A86C]/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-neutral-800/[0.04] rounded-full blur-[120px] pointer-events-none" />

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
            <SectionBadge text="What I Work With" icon={Code2} />
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold 
                       tracking-tight mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <span className="skills-gold-gradient-text">My Skills</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            Technologies and tools I use to bring ideas to life and create amazing digital experiences.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            variants={itemVariants}
            className="mt-8 mx-auto w-20 h-px skills-glow-line"
          />
        </motion.div>

        {/* ========== STATS SECTION ========== */}
        <SkillStats />

        {/* ========== CATEGORY FILTER ========== */}
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

        {/* ========== SKILLS GRID ========== */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <SkillCard skill={skill} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ========== BOTTOM CTA SECTION ========== */}
        <motion.div
          className="mt-16 sm:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Learning Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                         bg-emerald-500/10 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400"
                  style={{ fontFamily: "'Inter', sans-serif" }}>
              Always Learning & Growing
            </span>
          </div>

          {/* Additional info */}
          <p className="mt-6 text-sm text-neutral-600 max-w-md mx-auto">
            Currently exploring <span className="text-neutral-400">Next.js</span>, <span className="text-neutral-400">TypeScript</span>, and <span className="text-neutral-400">Cloud Technologies</span>
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
            <div className="skills-accent-dot" />
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

export default Skills;