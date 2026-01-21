import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useContext, useEffect, useState, useMemo } from "react";
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

/* -------------------- OPTIMIZED TYPING EFFECT -------------------- */
const TypingEffect = ({ text, duration = 2, className, startDelay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let controls;
    let timeoutId;
    count.set(0);

    if (shouldReduceMotion) {
      setCurrentText(text);
      return;
    } else setCurrentText("");

    timeoutId = setTimeout(() => {
      controls = animate(count, text.length, {
        type: "tween",
        duration,
        ease: "easeOut",
      });
    }, startDelay * 1000);

    return () => {
      controls?.stop();
      clearTimeout(timeoutId);
    };
  }, [text, duration, startDelay, shouldReduceMotion, count]);

  useEffect(() => {
    const unsubscribe = displayText.on("change", (latest) =>
      setCurrentText(latest)
    );
    return () => unsubscribe();
  }, [displayText]);

  return (
    <h1
      className={`${className || ""} font-extrabold inline-block bg-clip-text text-transparent whitespace-nowrap hero-shimmer`}
      aria-label={text}
      style={{
        backgroundImage: "linear-gradient(90deg, #e16928, #fbbf24, #f59e0b, #e16928)",
        backgroundSize: "200% 100%",
        fontFamily: "'Poppins', 'Inter', sans-serif",
        letterSpacing: "-0.02em",
      }}
    >
      {currentText}
    </h1>
  );
};

