import { motion, useReducedMotion } from "framer-motion";
import AnimatedPlanetStarBackground from "./AnimatedPlanetStarBackground";
import { TypeAnimation } from "react-type-animation";
import { useContext, useEffect } from "react";
import { FaGraduationCap, FaUniversity, FaStar, FaLaptopCode } from "react-icons/fa";
import { LenisContext } from "../LenisProvider";

const education = [
  {
    degree: "10th - CBSE",
    school: "Central Academy, Kanke, Ranchi",
    marks: "66%",
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/School-Photo.jpg",
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
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/College-Photo.jpeg",
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
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/Dspmu-photo.jpeg",
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
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/SBU-Photo.jpeg",
    highlights: [
      "Advanced expertise in React, Node.js & Cloud.",
      "Worked on real-time collaborative applications.",
      "Served as project lead for final year capstone project.",
    ],
  },
];

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

// Directional reveal (left column slides from left, right from right)
const cardVariants = {
  hidden: (c = { i: 0, dir: -1 }) => ({
    opacity: 0,
    y: 18,
    x: 16 * (c.dir ?? -1),
    scale: 0.98,
  }),
  visible: (c = { i: 0 }) => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: { delay: (c.i ?? 0) * 0.06, duration: 0.45, ease: [0.23, 1, 0.32, 1] },
  }),
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const detailsVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut", delay: 0.06 } },
};

const aboutTextVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 + 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

