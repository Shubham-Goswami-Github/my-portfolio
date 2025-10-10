import { motion } from "framer-motion";
import AnimatedPlanetStarBackground from "./AnimatedPlanetStarBackground";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";
import { FaGraduationCap, FaUniversity, FaStar, FaLaptopCode } from "react-icons/fa";

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

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.99 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

const imageVariant = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const detailsVariant = {
  hidden: { opacity: 0, x: 18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const aboutTextVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.25 + 0.15, duration: 0.6 } }),
};

const About = () => {

  return (
    <section
      id="about"
      className="min-h-screen relative flex flex-col justify-center items-center px-6 py-20
                 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black transition-all duration-700 overflow-hidden"
      style={{ position: "relative" }}
    >
      {/* Reusable Animated Planets & Stars Background - covers full section */}
      <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
        <AnimatedPlanetStarBackground />
      </div>

      {/* Glowing orbs (theme preserved) */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 bg-[#e16928ff]/25 rounded-full blur-3xl"
        animate={{ x: [0, 30, -20, 0], y: [0, 20, -20, 0], opacity: [0.5, 0.8, 0.6, 0.5] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-400/25 rounded-full blur-3xl"
        animate={{ x: [0, -30, 20, 0], y: [0, -20, 20, 0], opacity: [0.4, 0.7, 0.5, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <motion.h2
        className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text
                   bg-gradient-to-r from-[#e16928ff] to-yellow-400 mb-12 tracking-wider z-10 drop-shadow-lg"
        initial={{ opacity: 0, y: -36 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      {/* Intro area */}
      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full gap-12 z-10">
        {/* Left - Profile image (lighting removed) */}
        <motion.div
          className="relative flex-shrink-0 w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border-4 border-[#e16928ff] dark:border-yellow-400 shadow-2xl"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 14 }}
          viewport={{ once: true }}
        >
          <img
            src="https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/portfolio-background-pic.png"
            alt="Shubham Goswami"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          {/* NOTE: removed automatic gradient/lighting overlay as requested */}
        </motion.div>

        {/* Right - Typing + italic paragraphs with appearing animation */}
        <motion.div
          className="flex-1 text-center md:text-left space-y-6"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          viewport={{ once: true }}
        >
          <TypeAnimation
            sequence={[
              "Hi, I'm Shubham Goswami 👋",
              2200,
              "A Passionate Web Developer 💻",
              2200,
              "Creative UI/UX Designer 🎨",
              2200,
            ]}
            speed={55}
            repeat={Infinity}
            className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text
                       bg-gradient-to-r from-[#e16928ff] to-yellow-400"
          />

          {/* italic paragraphs with appear animation */}
          {[
            "I craft beautiful, responsive, and high-performance web applications blending creativity with clean code.",
            "I’m passionate about learning new technologies, experimenting with design systems, and building interactive digital experiences.",
            "Outside coding, I love collaborating on innovative projects and exploring ways to make the web more dynamic and meaningful.",
          ].map((text, i) => (
            <motion.p
              key={i}
              initial="hidden"
              whileInView="visible"
              variants={aboutTextVariant}
              custom={i}
              className="text-lg md:text-xl text-gray-800 dark:text-gray-100 leading-relaxed italic"
              viewport={{ once: true, amount: 0.5 }}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>
      </div>

      {/* Education cards grid: 1 col on small, 2 cols on md+ (rectangular cards, left image + right details) */}
      <div className="max-w-6xl mx-auto mt-16 w-full grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
        {education.map((edu, idx) => (
          <motion.article
            key={edu.degree}
            className="relative flex items-stretch gap-0 bg-white/10 dark:bg-black/10 border border-yellow-400/30 dark:border-yellow-400/40 rounded-2xl shadow-2xl overflow-hidden
                       transition-transform duration-500 hover:scale-[1.04] hover:shadow-[0_0_40px_0_rgba(225,105,40,0.18)] hover:border-yellow-400"
            custom={idx}
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            viewport={{ once: true, amount: 0.2 }}
            role="article"
            aria-label={edu.degree}
            whileHover={{ scale: 1.06, boxShadow: "0 0 60px 0 #e16928", borderColor: "#e16928" }}
          >
            {/* Animated Glow on hover */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-r from-[#e16928ff] to-yellow-400 blur-2xl"></div>

            {/* Left image area (fixed width rectangle) */}
            <motion.div
              className="flex-shrink-0 w-36 md:w-44 h-36 md:h-auto"
              initial="hidden"
              whileInView="visible"
              variants={imageVariant}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.08, rotate: 2 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
            >
              <img
                src={edu.img}
                alt={`${edu.degree} photo`}
                className="w-full h-full object-cover object-center block rounded-xl shadow-lg"
              />
            </motion.div>

            {/* Right details area */}
            <motion.div
              className="p-5 flex-1 flex flex-col justify-between"
              initial="hidden"
              whileInView="visible"
              variants={detailsVariant}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 110, damping: 13 }}
            >
              <div>
                <h3 className="flex items-center gap-2 text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#e16928ff] to-yellow-400">
                  <FaGraduationCap className="text-yellow-400" />
                  {edu.degree}
                </h3>

                <p className="mt-1 text-sm md:text-base text-gray-700 dark:text-gray-200 flex items-center gap-2">
                  <FaUniversity className="text-[#e16928ff]" />
                  {edu.school}
                </p>

                <p className="mt-2 font-medium text-sm md:text-base text-gray-900 dark:text-yellow-300 flex items-center gap-2">
                  <FaStar className="text-yellow-400" /> {edu.marks}
                </p>

                <ul className="mt-3 list-disc pl-5 text-sm md:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {edu.highlights.map((pt, j) => (
                    <motion.li
                      key={j}
                      className="leading-tight"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: j * 0.12 + 0.2 }}
                      viewport={{ once: true }}
                    >
                      {pt}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* subtle CTA / meta area (optional) */}
              <motion.div
                className="mt-4 text-xs text-gray-600 dark:text-gray-400 flex items-center justify-end gap-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ color: "#e16928" }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="hidden md:inline">More →</span>
                <FaLaptopCode className="opacity-20 text-2xl" />
              </motion.div>
            </motion.div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default About;
