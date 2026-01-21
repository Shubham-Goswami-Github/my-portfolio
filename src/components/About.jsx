import { motion, useReducedMotion } from "framer-motion";
import AnimatedPlanetStarBackground from "./AnimatedPlanetStarBackground";
import { TypeAnimation } from "react-type-animation";
import { useContext, useEffect} from "react";
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
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('about-optimized-styles');
  if (!existingStyle) {
    const style = document.createElement("style");
    style.id = 'about-optimized-styles';
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800;900&display=swap');

      .about-shimmer {
        background-image: linear-gradient(90deg, #e16928, #fbbf24, #f59e0b, #e16928);
        background-size: 200% 100%;
        animation: aboutShimmer 4s ease-in-out infinite;
        -webkit-background-clip: text;
        background-clip: text;
      }
      
      @keyframes aboutShimmer {
        0%, 100% { background-position: 0% 0%; }
        50% { background-position: 100% 0%; }
      }
      
      .about-float {
        animation: aboutFloat 5s ease-in-out infinite;
      }
      
      @keyframes aboutFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-12px); }
      }
      
      .about-rotate {
        animation: aboutRotate 10s linear infinite;
      }
      
      @keyframes aboutRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      .about-pulse {
        animation: aboutPulse 3s ease-in-out infinite;
      }
      
      @keyframes aboutPulse {
        0%, 100% { opacity: 0.15; transform: scale(1); }
        50% { opacity: 0.25; transform: scale(1.03); }
      }
      
      .about-glow {
        animation: aboutGlow 2s ease-in-out infinite;
      }
      
      @keyframes aboutGlow {
        0%, 100% { box-shadow: 0 0 20px rgba(225, 105, 40, 0.3); }
        50% { box-shadow: 0 0 30px rgba(225, 105, 40, 0.5); }
      }
      
      .card-hover-line {
        transition: width 0.5s ease-out;
      }
      
      .edu-card:hover .card-hover-line {
        width: 100%;
      }
    `;
    document.head.appendChild(style);
  }
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

/* -------------------- EDUCATION CARD (OPTIMIZED) -------------------- */
const EducationCard = ({ edu, idx }) => {
  const shouldReduceMotion = useReducedMotion();
  const Icon = edu.icon;

  return (
    <motion.article
      className="edu-card group relative flex flex-col h-full
                 bg-white/70 dark:bg-white/[0.04] backdrop-blur-lg
                 rounded-2xl overflow-hidden
                 border border-white/40 dark:border-white/10
                 shadow-lg hover:shadow-xl
                 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      whileHover={!shouldReduceMotion ? { y: -8, scale: 1.01 } : undefined}
      role="article"
      aria-label={edu.degree}
      tabIndex={0}
    >
      {/* Image Section */}
      <div className="relative w-full h-36 sm:h-40 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        
        {/* Image */}
        <img
          src={edu.img}
          alt={edu.degree}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center
                     group-hover:scale-105 transition-transform duration-500"
        />

        {/* Icon badge */}
        <div className={`absolute top-4 right-4 z-20 p-2.5 rounded-xl 
                        bg-gradient-to-br ${edu.color} shadow-lg
                        group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-5 h-5 text-white" />
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
        <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${edu.color} 
                        opacity-20 rounded-bl-full z-10`} />
      </div>

      {/* Content Section */}
      <div className="relative p-5 sm:p-6 flex-1 flex flex-col">
        {/* Degree Title */}
        <h3 className="flex items-start gap-3 text-lg sm:text-xl font-bold mb-3
                       text-gray-900 dark:text-white font-['Montserrat',sans-serif]">
          <FaGraduationCap className="text-[#e16928] flex-shrink-0 mt-1 text-xl" />
          <span className="leading-tight about-shimmer text-transparent bg-clip-text">
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
                       rounded-full w-fit group-hover:scale-105 transition-transform duration-300">
          <FaStar className="text-yellow-500 text-sm" />
          <span className="font-bold text-sm text-gray-900 dark:text-yellow-300 font-['Poppins',sans-serif]">
            Score: {edu.marks}
          </span>
          <FaAward className="text-yellow-500 text-sm" />
        </div>

        {/* Highlights */}
        <ul className="space-y-2 flex-1 mb-4">
          {edu.highlights.map((highlight, j) => (
            <li
              key={j}
              className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 
                         leading-relaxed font-['Inter',sans-serif]"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full 
                              bg-gradient-to-r from-[#e16928] to-yellow-400 flex-shrink-0 mt-0.5">
                <ChevronRight className="w-3 h-3 text-white" />
              </span>
              <span className="group-hover:text-gray-800 dark:group-hover:text-gray-200 
                             transition-colors duration-300">
                {highlight}
              </span>
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
          <FaLaptopCode className="text-xl text-gray-300 dark:text-gray-600 
                                  group-hover:text-[#e16928] transition-colors duration-300" />
        </div>

        {/* Bottom progress line */}
        <span className="card-hover-line absolute bottom-0 left-0 h-1 w-0
                        bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400 rounded-b-2xl" />
      </div>
    </motion.article>
  );
};

/* -------------------- PROFILE CIRCLE (OPTIMIZED) -------------------- */
const ProfileCircle = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative flex-shrink-0"
      initial={{ opacity: 0, scale: 0.9, x: 30 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Outer glow - CSS animation */}
      <div className="absolute -inset-4 sm:-inset-6 rounded-full 
                     bg-gradient-to-r from-[#e16928] via-yellow-400 to-sky-400 
                     opacity-15 blur-xl about-pulse" />

      {/* Rotating border - CSS animation */}
      <div
        className={`absolute -inset-2 sm:-inset-3 rounded-full ${shouldReduceMotion ? '' : 'about-rotate'}`}
        style={{
          background: "conic-gradient(from 0deg, #e16928, #fbbf24, #38bdf8, #c084fc, #e16928)",
          willChange: shouldReduceMotion ? 'auto' : 'transform',
        }}
      />

      {/* Main container - CSS float animation */}
      <div
        className={`relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 ${shouldReduceMotion ? '' : 'about-float'}`}
        style={{ willChange: shouldReduceMotion ? 'auto' : 'transform' }}
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
            />
          </div>
        </div>

        {/* Sparkle element - Top Right */}
        <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 
                       bg-gradient-to-r from-[#e16928] to-yellow-400 rounded-full 
                       flex items-center justify-center shadow-lg about-glow">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>

        {/* Code icon - Bottom Left */}
        <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-8 h-8 sm:w-10 sm:h-10 
                       bg-gradient-to-r from-sky-400 to-purple-500 rounded-full 
                       flex items-center justify-center shadow-lg">
          <FaCode className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>

        {/* Rocket icon - Top Left */}
        <div className="absolute top-4 -left-4 sm:-left-6 w-8 h-8 sm:w-9 sm:h-9 
                       bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full 
                       flex items-center justify-center shadow-lg">
          <FaRocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </div>
      </div>
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
                         blur-xl rounded-full top-20 -left-32 about-pulse" />
          <div className="absolute w-72 h-72 bg-gradient-to-r from-sky-400/10 to-purple-400/10 
                         blur-xl rounded-full bottom-20 -right-36 about-pulse" 
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
            <SectionBadge text="Get to know me" icon={Sparkles} />
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
            <span className="about-shimmer text-transparent bg-clip-text">
              About Me
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
            Crafting digital experiences with a blend of engineering, design, and real-world learning.
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

        {/* Intro Card */}
        <motion.div
          className="relative mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative rounded-2xl overflow-hidden
                         bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl 
                         border border-white/50 dark:border-white/10
                         shadow-xl
                         px-6 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-12 lg:py-16">
            
            {/* Top gradient line */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#e16928] to-transparent opacity-60" />

            {/* Grid Layout */}
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16">
              
              {/* Left - Text Content */}
              <motion.div
                className="flex-1 text-center lg:text-left space-y-5 max-w-2xl"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
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
                             about-shimmer text-transparent bg-clip-text
                             font-['Poppins',sans-serif] block"
                />

                {/* Description paragraphs */}
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 
                             leading-relaxed font-['Inter',sans-serif]">
                  I build clean, modern and responsive web applications that focus on performance and user experience. My passion lies in creating seamless digital experiences that users love.
                </p>
                
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 
                             leading-relaxed font-['Inter',sans-serif]">
                  I love exploring frontend ecosystems, experimenting with design systems, and bringing UI ideas to life with smooth interactions and animations.
                </p>
                
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 
                             leading-relaxed font-['Inter',sans-serif]">
                  When I'm not coding, I enjoy collaborating on interesting projects, contributing to open source, and learning how to make the web more dynamic and meaningful.
                </p>

                {/* Location */}
                <div className="flex items-center justify-center lg:justify-start gap-2 
                               text-gray-500 dark:text-gray-400 pt-2">
                  <MapPin className="w-5 h-5 text-[#e16928]" />
                  <span className="text-sm sm:text-base font-medium font-['Inter',sans-serif]">
                    Based in Ranchi, India
                  </span>
                </div>
              </motion.div>

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
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-4">
            <SectionBadge text="Learning Path" icon={GraduationCap} />
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4
                        font-['Montserrat',sans-serif]">
            <span className="about-shimmer text-transparent bg-clip-text">
              Educational Journey
            </span>
          </h3>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 
                       max-w-xl mx-auto font-['Inter',sans-serif]">
            A path shaped by consistent learning, hands-on projects and real-world problem solving.
          </p>

          <motion.div
            className="mt-6 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </motion.div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {education.map((edu, idx) => (
            <EducationCard key={edu.degree} edu={edu} idx={idx} />
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