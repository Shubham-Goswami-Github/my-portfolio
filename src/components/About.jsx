import { motion} from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useContext, useEffect } from "react";
import { 
  FaGraduationCap, 
  FaUniversity, 
  FaStar, 
  FaCalendarAlt,
 
} from "react-icons/fa";
import { 
  BookOpen, 
  Trophy, 
  GraduationCap,
  MapPin,
  Zap,
  ChevronRight,
  Code2,
  Sparkles,
  User,
  Briefcase,
  Award,
  TrendingUp
} from "lucide-react";
import { LenisContext } from "../LenisProvider";

/* -------------------- INJECT PREMIUM STYLES -------------------- */
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('about-premium-v4-styles');
  if (!existingStyle) {
    const style = document.createElement("style");
    style.id = 'about-premium-v4-styles';
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
      
      :root {
        --about-gold: #C9A86C;
        --about-gold-light: #E8D5B5;
        --about-gold-dark: #A68B4B;
      }
      
      .about-bg-pure-black {
        background-color: #000000;
      }
      
      .about-text-gold {
        color: var(--about-gold);
      }
      
      .about-noise-texture {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        opacity: 0.015;
      }
      
      .about-photo-grayscale {
        filter: grayscale(100%) contrast(1.1) brightness(0.95);
      }
      
      .about-card-glass {
        background: rgba(255, 255, 255, 0.02);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.06);
      }
      
      .about-gold-gradient-text {
        background: linear-gradient(135deg, #D4AF37 0%, #C9A86C 30%, #E8D5B5 50%, #C9A86C 70%, #B8956A 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .about-glow-line {
        background: linear-gradient(90deg, transparent, rgba(201, 168, 108, 0.5), transparent);
      }
      
      .about-accent-dot {
        width: 6px;
        height: 6px;
        background: var(--about-gold);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--about-gold);
      }
      
      @keyframes about-pulse-slow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      .about-animate-pulse-slow {
        animation: about-pulse-slow 3s ease-in-out infinite;
      }
      
      .about-btn-gold {
        background: linear-gradient(135deg, #C9A86C 0%, #D4AF37 50%, #C9A86C 100%);
        box-shadow: 0 4px 20px rgba(201, 168, 108, 0.2);
      }
      
      .about-btn-gold:hover {
        box-shadow: 0 6px 30px rgba(201, 168, 108, 0.3);
      }
      
      .about-border-gold {
        border: 1px solid rgba(201, 168, 108, 0.3);
      }
      
      /* BLENDED PHOTO INSIDE BOX - Like Hero Section */
      .profile-blend-right {
        mask-image: linear-gradient(to left, 
          black 0%,
          black 40%,
          rgba(0,0,0,0.7) 60%,
          rgba(0,0,0,0.3) 80%,
          transparent 100%
        );
        -webkit-mask-image: linear-gradient(to left, 
          black 0%,
          black 40%,
          rgba(0,0,0,0.7) 60%,
          rgba(0,0,0,0.3) 80%,
          transparent 100%
        );
      }
      
      .profile-blend-bottom {
        mask-image: linear-gradient(to top, 
          transparent 0%,
          rgba(0,0,0,0.3) 15%,
          rgba(0,0,0,0.7) 35%,
          black 60%,
          black 100%
        );
        -webkit-mask-image: linear-gradient(to top, 
          transparent 0%,
          rgba(0,0,0,0.3) 15%,
          rgba(0,0,0,0.7) 35%,
          black 60%,
          black 100%
        );
      }
      
      /* Education Card Styles - COLORFUL */
      .edu-card-premium {
        background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
        border: 1px solid rgba(255, 255, 255, 0.06);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .edu-card-premium:hover {
        background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
        transform: translateY(-8px);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
                    0 0 0 1px rgba(201, 168, 108, 0.2);
      }
      
      .edu-photo-overlay {
        background: linear-gradient(180deg, 
          rgba(0,0,0,0.1) 0%, 
          transparent 30%,
          transparent 50%,
          rgba(0,0,0,0.5) 80%,
          rgba(0,0,0,0.9) 100%
        );
      }
      
      .edu-accent-line {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        width: 0;
        border-radius: 0 0 16px 16px;
        transition: width 0.5s ease;
      }
      
      .edu-card-premium:hover .edu-accent-line {
        width: 100%;
      }
      
      .stat-card-premium {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: all 0.3s ease;
      }
      
      .stat-card-premium:hover {
        background: rgba(201, 168, 108, 0.08);
        border-color: rgba(201, 168, 108, 0.2);
      }
    `;
    document.head.appendChild(style);
  }
}

/* -------------------- EDUCATION DATA (COLORFUL) -------------------- */
const education = [
  {
    degree: "10th - CBSE",
    school: "Central Academy, Kanke, Ranchi",
    marks: "66%",
    years: "2018",
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/School-Photo.jpg",
    icon: BookOpen,
    accentColor: "#3B82F6",
    gradientFrom: "#3B82F6",
    gradientTo: "#06B6D4",
    highlights: [
      "Strong foundation in mathematics & science",
      "Inter-school tech quiz participant",
      "Curiosity for computers & technology",
    ],
  },
  {
    degree: "Intermediate of Science",
    school: "Marwari College, Ranchi (JAC Board)",
    marks: "54%",
    years: "2019 – 2020",
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/College-Photo.jpeg",
    icon: GraduationCap,
    accentColor: "#8B5CF6",
    gradientFrom: "#8B5CF6",
    gradientTo: "#EC4899",
    highlights: [
      "Physics, Chemistry & Mathematics focus",
      "Started HTML, CSS & basic programming",
      "Problem-solving through coding games",
    ],
  },
  {
    degree: "Bachelor of Computer Applications",
    school: "DSPMU, Ranchi",
    marks: "80%",
    years: "2020 – 2023",
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/Dspmu-photo.jpeg",
    icon: Trophy,
    accentColor: "#F59E0B",
    gradientFrom: "#F59E0B",
    gradientTo: "#EF4444",
    highlights: [
      "Full Stack Web Development specialization",
      "Multiple academic & personal projects",
      "Web design competition winner 🏆",
    ],
  },
  {
    degree: "Master of Computer Applications",
    school: "SBU, Ranchi",
    marks: "88%",
    years: "2023 – 2025",
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/SBU-Photo.jpeg",
    icon: Zap,
    accentColor: "#10B981",
    gradientFrom: "#10B981",
    gradientTo: "#14B8A6",
    highlights: [
      "React, Node.js & Cloud expertise",
      "Real-time collaborative applications",
      "Project lead for capstone project",
    ],
  },
];

/* -------------------- STATS DATA -------------------- */
const stats = [
  { label: "Years Learning", value: "2+", icon: BookOpen },
  { label: "Projects Built", value: "5+", icon: Briefcase },
  { label: "Technologies", value: "15+", icon: Code2 },
 
];

/* -------------------- SECTION BADGE -------------------- */
const SectionBadge = ({ text, icon: Icon }) => (
  <motion.div
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
               bg-[#C9A86C]/10 about-border-gold"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1, duration: 0.4 }}
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    <span className="about-accent-dot about-animate-pulse-slow" />
    {Icon && <Icon className="w-4 h-4 about-text-gold" />}
    <span className="text-xs sm:text-sm font-medium about-text-gold tracking-wider uppercase">
      {text}
    </span>
  </motion.div>
);

/* -------------------- EDUCATION CARD (COLORFUL) -------------------- */
const EducationCard = ({ edu, idx }) => {
  
  const Icon = edu.icon;

  return (
    <motion.article
      className="edu-card-premium group relative flex flex-col h-full rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: idx * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* COLORFUL Image Section */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden">
        {/* COLORFUL Image - No grayscale! */}
        <img
          src={edu.img}
          alt={edu.degree}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center
                     group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Gradient overlay */}
        <div className="edu-photo-overlay absolute inset-0" />
        
        {/* Colored top accent bar */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 z-10"
          style={{ background: `linear-gradient(90deg, ${edu.gradientFrom}, ${edu.gradientTo})` }}
        />

        {/* Icon badge - top right */}
        <motion.div 
          className="absolute top-4 right-4 z-20 w-11 h-11 rounded-xl 
                    backdrop-blur-md flex items-center justify-center shadow-xl
                    group-hover:scale-110 transition-transform duration-300"
          style={{ 
            background: `linear-gradient(135deg, ${edu.gradientFrom}dd, ${edu.gradientTo}dd)`,
          }}
        >
          <Icon className="w-5 h-5 text-white" />
        </motion.div>

        {/* Year badge - bottom left */}
        <div className="absolute bottom-4 left-4 z-20">
          <div 
            className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${edu.gradientFrom}ee, ${edu.gradientTo}ee)`,
            }}
          >
            <FaCalendarAlt className="w-3 h-3 text-white" />
            <span className="text-xs font-semibold text-white" 
                  style={{ fontFamily: "'Inter', sans-serif" }}>
              {edu.years}
            </span>
          </div>
        </div>

        {/* Score badge - bottom right */}
        <div className="absolute bottom-4 right-4 z-20">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                         bg-black/70 backdrop-blur-md shadow-lg border border-white/10">
            <FaStar className="w-3 h-3 text-amber-400" />
            <span className="text-xs font-bold text-white" 
                  style={{ fontFamily: "'Inter', sans-serif" }}>
              {edu.marks}
            </span>
          </div>
        </div>

        {/* Decorative corner glow */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 opacity-40 pointer-events-none"
          style={{ 
            background: `radial-gradient(circle at top right, ${edu.gradientFrom}50, transparent 70%)`,
          }}
        />
      </div>

      {/* Content Section */}
      <div className="relative p-5 sm:p-6 flex-1 flex flex-col">
        
        {/* Degree Title */}
        <h3 className="flex items-start gap-3 mb-3">
          <FaGraduationCap 
            className="flex-shrink-0 mt-1 text-lg transition-colors duration-300"
            style={{ color: edu.accentColor }}
          />
          <span 
            className="text-base sm:text-lg font-bold text-white leading-tight transition-all duration-300"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {edu.degree}
          </span>
        </h3>

        {/* School */}
        <p className="flex items-start gap-2 text-sm text-neutral-400 mb-4" 
           style={{ fontFamily: "'Inter', sans-serif" }}>
          <FaUniversity 
            className="flex-shrink-0 mt-0.5 text-sm opacity-70"
            style={{ color: edu.accentColor }}
          />
          <span className="leading-relaxed">{edu.school}</span>
        </p>

        {/* Highlights */}
        <ul className="space-y-2.5 flex-1">
          {edu.highlights.map((highlight, j) => (
            <li
              key={j}
              className="flex items-start gap-2.5 text-sm text-neutral-400 
                         leading-relaxed group-hover:text-neutral-300 transition-colors duration-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span 
                className="inline-flex items-center justify-center w-4 h-4 rounded-full flex-shrink-0 mt-0.5"
                style={{ 
                  background: `linear-gradient(135deg, ${edu.gradientFrom}30, ${edu.gradientTo}30)`,
                }}
              >
                <ChevronRight className="w-2.5 h-2.5" style={{ color: edu.accentColor }} />
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Bottom footer */}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-[10px] text-neutral-600 uppercase tracking-wider">Completed</span>
          </div>
          <div 
            className="w-8 h-1 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ background: `linear-gradient(90deg, ${edu.gradientFrom}, ${edu.gradientTo})` }}
          />
        </div>

        {/* Bottom accent line animation */}
        <span 
          className="edu-accent-line"
          style={{ background: `linear-gradient(90deg, ${edu.gradientFrom}, ${edu.gradientTo})` }}
        />
      </div>
    </motion.article>
  );
};

/* -------------------- STAT CARD -------------------- */
const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;
  
  return (
    <motion.div
      className="stat-card-premium flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 about-text-gold" />
      <span className="text-xl sm:text-2xl font-bold text-white"
            style={{ fontFamily: "'Outfit', sans-serif" }}>
        {stat.value}
      </span>
      <span className="text-[9px] sm:text-[10px] text-neutral-500 text-center uppercase tracking-wider"
            style={{ fontFamily: "'Inter', sans-serif" }}>
        {stat.label}
      </span>
    </motion.div>
  );
};

