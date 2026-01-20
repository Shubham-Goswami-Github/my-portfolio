import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import AnimatedPlanetStarBackground from "./AnimatedPlanetStarBackground";
import { TypeAnimation } from "react-type-animation";
import { useContext, useEffect, useState } from "react";
import { 
  FaGraduationCap, 
  FaUniversity, 
  FaStar, 
  FaLaptopCode,
  FaCalendarAlt,
  FaAward,
  FaCode,
  FaRocket
} from "react-icons/fa";
import { 
  Sparkles, 
  BookOpen, 
  Trophy, 
  GraduationCap,
  MapPin,
  Briefcase,
  Heart,
  Coffee,
  Zap,
  Target,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { LenisContext } from "../LenisProvider";

/* -------------------- SHIMMER STYLES -------------------- */
const aboutShimmerStyle = document.createElement("style");
aboutShimmerStyle.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800;900&display=swap');

@keyframes shimmer-about {
  0% { background-position: 0% 0%; }
  50% { background-position: 150% 0%; }
  100% { background-position: 0% 0%; }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(225, 105, 40, 0.3); }
  50% { box-shadow: 0 0 40px rgba(225, 105, 40, 0.6), 0 0 60px rgba(251, 191, 36, 0.3); }
}

@keyframes border-dance {
  0%, 100% { border-color: rgba(225, 105, 40, 0.3); }
  50% { border-color: rgba(251, 191, 36, 0.5); }
}

@keyframes card-shine {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(100%) rotate(45deg); }
}

.motion-optim {
  will-change: transform, opacity;
}

