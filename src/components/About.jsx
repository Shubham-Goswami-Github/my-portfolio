import { motion, useReducedMotion } from "framer-motion";
import AnimatedPlanetStarBackground from "./AnimatedPlanetStarBackground";
import { useContext, useEffect, useState, memo, useMemo, useCallback } from "react";
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
  Zap,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { LenisContext } from "../LenisProvider";

/* -------------------- OPTIMIZED CSS STYLES -------------------- */
const aboutOptimizedStyles = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap');

@keyframes shimmer-about {
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(1.05); }
}

@keyframes rotate-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes ping-slow {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink {
  50% { border-color: transparent }
}

.gpu-layer {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
}

.shimmer-text {
  background-image: linear-gradient(90deg, #e16928, #fbbf24, #f59e0b, #e16928);
  background-size: 200% 100%;
  animation: shimmer-about 4s infinite linear;
  -webkit-background-clip: text;
  background-clip: text;
}

.card-hover-glow {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.card-hover-glow:hover {
  box-shadow: 0 20px 40px rgba(225, 105, 40, 0.15);
  transform: translateY(-8px);
}

.progress-line {
  transition: width 0.5s ease;
}

.group:hover .progress-line {
  width: 100%;
}
`;

// Inject styles once
if (typeof document !== 'undefined' && !document.getElementById('about-optimized-styles')) {
  const styleSheet = document.createElement("style");
  styleSheet.id = 'about-optimized-styles';
  styleSheet.innerHTML = aboutOptimizedStyles;
  document.head.appendChild(styleSheet);
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

const skills = ["React", "Next.js", "Node.js", "Tailwind CSS", "Firebase", "MongoDB"];

const typingTexts = [
  "Hey, Fellas! Myself Shubham 👋",
  "I am a Passionate Web Developer 💻",
  "Creative UI/UX Developer 🎨",
  "Problem Solver & Tech Enthusiast 🚀",
];

/* -------------------- SIMPLIFIED FLOATING BACKGROUND (CSS Only) -------------------- */
const FloatingBackground = memo(() => (
  <>
    <div 
      className="absolute w-64 h-64 rounded-full top-20 -left-32 gpu-layer"
      style={{
        background: "linear-gradient(to right, rgba(225, 105, 40, 0.15), rgba(251, 191, 36, 0.15))",
        filter: "blur(50px)",
        animation: "pulse-slow 8s ease-in-out infinite",
      }}
    />
    <div 
      className="absolute w-72 h-72 rounded-full bottom-20 -right-36 gpu-layer"
      style={{
        background: "linear-gradient(to right, rgba(56, 189, 248, 0.1), rgba(168, 85, 247, 0.1))",
        filter: "blur(50px)",
        animation: "pulse-slow 10s ease-in-out infinite 2s",
      }}
    />
    <div 
      className="absolute w-40 h-40 rounded-full top-1/3 right-1/4 gpu-layer"
      style={{
        background: "linear-gradient(to right, rgba(251, 191, 36, 0.12), rgba(249, 115, 22, 0.12))",
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
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#e16928] opacity-75"
            style={{ animation: "ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#e16928]" />
    </span>
    {Icon && <Icon className="w-4 h-4" />}
    <span className="text-sm font-medium">{text}</span>
  </div>
));

/* -------------------- SIMPLE TYPING EFFECT (No Library) -------------------- */
const SimpleTypingEffect = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = typingTexts[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    }, isDeleting ? 30 : 80);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold
                   shimmer-text text-transparent bg-clip-text
                   font-['Poppins',sans-serif] min-h-[2.5rem] sm:min-h-[3rem]">
      {displayText}
      <span className="inline-block w-0.5 h-6 sm:h-8 bg-[#e16928] ml-1 animate-pulse" />
    </h3>
  );
});

/* -------------------- SKILL TAGS (Simplified) -------------------- */
const SkillTags = memo(({ skills }) => (
  <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start mt-6">
    {skills.map((skill, index) => (
      <span
        key={skill}
        className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium 
                   bg-gradient-to-r from-[#e16928]/10 to-yellow-400/10 
                   border border-[#e16928]/30 dark:border-yellow-400/30
                   text-[#e16928] dark:text-yellow-400 
                   rounded-full transition-transform duration-200
                   hover:scale-105 cursor-default"
        style={{ 
          fontFamily: "'Inter', sans-serif",
          animationDelay: `${index * 0.1}s`
        }}
      >
        {skill}
      </span>
    ))}
  </div>
));

/* -------------------- EDUCATION CARD (Optimized) -------------------- */
const EducationCard = memo(({ edu, idx }) => {
  const Icon = edu.icon;

  return (
    <article
      className="group relative flex flex-col h-full
                 bg-white/70 dark:bg-white/[0.04] backdrop-blur-lg
                 rounded-3xl overflow-hidden
                 border border-white/40 dark:border-white/10
                 shadow-lg dark:shadow-xl
                 card-hover-glow gpu-layer"
      role="article"
      aria-label={edu.degree}
      tabIndex={0}
    >
      {/* Image Section */}
      <div className="relative w-full h-36 sm:h-40 md:h-44 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        
        {/* Image - Simple scale on hover with CSS */}
        <img
          src={edu.img}
          alt={edu.degree}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center
                     transition-transform duration-500 ease-out
                     group-hover:scale-110"
        />

        {/* Icon badge */}
        <div
          className={`absolute top-4 right-4 z-20 p-2.5 sm:p-3 rounded-xl 
                     bg-gradient-to-br ${edu.color} shadow-lg
                     transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>

        {/* Year badge */}
        <div className="absolute bottom-4 left-4 z-20">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full 
                         bg-black/40 backdrop-blur-sm border border-white/20">
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
        <h3 className="flex items-start gap-3 text-lg sm:text-xl font-bold mb-3
                       text-gray-900 dark:text-white font-['Montserrat',sans-serif]">
          <FaGraduationCap className="text-[#e16928] flex-shrink-0 mt-1 text-xl sm:text-2xl" />
          <span className="leading-tight shimmer-text text-transparent bg-clip-text">
            {edu.degree}
          </span>
        </h3>

        {/* School */}
        <p className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3 
                     font-['Inter',sans-serif] leading-relaxed">
          <FaUniversity className="text-[#e16928] flex-shrink-0 mt-0.5 text-base" />
          <span>{edu.school}</span>
        </p>

        {/* Marks Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 
                       bg-gradient-to-r from-yellow-400/20 to-orange-400/20 
                       dark:from-yellow-400/10 dark:to-orange-400/10
                       border border-yellow-400/40 dark:border-yellow-400/30
                       rounded-full w-fit transition-transform duration-200 hover:scale-105">
          <FaStar className="text-yellow-500 text-sm" />
          <span className="font-bold text-sm text-gray-900 dark:text-yellow-300 font-['Poppins',sans-serif]">
            Score: {edu.marks}
          </span>
          <FaAward className="text-yellow-500 text-sm" />
        </div>

        {/* Highlights */}
        <ul className="space-y-2.5 flex-1 mb-4">
          {edu.highlights.map((highlight, j) => (
            <li
              key={j}
              className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 
                         leading-relaxed font-['Inter',sans-serif]
                         group-hover:text-gray-800 dark:group-hover:text-gray-200 
                         transition-colors duration-300"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full 
                              bg-gradient-to-r from-[#e16928] to-yellow-400 flex-shrink-0 mt-0.5">
                <ChevronRight className="w-3 h-3 text-white" />
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 
                       border-t border-gray-200/50 dark:border-gray-700/50">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 
                         group-hover:text-[#e16928] transition-colors duration-300
                         font-['Poppins',sans-serif] cursor-pointer">
            <ExternalLink className="w-4 h-4" />
            View Details
          </span>
          <FaLaptopCode
            className="text-xl text-gray-300 dark:text-gray-600 
                       group-hover:text-[#e16928] transition-colors duration-300"
          />
        </div>

        {/* Bottom progress line - CSS only */}
        <span className="absolute bottom-0 left-0 h-1 w-0 progress-line
                        bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400 rounded-b-3xl" />
      </div>
    </article>
  );
});

/* -------------------- PROFILE CIRCLE (Optimized with CSS) -------------------- */
const ProfileCircle = memo(() => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative flex-shrink-0 gpu-layer">
      {/* Outer glow - CSS animation */}
      <div
        className="absolute -inset-4 sm:-inset-6 rounded-full"
        style={{
          background: "linear-gradient(to right, rgba(225, 105, 40, 0.2), rgba(251, 191, 36, 0.2), rgba(56, 189, 248, 0.2))",
          filter: "blur(25px)",
          animation: shouldReduceMotion ? "none" : "pulse-slow 4s ease-in-out infinite",
        }}
      />

      {/* Rotating border - CSS animation */}
      <div
        className="absolute -inset-2 sm:-inset-3 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, #e16928, #fbbf24, #38bdf8, #c084fc, #e16928)",
          animation: shouldReduceMotion ? "none" : "rotate-slow 15s linear infinite",
        }}
      />

      {/* Main container with floating animation - CSS */}
      <div
        className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72"
        style={{
          animation: shouldReduceMotion ? "none" : "float-slow 5s ease-in-out infinite",
        }}
      >
        {/* Inner gradient border */}
        <div className="absolute inset-1 sm:inset-2 rounded-full p-[3px] sm:p-[4px] 
                       bg-gradient-to-br from-[#e16928] via-yellow-400 to-sky-400">
          <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-1 overflow-hidden">
            <img
              src="https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/portfolio-background-pic.png"
              alt="Shubham Das Goswami"
              className="rounded-full w-full h-full object-cover scale-105 shadow-xl"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        {/* Sparkle - Top Right (CSS animation) */}
        <div
          className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 
                     bg-gradient-to-r from-[#e16928] to-yellow-400 rounded-full 
                     flex items-center justify-center shadow-lg"
          style={{
            animation: shouldReduceMotion ? "none" : "pulse-slow 3s ease-in-out infinite",
          }}
        >
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>

        {/* Code icon - Bottom Left */}
        <div
          className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-8 h-8 sm:w-10 sm:h-10 
                     bg-gradient-to-r from-sky-400 to-purple-500 rounded-full 
                     flex items-center justify-center shadow-lg"
          style={{
            animation: shouldReduceMotion ? "none" : "pulse-slow 2.5s ease-in-out infinite 0.5s",
          }}
        >
          <FaCode className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>

        {/* Rocket icon - Top Left */}
        <div
          className="absolute top-4 -left-4 sm:-left-6 w-8 h-8 sm:w-9 sm:h-9 
                     bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full 
                     flex items-center justify-center shadow-lg"
          style={{
            animation: shouldReduceMotion ? "none" : "float-slow 4s ease-in-out infinite 1s",
          }}
        >
          <FaRocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </div>
      </div>
    </div>
  );
});

/* -------------------- MAIN ABOUT SECTION -------------------- */
const About = () => {
  const lenisRef = useContext(LenisContext);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(window.scrollY, { immediate: true });
    }
  }, [lenisRef]);

  // Simplified animation variants
  const fadeInUp = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.4 }
  }), []);

  return (
    <section
      id="about"
      className="relative flex flex-col justify-center items-center
                 min-h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24
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
          <div className="flex justify-center mb-4">
            <SectionBadge text="Get to know me" icon={Sparkles} />
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold 
                       tracking-tight mb-4 font-['Montserrat',sans-serif]"
          >
            <span className="shimmer-text text-transparent bg-clip-text">
              About Me
            </span>
          </h2>

          <p
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 
                       max-w-2xl mx-auto leading-relaxed font-['Inter',sans-serif]"
          >
            Crafting digital experiences with a blend of engineering, design, and real-world learning.
          </p>

          <div
            className="mt-6 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400"
          />
        </motion.div>

        {/* Intro Card */}
        <motion.div
          className="relative mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="relative rounded-3xl overflow-hidden
                       bg-white/70 dark:bg-white/[0.03] backdrop-blur-lg 
                       border border-white/50 dark:border-white/10
                       shadow-xl dark:shadow-2xl
                       px-6 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-12 lg:py-16"
          >
            {/* Top gradient line */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#e16928] to-transparent opacity-60" />

            {/* Grid Layout */}
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16">
              
              {/* Left - Text Content */}
              <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">
                
                {/* Simple Typing Animation - No library */}
                <SimpleTypingEffect />

                {/* Description paragraphs */}
                {[
                  "I build clean, modern and responsive web applications that focus on performance and user experience. My passion lies in creating seamless digital experiences that users love.",
                  "I love exploring frontend ecosystems, experimenting with design systems, and bringing UI ideas to life with smooth interactions and animations.",
                  "When I'm not coding, I enjoy collaborating on interesting projects, contributing to open source, and learning how to make the web more dynamic and meaningful.",
                ].map((text, i) => (
                  <p
                    key={i}
                    className="text-base sm:text-lg text-gray-700 dark:text-gray-300 
                               leading-relaxed font-['Inter',sans-serif]"
                  >
                    {text}
                  </p>
                ))}

                {/* Location */}
                <div className="flex items-center justify-center lg:justify-start gap-2 
                               text-gray-500 dark:text-gray-400 pt-2">
                  <MapPin className="w-5 h-5 text-[#e16928]" />
                  <span className="text-sm sm:text-base font-medium font-['Inter',sans-serif]">
                    Based in Ranchi, India
                  </span>
                </div>

                {/* Skill Tags */}
                <SkillTags skills={skills} />
              </div>

              {/* Right - Profile Image */}
              <ProfileCircle />
            </div>

            {/* Bottom gradient line */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-40" />
          </div>
        </motion.div>

        {/* Education Section Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          {...fadeInUp}
        >
          <div className="flex justify-center mb-4">
            <SectionBadge text="Learning Path" icon={GraduationCap} />
          </div>

          <h3
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4
                       font-['Montserrat',sans-serif]"
          >
            <span className="shimmer-text text-transparent bg-clip-text">
              Educational Journey
            </span>
          </h3>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 
                       max-w-xl mx-auto font-['Inter',sans-serif]">
            A path shaped by consistent learning, hands-on projects and real-world problem solving.
          </p>

          <div className="mt-6 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400" />
        </motion.div>

        {/* Education Grid - Staggered loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <EducationCard edu={edu} idx={idx} />
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-16 sm:mt-20">
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

export default About;