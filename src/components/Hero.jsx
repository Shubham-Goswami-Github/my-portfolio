import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useContext, useEffect, useState } from "react";
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

/* -------------------- TYPING EFFECT -------------------- */
const TypingEffect = ({ text, duration = 2, className, startDelay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
  const [currentText, setCurrentText] = useState("");
  const [planetAnim, setPlanetAnim] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__planetTextAnim = () => {
        setPlanetAnim(true);
        setTimeout(() => setPlanetAnim(false), 600);
      };
      return () => (window.__planetTextAnim = undefined);
    }
  }, []);

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
        ease: "easeInOut",
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
    <motion.h1
      className={
        (className || "") +
        " font-extrabold inline-block relative bg-clip-text text-transparent whitespace-nowrap"
      }
      aria-label={text}
      aria-live="polite"
      animate={planetAnim ? { scale: 1.04 } : { scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        backgroundImage:
          "linear-gradient(90deg, #e16928, #fbbf24, #f59e0b, #e16928)",
        backgroundSize: "300% 100%",
        animation: "shimmer 6s infinite linear",
        fontFamily: "'Poppins', 'Inter', sans-serif",
        letterSpacing: "-0.02em",
      }}
    >
      {Array.from(currentText).map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.08 : 0.14,
            delay: shouldReduceMotion ? i * 0.005 : i * 0.01,
            ease: "easeOut",
          }}
        >
          {ch === "\u00A0" ? "\u00A0" : ch}
        </motion.span>
      ))}
    </motion.h1>
  );
};

/* Add keyframe for shimmer and other effects */
const shimmerStyle = document.createElement("style");
shimmerStyle.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');