.shimmer-text {
  background-image: linear-gradient(90deg, #e16928, #fbbf24, #f59e0b, #e16928);
  background-size: 300% 100%;
  animation: shimmer-about 6s infinite linear;
  -webkit-background-clip: text;
  background-clip: text;
}
`;
if (!document.querySelector('#about-shimmer-style')) {
  aboutShimmerStyle.id = 'about-shimmer-style';
  document.head.appendChild(aboutShimmerStyle);
}

/* -------------------- DATA -------------------- */
const education = [
  {
    degree: "10th - CBSE",
    school: "Central Academy, Kanke, Ranchi",
    marks: "66%",
    years: "2018",
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/School-Photo.jpg",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-400",
    highlights: [
      "Built strong foundation in mathematics & science.",
      "Participated in inter-school tech quiz competition.",
      "Developed curiosity towards computers and technology.",
    ],
  },
  {
    degree: "Intermediate of Science",
    school: "Marwari College, Ranchi (JAC Board)",
    marks: "54%",
    years: "2019 – 2020",
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/College-Photo.jpeg",
    icon: GraduationCap,
    color: "from-purple-500 to-pink-400",
    highlights: [
      "Focused on Physics, Chemistry & Mathematics.",
      "Started learning HTML, CSS & basic programming.",
      "Explored problem-solving through online coding games.",
    ],
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "DSPMU, Ranchi",
    marks: "80%",
    years: "2020 – 2023",
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/Dspmu-photo.jpeg",
    icon: Trophy,
    color: "from-[#e16928] to-yellow-400",
    highlights: [
      "Specialized in Full Stack Web Development.",
      "Built multiple academic & personal projects.",
      "Won departmental web design competition 🏆.",
    ],
  },
  {
    degree: "Master of Computer Applications (MCA)",
    school: "SBU, Ranchi",
    marks: "88%",
    years: "2023 – 2025",
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/SBU-Photo.jpeg",
    icon: Zap,
    color: "from-emerald-500 to-teal-400",
    highlights: [
      "Advanced expertise in React, Node.js & Cloud.",
      "Worked on real-time collaborative applications.",
      "Served as project lead for final year capstone project.",
    ],
  },
];

const stats = [
  { icon: Coffee, value: "500+", label: "Cups of Coffee", color: "text-amber-500" },
  { icon: FaCode, value: "50+", label: "Projects Built", color: "text-blue-500" },
  { icon: Heart, value: "100%", label: "Passion", color: "text-red-500" },
  { icon: Target, value: "∞", label: "Goals to Achieve", color: "text-green-500" },
];

const skills = ["React", "Next.js", "Node.js", "Tailwind CSS", "Firebase", "MongoDB"];

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

/* -------------------- STATUS BADGE -------------------- */
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

/* -------------------- SKILL TAGS -------------------- */
const SkillTags = ({ skills, delay = 0 }) => {
  return (
    <motion.div 
      className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start mt-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.5 }}
    >
      {skills.map((skill, index) => (
        <motion.span
          key={skill}
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium 
                     bg-gradient-to-r from-[#e16928]/10 to-yellow-400/10 
                     border border-[#e16928]/30 dark:border-yellow-400/30
                     text-[#e16928] dark:text-yellow-400 
                     rounded-full backdrop-blur-sm
                     hover:scale-105 hover:border-[#e16928]/60 
                     transition-all duration-300 cursor-default"
          style={{ fontFamily: "'Inter', sans-serif" }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.1 + index * 0.08, duration: 0.3 }}
          whileHover={{ scale: 1.08 }}
        >
          {skill}
        </motion.span>
      ))}
    </motion.div>
  );
};

/* -------------------- STAT CARD -------------------- */
const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;
  return (
    <motion.div
      className="relative group flex flex-col items-center justify-center 
                 p-4 sm:p-5 rounded-2xl
                 bg-white/60 dark:bg-white/5 backdrop-blur-xl
                 border border-white/40 dark:border-white/10
                 hover:border-[#e16928]/40 dark:hover:border-[#e16928]/40
                 shadow-lg hover:shadow-xl hover:shadow-[#e16928]/10
                 transition-all duration-500"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 0.5, type: "spring" }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <Icon className={`w-6 h-6 sm:w-8 sm:h-8 mb-2 ${stat.color} 
                       group-hover:scale-110 transition-transform duration-300`} />
      <span className="text-xl sm:text-2xl md:text-3xl font-bold 
                      text-gray-900 dark:text-white
                      font-['Poppins',sans-serif]">
        {stat.value}
      </span>
      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 
                      text-center font-['Inter',sans-serif]">
        {stat.label}
      </span>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#e16928]/0 via-[#e16928]/5 to-yellow-400/0 
                     opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
    </motion.div>
  );
};

/* -------------------- EDUCATION CARD (UPGRADED) -------------------- */
const EducationCard = ({ edu, idx }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const Icon = edu.icon;

  return (
    <motion.article
      className="group relative flex flex-col h-full
                 bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl
                 rounded-3xl overflow-hidden
                 border border-white/40 dark:border-white/10
                 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                 transition-all duration-500 ease-out
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e16928]/60"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        delay: idx * 0.15, 
        duration: 0.6, 
        type: "spring",
        stiffness: 100
      }}
      whileHover={!shouldReduceMotion ? { 
        y: -12, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" } 
      } : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      role="article"
      aria-label={edu.degree}
      tabIndex={0}
    >
      {/* Animated gradient border on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(225,105,40,0.4), rgba(250,204,21,0.4))`,
          padding: "2px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Image Section with enhanced design */}
      <div className="relative w-full h-36 sm:h-40 md:h-44 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30 z-10" />
        
        {/* Image */}
        <motion.img
          src={edu.img}
          alt={edu.degree}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center"
          animate={isHovered && !shouldReduceMotion ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                     skew-x-12 -translate-x-full group-hover:translate-x-full z-20"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ 
            animation: isHovered ? 'card-shine 0.8s ease-in-out' : 'none'
          }}
        />

        {/* Icon badge */}
        <motion.div
          className={`absolute top-4 right-4 z-20 p-2.5 sm:p-3 rounded-xl 
                     bg-gradient-to-br ${edu.color} shadow-lg`}
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </motion.div>

        {/* Year badge */}
        <div className="absolute bottom-4 left-4 z-20">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full 
                         bg-black/40 backdrop-blur-md border border-white/20">
            <FaCalendarAlt className="w-3 h-3 text-yellow-400" />
            <span className="text-xs font-semibold text-white font-['Poppins',sans-serif]">
              {edu.years}
            </span>
          </div>
        </div>

        {/* Decorative corner */}
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${edu.color} 
                        opacity-30 rounded-bl-full z-10`} />
      </div>

      {/* Content Section */}
      <div className="relative p-5 sm:p-6 flex-1 flex flex-col">
        {/* Degree Title */}
        <motion.h3
          className="flex items-start gap-3 text-lg sm:text-xl font-bold mb-3
                     text-gray-900 dark:text-white font-['Montserrat',sans-serif]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.15 + 0.2, duration: 0.4 }}
        >
          <FaGraduationCap className="text-[#e16928] flex-shrink-0 mt-1 text-xl sm:text-2xl" />
          <span className="leading-tight shimmer-text text-transparent bg-clip-text">
            {edu.degree}
          </span>
        </motion.h3>

        {/* School */}
        <motion.p
          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3 
                     font-['Inter',sans-serif] leading-relaxed"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.15 + 0.3, duration: 0.4 }}
        >
          <FaUniversity className="text-[#e16928] flex-shrink-0 mt-0.5 text-base" />
          <span>{edu.school}</span>
        </motion.p>

        {/* Marks Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 
                     bg-gradient-to-r from-yellow-400/20 to-orange-400/20 
                     dark:from-yellow-400/10 dark:to-orange-400/10
                     border border-yellow-400/40 dark:border-yellow-400/30
                     rounded-full w-fit"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.15 + 0.4, duration: 0.4, type: "spring" }}
          whileHover={{ scale: 1.05 }}
        >
          <FaStar className="text-yellow-500 text-sm" />
          <span className="font-bold text-sm text-gray-900 dark:text-yellow-300 font-['Poppins',sans-serif]">
            Score: {edu.marks}
          </span>
          <FaAward className="text-yellow-500 text-sm" />
        </motion.div>

        {/* Highlights */}
        <ul className="space-y-2.5 flex-1 mb-4">
          {edu.highlights.map((highlight, j) => (
            <motion.li
              key={j}
              className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 
                         leading-relaxed font-['Inter',sans-serif]"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.15 + 0.5 + j * 0.1 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full 
                              bg-gradient-to-r from-[#e16928] to-yellow-400 flex-shrink-0 mt-0.5">
                <ChevronRight className="w-3 h-3 text-white" />
              </span>
              <span className="group-hover:text-gray-800 dark:group-hover:text-gray-200 
                             transition-colors duration-300">
                {highlight}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Footer */}
        <motion.div
          className="mt-auto flex items-center justify-between pt-4 
                     border-t border-gray-200/50 dark:border-gray-700/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: idx * 0.15 + 0.8, duration: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 
                       group-hover:text-[#e16928] transition-colors duration-300
                       font-['Poppins',sans-serif] cursor-pointer"
            whileHover={{ x: 5 }}
          >
            <ExternalLink className="w-4 h-4" />
            View Details
          </motion.span>
          <FaLaptopCode
            className="text-xl text-gray-300 dark:text-gray-600 
                       group-hover:text-[#e16928] group-hover:rotate-12
                       transition-all duration-300"
          />
        </motion.div>

        {/* Bottom progress line */}
        <span className="pointer-events-none absolute bottom-0 left-0 h-1 w-0 
                        group-hover:w-full transition-[width] duration-700 
                        bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400 rounded-b-3xl" />

        {/* Inner glow on hover */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
                       transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-8 rounded-2xl bg-gradient-to-r 
                         from-[#e16928]/5 to-yellow-400/5 blur-2xl" />
        </div>
      </div>
    </motion.article>
  );
};

/* -------------------- PROFILE CIRCLE (UPGRADED) -------------------- */
const ProfileCircle = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative flex-shrink-0"
      initial={{ opacity: 0, scale: 0.8, x: 50 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute -inset-4 sm:-inset-6 rounded-full 
                   bg-gradient-to-r from-[#e16928] via-yellow-400 to-sky-400 
                   opacity-20 blur-2xl"
        animate={shouldReduceMotion ? {} : {
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating border */}
      <motion.div
        className="absolute -inset-2 sm:-inset-3 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, #e16928, #fbbf24, #38bdf8, #c084fc, #e16928)",
        }}
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Main container with floating animation */}
      <motion.div
        className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72"
        animate={shouldReduceMotion ? { y: 0 } : { y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inner gradient border */}
        <div className="absolute inset-1 sm:inset-2 rounded-full p-[3px] sm:p-[4px] 
                       bg-gradient-to-br from-[#e16928] via-yellow-400 to-sky-400">
          <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-1 overflow-hidden">
            <img
              src="https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/portfolio-background-pic.png"
              alt="Shubham Das Goswami"
              className="rounded-full w-full h-full object-cover scale-105
                        shadow-2xl shadow-[#e16928]/20"
              loading="eager"
            />
          </div>
        </div>

        {/* Sparkle decorative element - Top Right */}
        <motion.div
          className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 
                     bg-gradient-to-r from-[#e16928] to-yellow-400 rounded-full 
                     flex items-center justify-center shadow-lg shadow-[#e16928]/30"
          animate={shouldReduceMotion ? {} : { 
            scale: [1, 1.2, 1],
            rotate: [0, 15, -15, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </motion.div>

        {/* Code icon - Bottom Left */}
        <motion.div
          className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-8 h-8 sm:w-10 sm:h-10 
                     bg-gradient-to-r from-sky-400 to-purple-500 rounded-full 
                     flex items-center justify-center shadow-lg"
          animate={shouldReduceMotion ? {} : { 
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          <FaCode className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </motion.div>

        {/* Rocket icon - Top Left */}
        <motion.div
          className="absolute top-4 -left-4 sm:-left-6 w-8 h-8 sm:w-9 sm:h-9 
                     bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full 
                     flex items-center justify-center shadow-lg"
          animate={shouldReduceMotion ? {} : { 
            y: [0, -8, 0],
            x: [0, 4, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          <FaRocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* -------------------- MAIN ABOUT SECTION -------------------- */
const About = () => {
  const lenisRef = useContext(LenisContext);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(window.scrollY, { immediate: true });
    }
  }, [lenisRef]);

  return (
    <section
      id="about"
      className="relative flex flex-col justify-center items-center
                 min-h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24
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
            className="w-64 h-64 bg-gradient-to-r from-[#e16928]/20 to-yellow-400/20 blur-3xl top-20 -left-32" 
          />
          <FloatingElement 
            delay={2} 
            duration={12} 
            className="w-96 h-96 bg-gradient-to-r from-sky-400/10 to-purple-400/10 blur-3xl bottom-20 -right-48" 
          />
          <FloatingElement 
            delay={4} 
            duration={8} 
            className="w-40 h-40 bg-gradient-to-r from-yellow-400/25 to-orange-400/25 blur-2xl top-1/3 right-1/4" 
          />
          <FloatingElement 
            delay={3} 
            duration={14} 
            className="w-48 h-48 bg-gradient-to-r from-purple-400/15 to-pink-400/15 blur-3xl bottom-1/3 left-1/4" 
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
            <SectionBadge text="Get to know me" icon={Sparkles} />
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
            <span className="shimmer-text text-transparent bg-clip-text">
              About Me
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
            Crafting digital experiences with a blend of engineering, design, and real-world learning.
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

        {/* Intro Card - Glass morphism style */}
        <motion.div
          className="relative mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div
            className="relative rounded-3xl overflow-hidden
                       bg-white/70 dark:bg-white/[0.03] backdrop-blur-2xl 
                       border border-white/50 dark:border-white/10
                       shadow-[0_20px_70px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_70px_rgba(0,0,0,0.4)]
                       px-6 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-12 lg:py-16"
          >
            {/* Top gradient line */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#e16928] to-transparent opacity-60" />

            {/* Grid Layout */}
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16">
              
              {/* Left - Text Content */}
              <motion.div
                className="flex-1 text-center lg:text-left space-y-6 max-w-2xl"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Typing Animation */}
                <TypeAnimation
                  sequence={[
                    "Hey, Fellas! Myself Shubham 👋",
                    2500,
                    "I am a Passionate Web Developer 💻",
                    2500,
                    "Creative UI/UX Developer 🎨",
                    2500,
                    "Problem Solver & Tech Enthusiast 🚀",
                    2500,
                  ]}
                  speed={50}
                  repeat={Infinity}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold
                             shimmer-text text-transparent bg-clip-text
                             font-['Poppins',sans-serif] block"
                />

                {/* Description paragraphs */}
                {[
                  "I build clean, modern and responsive web applications that focus on performance and user experience. My passion lies in creating seamless digital experiences that users love.",
                  "I love exploring frontend ecosystems, experimenting with design systems, and bringing UI ideas to life with smooth interactions and animations.",
                  "When I'm not coding, I enjoy collaborating on interesting projects, contributing to open source, and learning how to make the web more dynamic and meaningful.",
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                    className="text-base sm:text-lg text-gray-700 dark:text-gray-300 
                               leading-relaxed font-['Inter',sans-serif]"
                  >
                    {text}
                  </motion.p>
                ))}

                {/* Location */}
                <motion.div
                  className="flex items-center justify-center lg:justify-start gap-2 
                             text-gray-500 dark:text-gray-400 pt-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <MapPin className="w-5 h-5 text-[#e16928]" />
                  <span className="text-sm sm:text-base font-medium font-['Inter',sans-serif]">
                    Based in Ranchi, India
                  </span>
                </motion.div>

      
                {/* CTA Button */}
                <motion.div
                  className="pt-4 flex justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
               
                </motion.div>
              </motion.div>

              {/* Right - Profile Image */}
              <ProfileCircle />
            </div>

            {/* Bottom gradient line */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-40" />
          </div>
        </motion.div>

        {/* Stats Section */}
      

        {/* Education Section Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div className="flex justify-center mb-4">
            <SectionBadge text="Learning Path" icon={GraduationCap} />
          </motion.div>

          <motion.h3
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4
                       font-['Montserrat',sans-serif]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="shimmer-text text-transparent bg-clip-text">
              Educational Journey
            </span>
          </motion.h3>

          <motion.p 
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 
                      max-w-xl mx-auto font-['Inter',sans-serif]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            A path shaped by consistent learning, hands-on projects and real-world problem solving.
          </motion.p>

          <motion.div
            className="mt-6 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </motion.div>

        {/* Education Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {education.map((edu, idx) => (
            <EducationCard key={edu.degree} edu={edu} idx={idx} />
          ))}
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          className="flex justify-center mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
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

export default About;