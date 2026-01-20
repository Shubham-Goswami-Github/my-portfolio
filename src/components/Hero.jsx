import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useContext, useEffect, useState, useMemo, memo } from "react";
import { 
  ChevronDown, 
  Instagram, 
  Linkedin, 
  Facebook, 
  Github,
  MapPin,
  Sparkles,
  Download,
  ExternalLink
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { db, serverTimestamp } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import AnimatedPlanetStarBackground from "./AnimatedPlanetStarBackground";
import { LenisContext } from "../LenisProvider";
import ResumeRequestPopup from "./ResumeRequestPopup";

/* -------------------- OPTIMIZED CSS STYLES -------------------- */
const optimizedStyles = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

@keyframes shimmer {
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes rotate-border {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.05); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

/* GPU Acceleration Hints */
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.will-change-transform {
  will-change: transform;
}

.will-change-opacity {
  will-change: opacity;
}
`;

// Inject styles once
if (typeof document !== 'undefined' && !document.getElementById('hero-optimized-styles')) {
  const styleSheet = document.createElement("style");
  styleSheet.id = 'hero-optimized-styles';
  styleSheet.innerHTML = optimizedStyles;
  document.head.appendChild(styleSheet);
}

/* -------------------- OPTIMIZED TYPING EFFECT -------------------- */
const TypingEffect = memo(({ text, duration = 2, className, startDelay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    let timeoutId;
    let charIndex = 0;

    const typeNextChar = () => {
      if (charIndex <= text.length) {
        setDisplayedText(text.slice(0, charIndex));
        charIndex++;
        timeoutId = setTimeout(typeNextChar, (duration * 1000) / text.length);
      } else {
        setIsComplete(true);
      }
    };

    const startTimeout = setTimeout(() => {
      typeNextChar();
    }, startDelay * 1000);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, duration, startDelay, shouldReduceMotion]);

  return (
    <h1
      className={`${className || ""} font-extrabold inline-block bg-clip-text text-transparent whitespace-nowrap gpu-accelerated`}
      aria-label={text}
      style={{
        backgroundImage: "linear-gradient(90deg, #e16928, #fbbf24, #f59e0b, #e16928)",
        backgroundSize: "200% 100%",
        animation: isComplete ? "shimmer 4s infinite linear" : "none",
        fontFamily: "'Poppins', 'Inter', sans-serif",
        letterSpacing: "-0.02em",
      }}
    >
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </h1>
  );
});

/* -------------------- SOCIAL LINKS DATA -------------------- */
const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/Shubham-Goswami-Github",
    hoverClass: "hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-900",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/shubham-das-goswami-sg8990/",
    hoverClass: "hover:bg-[#0077B5] hover:text-white",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/sacrastic_shubham/",
    hoverClass: "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:text-white",
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/skg.kumar.7737/",
    hoverClass: "hover:bg-[#1877F2] hover:text-white",
  },
];

/* -------------------- OPTIMIZED SOCIAL ICON -------------------- */
const SocialIcon = memo(({ social, index }) => {
  const Icon = social.icon;
  
  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        relative group p-3 sm:p-4 rounded-xl 
        bg-white/10 dark:bg-white/5 
        backdrop-blur-sm border border-white/20 dark:border-white/10
        transition-all duration-200 ease-out
        ${social.hoverClass}
        gpu-accelerated
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
      aria-label={social.name}
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-current transition-colors duration-200" />
      
      {/* Simplified Tooltip */}
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 
                       px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 
                       text-xs font-medium rounded opacity-0 group-hover:opacity-100 
                       transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
        {social.name}
      </span>
    </motion.a>
  );
});

/* -------------------- STATUS BADGE (CSS Animation) -------------------- */
const StatusBadge = memo(() => (
  <div
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
               bg-green-500/10 border border-green-500/30 
               text-green-600 dark:text-green-400"
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
    </span>
    <span className="text-sm font-medium">Available for work</span>
  </div>
));

/* -------------------- SKILL TAGS (Simplified) -------------------- */
const SkillTags = memo(() => {
  const skills = ["React", "Next.js", "Tailwind CSS", "Node.js", "Firebase"];
  
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start mt-6">
      {skills.map((skill, index) => (
        <motion.span
          key={skill}
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium 
                     bg-gradient-to-r from-[#e16928]/10 to-yellow-400/10 
                     border border-[#e16928]/30 dark:border-yellow-400/30
                     text-[#e16928] dark:text-yellow-400 
                     rounded-full"
          style={{ fontFamily: "'Inter', sans-serif" }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
        >
          {skill}
        </motion.span>
      ))}
    </div>
  );
});

/* -------------------- SIMPLIFIED FLOATING BACKGROUND (CSS Only) -------------------- */
const FloatingBackground = memo(() => (
  <>
    {/* Use CSS animations instead of Framer Motion */}
    <div 
      className="absolute w-64 h-64 rounded-full top-20 -left-32 opacity-20 gpu-accelerated"
      style={{
        background: "linear-gradient(to right, rgba(225, 105, 40, 0.3), rgba(251, 191, 36, 0.3))",
        filter: "blur(60px)",
        animation: "pulse-slow 8s ease-in-out infinite",
      }}
    />
    <div 
      className="absolute w-72 h-72 rounded-full bottom-20 -right-36 opacity-15 gpu-accelerated"
      style={{
        background: "linear-gradient(to right, rgba(56, 189, 248, 0.2), rgba(168, 85, 247, 0.2))",
        filter: "blur(60px)",
        animation: "pulse-slow 10s ease-in-out infinite 2s",
      }}
    />
  </>
));

/* -------------------- HERO SECTION -------------------- */
const Hero = () => {
  const lenisRef = useContext(LenisContext);
  const prefersReducedMotion = useReducedMotion();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (lenisRef?.current)
      lenisRef.current.scrollTo(window.scrollY, { immediate: true });
  }, [lenisRef]);

  // Memoize handlers
  const handleDownloadClick = useMemo(() => () => setShowPopup(true), []);
  const handleClosePopup = useMemo(() => () => setShowPopup(false), []);
  const handleViewProjects = useMemo(() => () => {
    const proj = document.getElementById("projects");
    if (proj) proj.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section 
      id="hero" 
      className="min-h-screen flex flex-col justify-center relative overflow-hidden 
                 bg-gradient-to-br from-white via-gray-50 to-orange-50/30 
                 dark:from-gray-950 dark:via-black dark:to-gray-900"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <AnimatedPlanetStarBackground />
      
      {/* Simplified floating elements - CSS only */}
      {!prefersReducedMotion && <FloatingBackground />}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* LEFT SIDE - Image */}
          <motion.div
            className="flex justify-center lg:justify-start order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              {/* Simplified glow - CSS animation */}
              <div 
                className="absolute -inset-4 sm:-inset-6 rounded-full opacity-20 gpu-accelerated"
                style={{
                  background: "linear-gradient(to right, #e16928, #fbbf24, #38bdf8)",
                  filter: "blur(30px)",
                  animation: prefersReducedMotion ? "none" : "pulse-slow 4s ease-in-out infinite",
                }}
              />

              {/* Rotating border - CSS animation instead of Framer Motion */}
              <div
                className="absolute -inset-2 sm:-inset-3 rounded-full gpu-accelerated"
                style={{
                  background: "conic-gradient(from 0deg, #e16928, #fbbf24, #38bdf8, #c084fc, #e16928)",
                  animation: prefersReducedMotion ? "none" : "rotate-border 15s linear infinite",
                }}
              />

              {/* Image container - CSS float animation */}
              <div
                className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 gpu-accelerated"
                style={{
                  animation: prefersReducedMotion ? "none" : "float 6s ease-in-out infinite",
                }}
              >
                <div className="absolute inset-1 sm:inset-2 rounded-full p-[3px] sm:p-[4px] 
                               bg-gradient-to-br from-[#e16928] via-yellow-400 to-sky-400">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-1">
                    <img
                      src="https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/GithubProfile.jpeg"
                      alt="Shubham Das Goswami"
                      className="rounded-full w-full h-full object-cover shadow-xl"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* Sparkle - simplified */}
                <div
                  className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-12 sm:h-12 
                             bg-gradient-to-r from-[#e16928] to-yellow-400 rounded-full 
                             flex items-center justify-center shadow-lg"
                >
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              {/* Social Links - Desktop */}
              <div className="hidden lg:flex absolute -right-24 xl:-right-28 top-1/2 -translate-y-1/2 flex-col gap-6">
                {socialLinks.slice(0, 2).map((social, index) => (
                  <SocialIcon key={social.name} social={social} index={index} />
                ))}
              </div>

              <div className="hidden lg:flex absolute -left-24 xl:-left-28 top-1/2 -translate-y-1/2 flex-col gap-6">
                {socialLinks.slice(2, 4).map((social, index) => (
                  <SocialIcon key={social.name} social={social} index={index + 2} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Text content */}
          <div className="text-center lg:text-left order-2 space-y-4 sm:space-y-6">
            
            {/* Status Badge */}
            <div className="flex justify-center lg:justify-start">
              <StatusBadge />
            </div>

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium">
                Hello there! 👋
              </span>
              <p className="mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-100"
                 style={{ fontFamily: "'Poppins', sans-serif" }}>
                I'm
              </p>
            </motion.div>

            {/* Name */}
            <div className="mt-1 overflow-visible">
              <TypingEffect
                text="Shubham Das Goswami"
                duration={1.5}
                startDelay={0.1}
                className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-semibold md:font-bold leading-none"
              />
            </div>

            {/* Description - Simplified */}
            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              A passionate Web Developer crafting{" "}
              <span className="text-yellow-500 font-bold">modern</span> and{" "}
              <span className="text-[#e16928] font-bold">animated</span>{" "}
              digital experiences.
            </motion.p>

            {/* Location */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-500 dark:text-gray-400">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Based in India</span>
            </div>

            {/* Skill Tags */}
            <SkillTags />

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center lg:justify-start items-center pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {/* Download Resume */}
              <motion.button
                onClick={handleDownloadClick}
                className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 
                           bg-gradient-to-r from-[#e16928] via-orange-500 to-yellow-500
                           text-white font-semibold text-sm sm:text-base rounded-xl 
                           shadow-lg shadow-[#e16928]/25 transition-shadow duration-200
                           hover:shadow-xl hover:shadow-[#e16928]/40"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  Download Resume
                </span>
              </motion.button>

              {/* View Projects */}
              <motion.button
                onClick={handleViewProjects}
                className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 
                           border-2 border-[#e16928] dark:border-yellow-400 
                           text-[#e16928] dark:text-yellow-400 
                           font-semibold text-sm sm:text-base rounded-xl
                           transition-all duration-200
                           hover:bg-[#e16928] hover:text-white dark:hover:bg-yellow-400 dark:hover:text-black"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                  View Projects
                </span>
              </motion.button>
            </motion.div>

            {/* Mobile Social Links */}
            <div className="lg:hidden flex justify-center gap-4 sm:gap-5 pt-6">
              {socialLinks.map((social, index) => (
                <SocialIcon key={social.name} social={social} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator - CSS animation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div style={{ animation: "bounce-slow 1.5s ease-in-out infinite" }}>
            <ChevronDown className="w-6 h-6 text-[#e16928] dark:text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Popup */}
      <AnimatePresence mode="wait">
        {showPopup && <ResumeRequestPopup onClose={handleClosePopup} />}
      </AnimatePresence>
    </section>
  );
};

export default Hero;