/* Optimized CSS - removed heavy animations */
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('hero-optimized-styles');
  if (!existingStyle) {
    const style = document.createElement("style");
    style.id = 'hero-optimized-styles';
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');
      
      .hero-shimmer {
        animation: shimmer 4s ease-in-out infinite;
      }
      @keyframes shimmer {
        0%, 100% { background-position: 0% 0%; }
        50% { background-position: 100% 0%; }
      }
      .hero-float {
        animation: heroFloat 4s ease-in-out infinite;
      }
      @keyframes heroFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      .hero-rotate {
        animation: heroRotate 8s linear infinite;
      }
      @keyframes heroRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .hero-pulse {
        animation: heroPulse 3s ease-in-out infinite;
      }
      @keyframes heroPulse {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(1.05); }
      }
      .hero-bounce {
        animation: heroBounce 1.5s ease-in-out infinite;
      }
      @keyframes heroBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(8px); }
      }
    `;
    document.head.appendChild(style);
  }
}

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

/* -------------------- SIMPLE SOCIAL ICON -------------------- */
const SocialIcon = ({ social, index }) => {
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
        transition-all duration-200
        ${social.hoverClass}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
      aria-label={social.name}
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-current transition-colors duration-200" />
      
      {/* Simple Tooltip */}
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 
                       px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 
                       text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 
                       transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
        {social.name}
      </span>
    </motion.a>
  );
};

/* -------------------- STATUS BADGE -------------------- */
const StatusBadge = () => (
  <motion.div
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
               bg-green-500/10 border border-green-500/30 
               text-green-600 dark:text-green-400"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.3, duration: 0.4 }}
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
    </span>
    <span className="text-sm font-medium">Available for work</span>
  </motion.div>
);

/* -------------------- SKILL TAGS -------------------- */
const SkillTags = () => {
  const skills = useMemo(() => ["React", "Next.js", "Tailwind CSS", "Node.js", "Firebase"], []);
  
  return (
    <motion.div 
      className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start mt-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      {skills.map((skill, index) => (
        <span
          key={skill}
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium 
                     bg-gradient-to-r from-[#e16928]/10 to-yellow-400/10 
                     border border-[#e16928]/30 dark:border-yellow-400/30
                     text-[#e16928] dark:text-yellow-400 
                     rounded-full transition-transform duration-200 hover:scale-105"
          style={{ 
            fontFamily: "'Inter', sans-serif",
            animationDelay: `${index * 0.1}s`
          }}
        >
          {skill}
        </span>
      ))}
    </motion.div>
  );
};

/* -------------------- HERO SECTION -------------------- */
const Hero = () => {
  const lenisRef = useContext(LenisContext);
  useEffect(() => {
    if (lenisRef?.current)
      lenisRef.current.scrollTo(window.scrollY, { immediate: true });
  }, [lenisRef]);

  const prefersReducedMotion = useReducedMotion();
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await addDoc(collection(db, "resume_requests"), {
        Sname: formData.name,
        email: formData.email,
        message: formData.message || "Requesting resume download",
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      await emailjs.send(
        "service_s8kkwnl",
        "template_3qknvw3",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message || "Requesting resume download",
          site: "my-portfolio",
        },
        "F2wa8gLjvNeUzf3KK"
      );

      setSuccess(true);
      setSending(false);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setShowPopup(false), 4000);
    } catch (err) {
      alert(err.message);
      setSending(false);
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex flex-col justify-center relative overflow-hidden 
                 bg-gradient-to-br from-white via-gray-50 to-orange-50/30 
                 dark:from-gray-950 dark:via-black dark:to-gray-900 
                 transition-colors duration-500"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <AnimatedPlanetStarBackground />
      
      {/* Simplified decorative background - CSS only */}
      {!prefersReducedMotion && (
        <>
          <div className="absolute w-64 h-64 bg-gradient-to-r from-[#e16928]/15 to-yellow-400/15 blur-xl rounded-full top-20 -left-32 hero-pulse" />
          <div className="absolute w-72 h-72 bg-gradient-to-r from-sky-400/10 to-purple-400/10 blur-xl rounded-full bottom-20 -right-36 hero-pulse" style={{ animationDelay: '1.5s' }} />
        </>
      )}

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* Grid layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* LEFT SIDE - Image */}
          <motion.div
            className="flex justify-center lg:justify-start order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Outer glow - CSS animation */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-full 
                             bg-gradient-to-r from-[#e16928] via-yellow-400 to-sky-400 
                             opacity-15 blur-xl hero-pulse" />

              {/* Rotating border - CSS animation */}
              <div
                className={`absolute -inset-2 sm:-inset-3 rounded-full ${prefersReducedMotion ? '' : 'hero-rotate'}`}
                style={{
                  background: "conic-gradient(from 0deg, #e16928, #fbbf24, #38bdf8, #c084fc, #e16928)",
                  willChange: prefersReducedMotion ? 'auto' : 'transform',
                }}
              />

              {/* Image container - CSS float animation */}
              <div
                className={`relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 ${prefersReducedMotion ? '' : 'hero-float'}`}
                style={{ willChange: prefersReducedMotion ? 'auto' : 'transform' }}
              >
                {/* Inner gradient border */}
                <div className="absolute inset-1 sm:inset-2 rounded-full p-[3px] sm:p-[4px] 
                               bg-gradient-to-br from-[#e16928] via-yellow-400 to-sky-400">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-1">
                    <img
                      src="https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/GithubProfile.jpeg"
                      alt="Shubham Das Goswami"
                      className="rounded-full w-full h-full object-cover shadow-xl"
                      loading="eager"
                    />
                  </div>
                </div>

                {/* Sparkle element - simplified */}
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-12 sm:h-12 
                               bg-gradient-to-r from-[#e16928] to-yellow-400 rounded-full 
                               flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              {/* Social Links - Desktop Right */}
              <div className="hidden lg:flex absolute -right-24 xl:-right-28 top-1/2 -translate-y-1/2 flex-col gap-6">
                {socialLinks.slice(0, 2).map((social, index) => (
                  <SocialIcon key={social.name} social={social} index={index} />
                ))}
              </div>

              {/* Social Links - Desktop Left */}
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
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 
                               font-medium tracking-wide"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                Hello there! 👋
              </span>
              <p className="mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                            font-semibold text-gray-800 dark:text-gray-100"
                 style={{ fontFamily: "'Poppins', sans-serif" }}>
                I'm
              </p>
            </motion.div>

            {/* Name with typing effect */}
            <motion.div 
              className="mt-1 overflow-visible"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <TypingEffect
                text={"Shubham\u00A0Das\u00A0Goswami"}
                duration={1.5}
                startDelay={0.1}
                className="
                  text-[1.15rem]
                  xs:text-[1.3rem]
                  sm:text-[1.6rem]
                  md:text-[2rem]
                  lg:text-[2.25rem]
                  xl:text-[2.5rem]
                  2xl:text-[2.8rem]
                  font-semibold md:font-bold
                  tracking-[0.02em]
                  leading-none w-auto
                "
              />
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl 
                         text-gray-600 dark:text-gray-300 
                         max-w-xl mx-auto lg:mx-0 leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              A passionate Web Developer crafting{" "}
              <span className="text-yellow-500 font-bold">modern</span>{" "}
              and{" "}
              <span className="text-[#e16928] font-bold">animated</span>{" "}
              digital experiences.
            </motion.p>

            {/* Location */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-2 
                         text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                Based in India
              </span>
            </motion.div>

            {/* Skill Tags */}
            <SkillTags />

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 
                         justify-center lg:justify-start items-center pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Download Resume Button */}
              <motion.button
                onClick={() => setShowPopup(true)}
                className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 
                           bg-gradient-to-r from-[#e16928] via-orange-500 to-yellow-500
                           text-white font-semibold text-sm sm:text-base
                           rounded-xl shadow-lg shadow-[#e16928]/25
                           overflow-hidden transition-all duration-200
                           hover:shadow-xl hover:shadow-[#e16928]/30"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  Download Resume
                </span>
              </motion.button>

              {/* View Projects Button */}
              <motion.button
                onClick={() => {
                  const proj = document.getElementById("projects");
                  if (proj) proj.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 
                           bg-transparent border-2 border-[#e16928] dark:border-yellow-400 
                           text-[#e16928] dark:text-yellow-400 
                           font-semibold text-sm sm:text-base rounded-xl
                           transition-all duration-200
                           hover:bg-[#e16928] hover:text-white 
                           dark:hover:bg-yellow-400 dark:hover:text-black"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                  View Projects
                </span>
              </motion.button>
            </motion.div>

            {/* Social Links - Mobile */}
            <motion.div
              className="lg:hidden flex justify-center gap-4 sm:gap-5 pt-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {socialLinks.map((social, index) => (
                <SocialIcon key={social.name} social={social} index={index} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator - CSS animation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className={prefersReducedMotion ? '' : 'hero-bounce'}>
            <ChevronDown className="w-6 h-6 text-[#e16928] dark:text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Resume Request Popup */}
      <AnimatePresence>
        {showPopup && (
          <ResumeRequestPopup 
            onClose={() => setShowPopup(false)}
            formData={formData}
            sending={sending}
            success={success}
            onFormChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;