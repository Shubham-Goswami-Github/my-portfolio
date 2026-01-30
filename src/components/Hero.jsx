import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useContext, useEffect, useState, useRef } from "react";
import { 
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Download,
  ArrowRight,
  MapPin,
  ChevronDown,
  Code2,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { db, serverTimestamp } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { LenisContext } from "../LenisProvider";
import ResumeRequestPopup from "./ResumeRequestPopup";

/* -------------------- TYPING EFFECT WITH CURSOR (FIXED) -------------------- */
const TypingEffect = ({ text, duration = 2, className, startDelay = 0, onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
  const [currentText, setCurrentText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let controls;
    let timeoutId;
    count.set(0);
    setIsComplete(false);

    if (shouldReduceMotion) {
      setCurrentText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    } else setCurrentText("");

    timeoutId = setTimeout(() => {
      controls = animate(count, text.length, {
        type: "tween",
        duration,
        ease: "easeOut",
        onComplete: () => {
          setIsComplete(true);
          onComplete?.();
        }
      });
    }, startDelay * 1000);

    return () => {
      controls?.stop();
      clearTimeout(timeoutId);
    };
  }, [text, duration, startDelay, shouldReduceMotion, count, onComplete]);

  useEffect(() => {
    const unsubscribe = displayText.on("change", (latest) =>
      setCurrentText(latest)
    );
    return () => unsubscribe();
  }, [displayText]);

  return (
    <span className={`${className || ""} inline`} aria-label={text}>
      {currentText}
      {/* FIXED: Using CSS animation for cursor blink instead of Framer Motion */}
      <span 
        className="inline-block w-[2px] sm:w-[3px] h-[0.85em] bg-amber-500 ml-1 align-middle cursor-blink"
        style={{
          animation: isComplete 
            ? 'cursorFadeOut 0.5s ease-out 2s forwards' 
            : 'cursorBlink 0.6s infinite'
        }}
      />
    </span>
  );
};

/* -------------------- INJECT PREMIUM STYLES -------------------- */
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('hero-premium-styles');
  if (!existingStyle) {
    const style = document.createElement("style");
    style.id = 'hero-premium-styles';
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Outfit:wght@100;200;300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      
      :root {
        --color-gold: #C9A86C;
        --color-gold-light: #E8D5B5;
        --color-gold-dark: #A68B4B;
        --color-black: #0A0A0A;
        --color-dark: #111111;
        --color-gray: #1A1A1A;
      }
      
      /* CURSOR BLINK ANIMATIONS - Using CSS instead of Framer Motion */
      @keyframes cursorBlink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      
      @keyframes cursorFadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }
      
      .cursor-blink {
        will-change: opacity;
      }
      
      .font-display {
        font-family: 'Outfit', 'Inter', sans-serif;
      }
      
      .font-body {
        font-family: 'Inter', 'Space Grotesk', sans-serif;
      }
      
      .text-gold {
        color: var(--color-gold);
      }
      
      .text-gold-gradient {
        background: linear-gradient(135deg, #D4AF37 0%, #C9A86C 30%, #E8D5B5 50%, #C9A86C 70%, #B8956A 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .bg-pure-black {
        background-color: #000000;
      }
      
      .photo-blend-left {
        mask-image: linear-gradient(to right, 
          black 0%,
          black 60%,
          rgba(0,0,0,0.8) 75%,
          rgba(0,0,0,0.4) 88%,
          transparent 100%
        );
        -webkit-mask-image: linear-gradient(to right, 
          black 0%,
          black 60%,
          rgba(0,0,0,0.8) 75%,
          rgba(0,0,0,0.4) 88%,
          transparent 100%
        );
      }
      
      .photo-blend-mobile {
        mask-image: linear-gradient(to bottom, 
          black 0%,
          black 50%,
          rgba(0,0,0,0.7) 75%,
          transparent 100%
        );
        -webkit-mask-image: linear-gradient(to bottom, 
          black 0%,
          black 50%,
          rgba(0,0,0,0.7) 75%,
          transparent 100%
        );
      }
      
      .btn-gold {
        background: linear-gradient(135deg, #C9A86C 0%, #D4AF37 50%, #C9A86C 100%);
        box-shadow: 0 4px 20px rgba(201, 168, 108, 0.25),
                    0 0 40px rgba(201, 168, 108, 0.1);
      }
      
      .btn-gold:hover {
        background: linear-gradient(135deg, #D4AF37 0%, #E8D5B5 50%, #D4AF37 100%);
        box-shadow: 0 6px 30px rgba(201, 168, 108, 0.35),
                    0 0 60px rgba(201, 168, 108, 0.15);
      }
      
      .btn-outline-gold {
        border: 1px solid rgba(201, 168, 108, 0.4);
        color: var(--color-gold);
      }
      
      .btn-outline-gold:hover {
        border-color: var(--color-gold);
        background: rgba(201, 168, 108, 0.08);
        box-shadow: 0 0 20px rgba(201, 168, 108, 0.15);
      }
      
      .social-link {
        color: #555555;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .social-link:hover {
        color: var(--color-gold);
        transform: translateY(-3px);
      }
      
      .noise-texture {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        opacity: 0.015;
      }
      
      .letter-spacing-tight {
        letter-spacing: -0.02em;
      }
      
      .letter-spacing-wide {
        letter-spacing: 0.2em;
      }
      
      .photo-grayscale {
        filter: grayscale(100%) contrast(1.15) brightness(0.9);
      }
      
      .glow-line {
        background: linear-gradient(90deg, transparent, rgba(201, 168, 108, 0.6), transparent);
      }
      
      .accent-dot {
        width: 6px;
        height: 6px;
        background: var(--color-gold);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--color-gold);
      }
      
      @keyframes pulse-slow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      .animate-pulse-slow {
        animation: pulse-slow 3s ease-in-out infinite;
      }
      
      @keyframes float-subtle {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      
      .animate-float {
        animation: float-subtle 6s ease-in-out infinite;
      }
      
      .scroll-indicator {
        animation: scroll-bounce 2s ease-in-out infinite;
      }
      
      @keyframes scroll-bounce {
        0%, 100% { transform: translateY(0); opacity: 1; }
        50% { transform: translateY(8px); opacity: 0.6; }
      }
      
      /* Responsive name sizing - SINGLE LINE */
      .name-text {
        font-size: clamp(1.5rem, 5vw, 4.5rem);
        white-space: nowrap;
      }
      
      @media (max-width: 480px) {
        .name-text {
          font-size: clamp(1.25rem, 6.5vw, 2rem);
        }
      }
      
      @media (min-width: 481px) and (max-width: 768px) {
        .name-text {
          font-size: clamp(1.5rem, 5vw, 2.5rem);
        }
      }
      
      @media (min-width: 769px) and (max-width: 1024px) {
        .name-text {
          font-size: clamp(2rem, 4vw, 3rem);
        }
      }
      
      @media (min-width: 1025px) and (max-width: 1280px) {
        .name-text {
          font-size: clamp(2.5rem, 3.5vw, 3.5rem);
        }
      }
      
      @media (min-width: 1281px) and (max-width: 1536px) {
        .name-text {
          font-size: clamp(3rem, 3.2vw, 4rem);
        }
      }
      
      @media (min-width: 1537px) {
        .name-text {
          font-size: 4.5rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

/* -------------------- SOCIAL LINKS -------------------- */
const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com/Shubham-Goswami-Github" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/shubham-das-goswami-sg8990/" },
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/sacrastic_shubham/" },
  { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/skg.kumar.7737/" },
];

/* -------------------- TECH STACK -------------------- */
const techStack = ["React", "Next.js", "Tailwind CSS", "Node.js", "Firebase"];

/* -------------------- SOCIAL ICON COMPONENT -------------------- */
const SocialIcon = ({ social, index }) => {
  const Icon = social.icon;
  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="social-link p-2"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={social.name}
    >
      <Icon className="w-5 h-5 sm:w-[22px] sm:h-[22px]" strokeWidth={1.5} />
    </motion.a>
  );
};

/* -------------------- AVAILABLE BADGE -------------------- */
const AvailableBadge = () => (
  <motion.div
    className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full 
               bg-emerald-500/10 border border-emerald-500/20"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.8, duration: 0.4 }}
  >
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
    </span>
    <span className="text-emerald-400 text-[10px] sm:text-xs font-medium tracking-wide uppercase">
      Available for work
    </span>
  </motion.div>
);

/* -------------------- MAIN HERO SECTION -------------------- */
const Hero = () => {
  const lenisRef = useContext(LenisContext);
  const prefersReducedMotion = useReducedMotion();
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(window.scrollY, { immediate: true });
    }
  }, [lenisRef]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const scrollToProjects = () => {
    const proj = document.getElementById("projects");
    if (proj) proj.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden bg-pure-black"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Pure Black Background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 noise-texture pointer-events-none z-[1]" />
      
      {/* Subtle Ambient Glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-amber-900/[0.03] rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-neutral-800/[0.05] rounded-full blur-[150px] pointer-events-none" />

      {/* ============ DESKTOP LAYOUT ============ */}
      <div className="hidden lg:flex min-h-screen relative z-10">
        
        {/* LEFT SIDE - Photo (45% width) */}
        <motion.div
          className="w-[45%] relative flex items-center justify-start overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: imageLoaded ? 1 : 0, x: imageLoaded ? 0 : -50 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Photo Container - Full Height */}
          <div className="absolute inset-0 photo-blend-left">
            <img
              src="https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/smphoto.jpeg"
              alt="Shubham Das Goswami"
              className="w-full h-full object-cover object-center photo-grayscale"
              loading="eager"
              onLoad={() => setImageLoaded(true)}
            />
            {/* Gradient overlays for smooth blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
          </div>

          {/* Vertical accent line */}
          <motion.div 
            className="absolute right-0 top-[15%] bottom-[15%] w-px bg-gradient-to-b from-transparent via-amber-600/30 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
        </motion.div>

        {/* RIGHT SIDE - Content (55% width) */}
        <motion.div
          className="w-[55%] flex items-center pl-12 xl:pl-20 2xl:pl-28 pr-8 xl:pr-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-2xl xl:max-w-3xl">
            
            {/* Available Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <AvailableBadge />
            </motion.div>

            {/* Intro Line */}
            <motion.div variants={itemVariants} className="mb-3">
              <div className="flex items-center gap-3">
                <span className="accent-dot animate-pulse-slow" />
                <span className="text-neutral-500 text-xs sm:text-sm font-light tracking-widest uppercase font-body letter-spacing-wide">
                  Hello, I'm
                </span>
              </div>
            </motion.div>

            {/* Name - Single Line */}
            <motion.div variants={itemVariants} className="mb-5">
              <h1 className="name-text font-display font-bold text-white leading-none letter-spacing-tight">
                <TypingEffect
                  text="Shubham  Das  Goswami"
                  duration={1.8}
                  startDelay={0.4}
                  className="text-white font-bold"
                />
              </h1>
            </motion.div>

            {/* Role with accent */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="flex items-center gap-4">
                <div className="h-px w-10 xl:w-14 glow-line" />
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 xl:w-5 xl:h-5 text-amber-500/80" strokeWidth={1.5} />
                  <span className="text-base xl:text-lg 2xl:text-xl text-gold font-medium tracking-wide font-display">
                    Web Developer & UI Engineer
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-neutral-400 text-base xl:text-lg 2xl:text-xl font-light leading-relaxed mb-6 max-w-lg xl:max-w-xl font-body"
            >
              I build <span className="text-white font-medium">modern</span>, <span className="text-amber-500/90 font-medium">animated</span>, and <span className="text-white font-medium">scalable</span> digital experiences that leave lasting impressions.
            </motion.p>

            {/* Location */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 text-neutral-500 mb-8"
            >
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm font-light tracking-wide font-body">Based in India</span>
            </motion.div>

            {/* Tech Stack */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 xl:gap-3 mb-10">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-3 xl:px-4 py-1.5 xl:py-2 text-[10px] xl:text-xs font-medium tracking-wider uppercase
                             text-neutral-400 border border-neutral-800/80 rounded-full
                             bg-neutral-900/30 hover:border-amber-500/40 hover:text-amber-500/90
                             transition-all duration-300 cursor-default font-body"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + index * 0.08, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
              {/* Primary - View Projects */}
              <motion.button
                onClick={scrollToProjects}
                className="group relative px-6 xl:px-8 py-3 xl:py-4 btn-gold
                           text-black font-semibold text-xs xl:text-sm tracking-wider uppercase
                           rounded-lg overflow-hidden transition-all duration-300 font-display"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-2 xl:gap-3">
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>

              {/* Secondary - Download Resume */}
              <motion.button
                onClick={() => setShowPopup(true)}
                className="group px-6 xl:px-8 py-3 xl:py-4 btn-outline-gold
                           font-medium text-xs xl:text-sm tracking-wider uppercase
                           rounded-lg transition-all duration-300 font-display"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="flex items-center gap-2 xl:gap-3">
                  <Download className="w-4 h-4" />
                  Download Resume
                </span>
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <span className="text-[10px] xl:text-xs text-neutral-600 uppercase tracking-widest font-body">
                Connect
              </span>
              <div className="h-px w-6 xl:w-8 bg-neutral-800" />
              <div className="flex items-center gap-1">
                {socialLinks.map((social, index) => (
                  <SocialIcon key={social.name} social={social} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ============ MOBILE/TABLET LAYOUT ============ */}
      <div className="lg:hidden min-h-screen flex flex-col relative z-10">
        
        {/* Photo Section - Top */}
        <motion.div
          className="relative h-[45vh] sm:h-[50vh] md:h-[55vh] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0 photo-blend-mobile">
            <img
              src="https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/smphoto.jpeg"
              alt="Shubham Das Goswami"
              className="w-full h-full object-cover object-top photo-grayscale"
              loading="eager"
              onLoad={() => setImageLoaded(true)}
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
          </div>
        </motion.div>

        {/* Content Section - Bottom */}
        <motion.div
          className="flex-1 px-5 sm:px-8 md:px-12 py-6 sm:py-8 flex flex-col justify-center bg-black relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Connecting gradient */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/50 to-transparent" />
          
          {/* Available Badge */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-5">
            <AvailableBadge />
          </motion.div>

          {/* Intro */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-2">
            <span className="accent-dot animate-pulse-slow" style={{ width: '5px', height: '5px' }} />
            <span className="text-neutral-500 text-[10px] sm:text-xs font-light tracking-widest uppercase font-body">
              Hello, I'm
            </span>
          </motion.div>

          {/* Name - Single Line */}
          <motion.h1
            variants={itemVariants}
            className="name-text font-display font-bold text-white leading-none letter-spacing-tight mb-3 sm:mb-4"
          >
            Shubham Das Goswami
          </motion.h1>

          {/* Role */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <div className="h-px w-6 sm:w-8 glow-line" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500/80" strokeWidth={1.5} />
              <span className="text-xs sm:text-sm md:text-base text-gold font-medium tracking-wide font-display">
                Web Developer & UI Engineer
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-neutral-400 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-5 sm:mb-6 font-body"
          >
            I build <span className="text-white font-medium">modern</span>, <span className="text-amber-500/90 font-medium">animated</span>, and <span className="text-white font-medium">scalable</span> digital experiences.
          </motion.p>

          {/* Location */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-1.5 sm:gap-2 text-neutral-500 mb-5 sm:mb-6"
          >
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
            <span className="text-[10px] sm:text-xs font-light tracking-wide font-body">Based in India</span>
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-medium tracking-wider uppercase
                           text-neutral-400 border border-neutral-800/80 rounded-full
                           bg-neutral-900/30 font-body"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mb-6 sm:mb-8">
            <motion.button
              onClick={scrollToProjects}
              className="flex-1 sm:flex-none px-5 sm:px-6 py-3 sm:py-3.5 btn-gold
                         text-black font-semibold text-[10px] sm:text-xs tracking-wider uppercase
                         rounded-lg flex items-center justify-center gap-2 font-display"
              whileTap={{ scale: 0.97 }}
            >
              View Projects
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.button>

            <motion.button
              onClick={() => setShowPopup(true)}
              className="flex-1 sm:flex-none px-5 sm:px-6 py-3 sm:py-3.5 btn-outline-gold
                         font-medium text-[10px] sm:text-xs tracking-wider uppercase
                         rounded-lg flex items-center justify-center gap-2 font-display"
              whileTap={{ scale: 0.97 }}
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Download Resume
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center sm:justify-start gap-1"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link p-2.5"
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  <Icon className="w-[18px] h-[18px] sm:w-5 sm:h-5" strokeWidth={1.5} />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* ============ SCROLL INDICATOR - Desktop ============ */}
      <motion.div
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="text-neutral-600 text-[10px] uppercase tracking-[0.25em] font-body">
          Scroll to explore
        </span>
        <motion.div
          className="scroll-indicator cursor-pointer"
          onClick={scrollToNext}
          whileHover={{ scale: 1.1 }}
        >
          <ChevronDown className="w-5 h-5 text-amber-500/60" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* ============ CORNER ACCENTS - Desktop ============ */}
      <motion.div 
        className="hidden lg:block absolute top-8 left-8 w-12 h-12 xl:w-16 xl:h-16 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-neutral-700/50 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-neutral-700/50 to-transparent" />
      </motion.div>
      
      <motion.div 
        className="hidden lg:block absolute bottom-8 right-8 w-12 h-12 xl:w-16 xl:h-16 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-neutral-700/50 to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-neutral-700/50 to-transparent" />
      </motion.div>

      {/* ============ VERTICAL TEXT - Desktop Only ============ */}
      <motion.div
        className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-30"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-neutral-700/50 to-transparent" />
        <span 
          className="text-neutral-600 text-[10px] uppercase tracking-[0.3em] font-body"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Portfolio 2026
        </span>
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-neutral-700/50 to-transparent" />
      </motion.div>

      {/* ============ RESUME POPUP ============ */}
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