/* -------------------- MAIN ABOUT SECTION -------------------- */
const About = () => {
  const lenisRef = useContext(LenisContext);
  

  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(window.scrollY, { immediate: true });
    }
  }, [lenisRef]);

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
      id="about"
      className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32
                 about-bg-pure-black overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 about-noise-texture pointer-events-none z-[1]" />
      
      {/* Subtle ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#C9A86C]/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-neutral-800/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">

        {/* ========== SECTION HEADER ========== */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <SectionBadge text="Get to know me" icon={User} />
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold 
                       tracking-tight mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <span className="about-gold-gradient-text">About Me</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            Crafting digital experiences with a blend of engineering, design, and continuous learning.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            variants={itemVariants}
            className="mt-8 mx-auto w-20 h-px about-glow-line"
          />
        </motion.div>

        {/* ========== INTRO SECTION - BOX WITH BLENDED PHOTO ========== */}
        <motion.div
          className="relative mb-20 sm:mb-28"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative rounded-2xl overflow-hidden about-card-glass">
            
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-px about-glow-line z-20" />

            {/* ===== DESKTOP LAYOUT ===== */}
            <div className="hidden lg:flex min-h-[500px] xl:min-h-[550px]">
              
              {/* Left Side - Text Content */}
              <motion.div
                className="w-[55%] xl:w-[50%] p-10 xl:p-14 2xl:p-16 flex flex-col justify-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Typing Animation */}
                <div className="min-h-[3rem] mb-6">
                  <TypeAnimation
                    sequence={[
                      "Hey there! I'm Shubham 👋",
                      2500,
                      "A Passionate Web Developer 💻",
                      2500,
                      "UI/UX Enthusiast 🎨",
                      2500,
                      "Problem Solver & Tech Explorer 🚀",
                      2500,
                    ]}
                    speed={50}
                    repeat={Infinity}
                    className="text-xl xl:text-2xl 2xl:text-3xl font-semibold text-white"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  />
                </div>

                {/* Description */}
                <div className="space-y-4 mb-6">
                  <p className="text-base xl:text-lg text-neutral-400 leading-relaxed">
                    I build <span className="text-white font-medium">clean</span>, <span className="about-text-gold font-medium">modern</span>, and <span className="text-white font-medium">responsive</span> web applications focused on performance and exceptional user experience.
                  </p>
                  
                  <p className="text-base xl:text-lg text-neutral-400 leading-relaxed">
                    I love exploring frontend ecosystems, experimenting with design systems, and bringing UI ideas to life with smooth interactions and meaningful animations.
                  </p>
                  
                  <p className="text-base xl:text-lg text-neutral-400 leading-relaxed">
                    When I'm not coding, I enjoy collaborating on interesting projects, contributing to open source, and continuously learning new technologies.
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mb-8">
                  <MapPin className="w-4 h-4 about-text-gold" />
                  <span className="text-sm text-neutral-500">Based in Ranchi, India</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {stats.map((stat, index) => (
                    <StatCard key={stat.label} stat={stat} index={index} />
                  ))}
                </div>
              </motion.div>

              {/* Right Side - BLENDED Photo inside box */}
              <motion.div
                className="w-[45%] xl:w-[50%] relative overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {/* Blended Photo */}
                <div className="absolute inset-0 profile-blend-right">
                  <img
                    src="https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/Abputnew.jpeg"
                    alt="Shubham Das Goswami"
                    className="w-full h-full object-cover object-center about-photo-grayscale"
                    loading="eager"
                  />
                  
                  {/* Additional gradient overlays for smooth blending */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
                </div>

          

                <motion.div 
                  className="absolute top-8 right-8 w-11 h-11 rounded-xl 
                            about-btn-gold
                            flex items-center justify-center shadow-xl z-10"
                  initial={{ scale: 0, rotate: 20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  <Sparkles className="w-4 h-4 text-black" />
                </motion.div>

              

                {/* Vertical accent line */}
                <motion.div 
                  className="absolute left-0 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-[#C9A86C]/30 to-transparent z-10"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.div>
            </div>

            {/* ===== MOBILE/TABLET LAYOUT ===== */}
            <div className="lg:hidden">
              
              {/* Blended Photo - Top */}
              <motion.div
                className="relative h-[500px] sm:h-[600px] md:h-[500px] overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 profile-blend-bottom">
                  <img
                    src="https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/Abputnew.jpeg"
                    alt="Shubham Das Goswami"
                    className="w-full h-full object-cover object-top about-photo-grayscale"
                    loading="eager"
                  />
                  
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
                </div>

                {/* Floating badges - Mobile */}
                <motion.div 
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-xl 
                            bg-black/70 about-border-gold backdrop-blur-sm
                            flex items-center justify-center shadow-xl z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <Code2 className="w-4 h-4 about-text-gold" />
                </motion.div>

                <motion.div 
                  className="absolute top-4 right-4 w-9 h-9 rounded-xl 
                            about-btn-gold
                            flex items-center justify-center shadow-xl z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <Sparkles className="w-4 h-4 text-black" />
                </motion.div>
              </motion.div>

              {/* Content - Bottom */}
              <motion.div
                className="p-6 sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Typing Animation */}
                <div className="min-h-[2.5rem] mb-5 text-center">
                  <TypeAnimation
                    sequence={[
                      "Hey there! I'm Shubham 👋",
                      2500,
                      "A Passionate Web Developer 💻",
                      2500,
                      "UI/UX Enthusiast 🎨",
                      2500,
                    ]}
                    speed={50}
                    repeat={Infinity}
                    className="text-lg sm:text-xl font-semibold text-white"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  />
                </div>

                {/* Description */}
                <div className="space-y-4 mb-5 text-center">
                  <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                    I build <span className="text-white font-medium">clean</span>, <span className="about-text-gold font-medium">modern</span>, and <span className="text-white font-medium">responsive</span> web applications focused on performance and exceptional user experience.
                  </p>
                  
                  <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                    I love exploring frontend ecosystems and bringing UI ideas to life with smooth animations.
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <MapPin className="w-4 h-4 about-text-gold" />
                  <span className="text-sm text-neutral-500">Based in Ranchi, India</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                  {stats.map((stat, index) => (
                    <StatCard key={stat.label} stat={stat} index={index} />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
          </div>
        </motion.div>

        {/* ========== EDUCATION SECTION ========== */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <SectionBadge text="Learning Journey" icon={GraduationCap} />
          </motion.div>

          <motion.h3
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <span className="about-gold-gradient-text">Education</span>
          </motion.h3>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-neutral-400 max-w-xl mx-auto"
          >
            A path shaped by consistent learning, hands-on projects, and real-world problem solving.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 mx-auto w-16 h-px about-glow-line"
          />
        </motion.div>

        {/* Education Grid - COLORFUL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {education.map((edu, idx) => (
            <EducationCard key={edu.degree} edu={edu} idx={idx} />
          ))}
        </div>

        {/* Achievement Banner */}
        <motion.div
          className="mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 about-btn-gold">
            
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
                backgroundSize: '20px 20px'
              }} />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-black/20 backdrop-blur-sm flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-lg sm:text-xl font-bold text-black"
                      style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Always Learning
                  </h4>
                  <p className="text-black/70 text-xs sm:text-sm">
                    Constantly improving my skill set
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 sm:gap-8">
                <div className="text-center">
                  <span className="block text-2xl sm:text-3xl font-bold text-black"
                        style={{ fontFamily: "'Outfit', sans-serif" }}>
                    88%
                  </span>
                  <span className="text-[10px] text-black/60 uppercase tracking-wider">MCA Score</span>
                </div>
                <div className="w-px h-10 bg-black/20" />
                <div className="text-center">
                  <span className="block text-2xl sm:text-3xl font-bold text-black"
                        style={{ fontFamily: "'Outfit', sans-serif" }}>
                    2+
                  </span>
                  <span className="text-[10px] text-black/60 uppercase tracking-wider">Years</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========== BOTTOM DECORATIVE ========== */}
        <motion.div 
          className="flex justify-center mt-20 sm:mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-neutral-800" />
            <div className="about-accent-dot" />
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

export default About;