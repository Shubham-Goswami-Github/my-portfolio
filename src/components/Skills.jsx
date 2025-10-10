import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const skills = [
  { name: "HTML", img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/html.png" },
  { name: "CSS", img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/CSS.png" },
  { name: "JavaScript", img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/javascript.png" },
  { name: "Java", img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/JAVA.png" },
  { name: "C", img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/clanguagelogo.png" },
  { name: "MySQL", img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/MYSQL-ICON.png" },
  { name: "PHP", img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/PHP.png" },
  { name: "Python", img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/pythone.png" },
];

const Skills = () => {
  const [particles, setParticles] = useState([]);

  // Floating background particles (like in About)
  useEffect(() => {
    const count = 35;
    const arr = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 3,
      delay: Math.random() * 5,
    }));
    setParticles(arr);
  }, []);

  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 
                 bg-white dark:bg-gray-900 transition-colors duration-700 overflow-hidden"
    >
      {/* ✨ Floating background particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-yellow-400/30 dark:bg-yellow-500/30"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: `${p.y}%`,
            left: `${p.x}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: p.delay,
            ease: [0.45, 0, 0.55, 1],
          }}
        />
      ))}

      {/* Glowing orbs like About section */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 bg-[#e16928ff]/25 rounded-full blur-3xl"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, 20, -20, 0],
          opacity: [0.5, 0.8, 0.6, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1],
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-400/25 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 20, 0],
          y: [0, -20, 20, 0],
          opacity: [0.4, 0.7, 0.5, 0.4],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1],
        }}
      />

      {/* 🧠 Section Title */}
      <motion.h2
        className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text 
                   bg-gradient-to-r from-[#e16928ff] to-yellow-400 mb-20 tracking-wide z-10"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.42, 0, 0.58, 1],
        }}
        viewport={{ once: false }}
      >
        Skills
      </motion.h2>

      {/* 🔥 Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 max-w-6xl w-full z-10">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="relative group p-8 rounded-3xl text-center font-bold 
                       text-gray-900 dark:text-white cursor-pointer 
                       flex flex-col items-center justify-center space-y-5
                       bg-white/20 dark:bg-black/20 backdrop-blur-xl
                       shadow-xl border border-gray-200 dark:border-gray-700
                       hover:border-yellow-400 transition-all duration-700"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{
              scale: 1.1,
              rotate: 1,
              boxShadow: "0 0 35px 8px rgba(255,215,0,0.4)",
            }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.45, 0, 0.55, 1],
            }}
            viewport={{ once: false }}
          >
            {/* Smooth Glow Background on hover */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
                            bg-gradient-to-r from-[#e16928ff] to-yellow-400 blur-2xl 
                            transition-all duration-700"></div>

            {/* Skill Icon */}
            <motion.img
              src={skill.img}
              alt={skill.name}
              className="w-20 h-20 object-contain z-10 relative drop-shadow-xl 
                         group-hover:scale-110 transition-transform duration-500"
              initial={{ opacity: 0, y: -20, rotate: -10 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{
                delay: index * 0.15 + 0.2,
                duration: 0.6,
                ease: [0.42, 0, 0.58, 1],
              }}
              viewport={{ once: false }}
            />

            {/* Skill Name */}
            <span className="text-xl md:text-2xl tracking-wide z-10 relative">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