@keyframes shimmer {
  0% { background-position: 0% 0%; }
  50% { background-position: 150% 0%; }
  100% { background-position: 0% 0%; }
}
@keyframes pulse-ring {
  0% { transform: scale(0.95); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.5; }
  100% { transform: scale(0.95); opacity: 1; }
}
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(225, 105, 40, 0.4); }
  50% { box-shadow: 0 0 40px rgba(225, 105, 40, 0.8), 0 0 60px rgba(251, 191, 36, 0.4); }
}
`;
document.head.appendChild(shimmerStyle);

/* -------------------- SOCIAL LINKS DATA -------------------- */
const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/Shubham-Goswami-Github",
    color: "hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-900",
    bgGradient: "from-gray-700 to-gray-900"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/shubham-das-goswami-sg8990/",
    color: "hover:bg-[#0077B5] hover:text-white",
    bgGradient: "from-[#0077B5] to-[#005885]"
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/sacrastic_shubham/",
    color: "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:text-white",
    bgGradient: "from-[#833AB4] via-[#FD1D1D] to-[#F77737]"
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/skg.kumar.7737/",
    color: "hover:bg-[#1877F2] hover:text-white",
    bgGradient: "from-[#1877F2] to-[#0d5fc7]"
  },
];

/* -------------------- FLOATING DECORATIVE ELEMENTS -------------------- */
const FloatingElement = ({ delay, duration, className }) => (
  <motion.div
    className={`absolute rounded-full ${className}`}
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

/* -------------------- SOCIAL ICON COMPONENT -------------------- */
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
        transition-all duration-300 ease-out
        ${social.color}
      `}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 200
      }}
      whileHover={{ 
        scale: 1.15, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={social.name}
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-current transition-colors duration-300" />
      
      {/* Tooltip - Positioned better to avoid overlap */}
      <motion.span
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 
                   px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 
                   text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 
                   transition-opacity duration-300 whitespace-nowrap pointer-events-none
                   shadow-lg z-50"
      >
        {social.name}
        {/* Tooltip Arrow */}
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 
                        bg-gray-900 dark:bg-white rotate-45"></span>
      </motion.span>

      {/* Glow effect on hover */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${social.bgGradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`} />
    </motion.a>
  );
};

/* -------------------- STATUS BADGE -------------------- */
const StatusBadge = () => (
  <motion.div
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
               bg-green-500/10 border border-green-500/30 
               text-green-600 dark:text-green-400"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5, duration: 0.5 }}
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
  const skills = ["React", "Next.js", "Tailwind CSS", "Node.js", "Firebase"];
  
  return (
    <motion.div 
      className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start mt-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      {skills.map((skill, index) => (
        <motion.span
          key={skill}
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium 
                     bg-gradient-to-r from-[#e16928]/10 to-yellow-400/10 
                     border border-[#e16928]/30 dark:border-yellow-400/30
                     text-[#e16928] dark:text-yellow-400 
                     rounded-full backdrop-blur-sm"
          style={{ fontFamily: "'Inter', sans-serif" }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          {skill}
        </motion.span>
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
        "service_r7zsx5o",
        "template_3qknvw3",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message || "Requesting resume download",
          site: "my-portfolio",
        },
        "CXfCaFkoekA1FCLDh"
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
                 transition-all duration-700"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <AnimatedPlanetStarBackground />
      
      {/* Decorative floating elements */}
      {!prefersReducedMotion && (
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
            className="w-32 h-32 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 blur-2xl top-1/3 right-1/4" 
          />
        </>
      )}

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* Grid layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* LEFT SIDE - Image with enhanced design */}
          <motion.div
            className="flex justify-center lg:justify-start order-1 lg:order-1"
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                className="absolute -inset-4 sm:-inset-6 lg:-inset-8 rounded-full 
                           bg-gradient-to-r from-[#e16928] via-yellow-400 to-sky-400 
                           opacity-20 blur-2xl"
                animate={prefersReducedMotion ? {} : {
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.35, 0.2],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Rotating border */}
              <motion.div
                className="absolute -inset-2 sm:-inset-3 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #e16928, #fbbf24, #38bdf8, #c084fc, #e16928)",
                }}
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />

              {/* Image container */}
              <motion.div
                className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96"
                animate={prefersReducedMotion ? { y: 0 } : { y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Inner gradient border */}
                <div className="absolute inset-1 sm:inset-2 rounded-full p-[3px] sm:p-[4px] 
                               bg-gradient-to-br from-[#e16928] via-yellow-400 to-sky-400">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-1">
                    <img
                      src="https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/GithubProfile.jpeg"
                      alt="Shubham Das Goswami"
                      className="rounded-full w-full h-full object-cover 
                                 shadow-2xl shadow-[#e16928]/20"
                      loading="eager"
                    />
                  </div>
                </div>

                {/* Decorative sparkle element */}
                <motion.div
                  className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-12 sm:h-12 
                             bg-gradient-to-r from-[#e16928] to-yellow-400 rounded-full 
                             flex items-center justify-center shadow-lg"
                  animate={prefersReducedMotion ? {} : { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </motion.div>

              </motion.div>

              {/* Social Links - Right side (GitHub & LinkedIn) with increased gap */}
              <div className="hidden lg:flex absolute -right-24 xl:-right-28 top-1/2 -translate-y-1/2 
                              flex-col gap-6 xl:gap-8">
                {socialLinks.slice(0, 2).map((social, index) => (
                  <SocialIcon key={social.name} social={social} index={index} />
                ))}
              </div>

              {/* Social Links - Left side (Instagram & Facebook) with increased gap */}
              <div className="hidden lg:flex absolute -left-24 xl:-left-28 top-1/2 -translate-y-1/2 
                              flex-col gap-6 xl:gap-8">
                {socialLinks.slice(2, 4).map((social, index) => (
                  <SocialIcon key={social.name} social={social} index={index + 2} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Text content */}
          <div className="text-center lg:text-left order-2 lg:order-2 space-y-4 sm:space-y-6">
            
            {/* Status Badge */}
            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <StatusBadge />
            </motion.div>

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
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

            {/* Name with typing effect - Single line */}
      <motion.div 
  className="mt-1 overflow-visible"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.2 }}
>
  <TypingEffect
    text={"Shubham\u00A0Das\u00A0Goswami"}   // <-- FIXED SPACES
    duration={1.8}
    startDelay={0.15}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              A passionate Web Developer crafting{" "}
              <span className="relative inline-block">
                <span className="text-yellow-500 font-bold">modern</span>
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                />
              </span>{" "}
              and{" "}
              <span className="relative inline-block">
                <span className="text-[#e16928] font-bold">animated</span>
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#e16928]"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1 }}
                />
              </span>{" "}
              digital experiences.
            </motion.p>

            {/* Location */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-2 
                         text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                Based in India
              </span>
            </motion.div>

            {/* Skill Tags - Centered on all screen sizes except lg+ */}
            <SkillTags />

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 
                         justify-center lg:justify-start items-center pt-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Download Resume Button */}
              <motion.button
                onClick={() => setShowPopup(true)}
                className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 
                           bg-gradient-to-r from-[#e16928] via-orange-500 to-yellow-500
                           text-white font-semibold text-sm sm:text-base
                           rounded-xl shadow-lg shadow-[#e16928]/30
                           overflow-hidden transition-all duration-300"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(225, 105, 40, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
                  Download Resume
                </span>
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
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
                           overflow-hidden transition-all duration-300
                           hover:text-white dark:hover:text-black"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 
                                          group-hover:rotate-12 transition-transform duration-300" />
                  View Projects
                </span>
                {/* Background fill on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#e16928] to-yellow-400 
                             dark:from-yellow-400 dark:to-orange-400"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "center" }}
                />
              </motion.button>
            </motion.div>

            {/* Social Links - Mobile & Tablet (Centered) */}
            <motion.div
              className="lg:hidden flex justify-center gap-4 sm:gap-5 pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {socialLinks.map((social, index) => (
                <SocialIcon key={social.name} social={social} index={index} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 
                     flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-[#e16928] dark:text-yellow-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* Resume Request Popup */}
      <AnimatePresence>
        {showPopup && (
          <ResumeRequestPopup onClose={() => setShowPopup(false)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;