// Professional, same-size Education Card
const EducationCard = ({ edu, idx }) => {
  const shouldReduceMotion = useReducedMotion();
  const custom = { i: idx, dir: idx % 2 === 0 ? -1 : 1 };

  return (
    <motion.article
      className="group relative flex flex-col h-full
                 bg-gradient-to-br from-white/80 to-white/40 
                 dark:from-white/[0.06] dark:to-white/[0.02] backdrop-blur-xl
                 rounded-2xl overflow-hidden
                 border border-white/20 dark:border-white/10
                 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                 transition-all duration-500 ease-out
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e16928]/60
                 hover:shadow-[0_12px_40px_rgba(225,105,40,0.18)] dark:hover:shadow-[0_12px_40px_rgba(225,105,40,0.28)]
                 hover:border-[#e16928]/40 motion-optim"
      custom={custom}
      initial="hidden"
      whileInView="visible"
      variants={cardVariants}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={
        !shouldReduceMotion
          ? { y: -6, scale: 1.01, rotate: 0.12, transition: { duration: 0.28, ease: "easeOut" } }
          : undefined
      }
      role="article"
      aria-label={edu.degree}
      tabIndex={0}
    >
      {/* Animated gradient border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(225,105,40,0.35), rgba(250,204,21,0.35))",
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Image Section (size unchanged) */}
      <motion.div
        className="relative w-full h-32 sm:h-36 md:h-40 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 motion-optim"
        initial="hidden"
        whileInView="visible"
        variants={imageVariant}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Subtle sheen */}
        <motion.div
          className="absolute inset-y-0 left-[-30%] w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent
                     dark:via-white/10 skew-x-12 pointer-events-none"
          initial={{ x: "-100%" }}
          whileInView={!shouldReduceMotion ? { x: ["-100%", "160%"] } : undefined}
          transition={{ duration: 1.2, delay: 0.15 }}
          viewport={{ once: true }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
        <motion.img
          src={edu.img}
          alt={edu.degree}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 motion-optim"
        />

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#e16928]/25 to-transparent rounded-bl-full z-20" />
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="relative p-4 sm:p-5 flex-1 flex flex-col"
        initial="hidden"
        whileInView="visible"
        variants={detailsVariant}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Degree */}
        <h3
          className="flex items-start gap-2 text-base sm:text-lg font-bold mb-2
                     text-gray-900 dark:text-white font-['Montserrat',sans-serif]"
        >
          <FaGraduationCap className="text-yellow-500 flex-shrink-0 mt-0.5 text-lg sm:text-xl" />
          <span
            className="leading-tight bg-gradient-to-r from-[#e16928] via-[#f97316] to-yellow-500 
                        bg-clip-text text-transparent"
          >
            {edu.degree}
          </span>
        </h3>

        {/* School */}
        <p
          className="flex items-start gap-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 
                      font-['Inter',sans-serif] leading-snug"
        >
          <FaUniversity className="text-[#e16928] flex-shrink-0 mt-0.5 text-sm" />
          <span className="line-clamp-2">{edu.school}</span>
        </p>

        {/* Marks */}
        <div
          className="inline-flex items-center gap-1.5 px-2 py-1 mb-3 
                      bg-gradient-to-r from-yellow-400/20 to-orange-400/20 
                      dark:from-yellow-400/10 dark:to-orange-400/10
                      border border-yellow-400/30 dark:border-yellow-400/20
                      rounded-full w-fit"
        >
          <FaStar className="text-yellow-500 text-xs" />
          <span className="font-semibold text-xs text-gray-900 dark:text-yellow-300 font-['Poppins',sans-serif]">
            {edu.marks}
          </span>
        </div>

        {/* Highlights */}
        <ul className="space-y-1.5 flex-1 mb-3">
          {edu.highlights.map((highlight, j) => (
            <motion.li
              key={j}
              className="flex items-start gap-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 
                         leading-relaxed font-['Inter',sans-serif]"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: j * 0.08 + 0.2 }}
              viewport={{ once: true }}
            >
              <span
                className="inline-block w-1 h-1 rounded-full bg-gradient-to-r from-[#e16928] to-yellow-400 
                           flex-shrink-0 mt-1.5"
              />
              <span className="line-clamp-2">{highlight}</span>
            </motion.li>
          ))}
        </ul>

        {/* Footer pinned to bottom for equal heights */}
        <motion.div
          className="mt-auto flex items-center justify-between pt-3 border-t border-gray-200/40 dark:border-gray-700/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          viewport={{ once: true }}
        >
          <span
            className="text-xs text-gray-500 dark:text-gray-500 group-hover:text-[#e16928] 
                       transition-colors font-['Poppins',sans-serif] font-medium"
          >
            View Details →
          </span>
          <FaLaptopCode
            className="text-lg text-gray-300 dark:text-gray-600 group-hover:text-[#e16928] 
                                  transition-colors"
          />
        </motion.div>

        {/* Bottom progress bar on hover (doesn't change size) */}
        <span className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-[width] duration-700 bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400" />

        {/* Subtle glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-6 rounded-xl bg-gradient-to-r from-[#e16928]/6 to-yellow-400/6 blur-2xl" />
        </div>
      </motion.div>
    </motion.article>
  );
};

// Profile
const ProfileCircle = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative flex-shrink-0"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
      style={shouldReduceMotion ? {} : { transition: "5s ease-in-out infinite" }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={shouldReduceMotion ? {} : { duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          background: "conic-gradient(from 0deg, #e16928, #f59e0b, #eab308, #e16928)",
          padding: "3px",
        }}
      >
        <div className="w-full h-full rounded-full bg-white dark:bg-gray-900" />
      </motion.div>

      <div
        className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden
                    shadow-[0_0_40px_rgba(225,105,40,0.25)] dark:shadow-[0_0_50px_rgba(225,105,40,0.35)]
                    ring-3 ring-white/50 dark:ring-gray-800/50"
      >
        <img
          src="https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/portfolio-background-pic.png"
          alt="Shubham Goswami"
          className="w-full h-full object-cover scale-105"
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100"
          initial={{ x: "-100%", y: "-100%" }}
          whileHover={{ x: "100%", y: "100%" }}
          transition={{ duration: 0.7 }}
        />
      </div>

      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full shadow-lg animate-pulse" />
      <div
        className="absolute -bottom-2 -left-2 w-5 h-5 bg-[#e16928] rounded-full shadow-lg animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </motion.div>
  );
};

const About = () => {
  const lenisRef = useContext(LenisContext);

  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(window.scrollY, { immediate: true });
    }
  }, [lenisRef]);

  return (
    <section
      id="about"
      className="relative flex flex-col justify-center items-center
                 min-h-screen px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20
                 bg-gradient-to-b from-gray-50 to-white
                 dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-black
                 transition-colors duration-700 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <AnimatedPlanetStarBackground />
      </div>

      {/* Glowing orbs (reduced blur and slower motion for smoother scrolling) */}
      <motion.div
        className="absolute top-10 left-5 sm:left-10 w-32 h-32 sm:w-48 sm:h-48 
                   bg-[#e16928]/20 dark:bg-[#e16928]/15 rounded-full blur-2xl motion-optim"
        animate={{
          x: [0, 16, -12, 0],
          y: [0, 12, -12, 0],
          opacity: [0.32, 0.52, 0.42, 0.32],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-5 sm:right-10 w-36 h-36 sm:w-56 sm:h-56 
                   bg-yellow-400/20 dark:bg-yellow-400/15 rounded-full blur-2xl motion-optim"
        animate={{
          x: [0, -16, 12, 0],
          y: [0, -12, 12, 0],
          opacity: [0.28, 0.48, 0.38, 0.28],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <motion.div
        className="z-10 text-center mb-6 sm:mb-10"
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold 
                     text-transparent bg-clip-text bg-gradient-to-r from-[#e16928] via-orange-500 to-yellow-400
                     tracking-tight drop-shadow-lg mb-2 sm:mb-3 font-['Montserrat',sans-serif]"
        >
          Who I Am!
        </h2>
        <p
          className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto px-4 
                      font-['Inter',sans-serif]"
        >
          Crafting digital experiences with creativity and cutting-edge technology
        </p>
      </motion.div>

      {/* Intro Section */}
      <div
        className="z-10 flex flex-col-reverse lg:flex-row items-center justify-center
                    max-w-6xl w-full gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20"
      >
        <motion.div
          className="flex-1 text-center lg:text-left space-y-4 sm:space-y-5 px-4 sm:px-0 max-w-xl lg:max-w-none"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          viewport={{ once: true }}
        >
          <TypeAnimation
            sequence={[
              "Hey, Fellas! Myself Shubham 👋",
              2200,
              "I am A Passionate Web Developer 💻",
              2200,
              "Creative UI/UX Designer 🎨",
              2200,
            ]}
            speed={55}
            repeat={Infinity}
            className="text-xl sm:text-2xl md:text-3xl font-bold
                       text-transparent bg-clip-text bg-gradient-to-r from-[#e16928] to-yellow-400
                       font-['Poppins',sans-serif]"
          />

          {[
            "I craft beautiful, responsive, and high-performance web applications blending creativity with clean code.",
            "I'm passionate about learning new technologies, experimenting with design systems, and building interactive digital experiences.",
            "Outside coding, I love collaborating on innovative projects and exploring ways to make the web more dynamic and meaningful.",
          ].map((text, i) => (
            <motion.p
              key={i}
              initial="hidden"
              whileInView="visible"
              variants={aboutTextVariant}
              custom={i}
              className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 
                         leading-relaxed italic font-['Inter',sans-serif]"
              viewport={{ once: true, amount: 0.5 }}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        <ProfileCircle />
      </div>

      {/* Education Section Header */}
      <motion.div
        className="z-10 text-center mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3
          className="text-2xl sm:text-3xl md:text-4xl font-bold
                     text-transparent bg-clip-text bg-gradient-to-r from-[#e16928] to-yellow-400 mb-2
                     font-['Montserrat',sans-serif]"
        >
          Educational Journey
        </h3>
        <div className="w-20 h-1 bg-gradient-to-r from-[#e16928] to-yellow-400 rounded-full mx-auto" />
      </motion.div>

      {/* Wider, edge-aligned, more gap grid */}
      <motion.div
        className="z-10 max-w-7xl mx-auto w-full px-0 sm:px-2 lg:px-4"  // closer to section edges
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 lg:gap-10   // more gap
                     items-stretch justify-items-stretch"
        >
          {education.map((edu, idx) => (
            <EducationCard key={edu.degree} edu={edu} idx={idx} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;