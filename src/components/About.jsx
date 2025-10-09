import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";

const education = [
  {
    degree: "10th - CBSE",
    school: "Central Academy, Kanke, Ranchi",
    marks: "66%",
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/School-Photo.jpg",
  },
  {
    degree: "Intermediate of Science",
    school: "Marwari College, Ranchi",
    marks: "54% (JAC Board)",
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/College-Photo.jpeg",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "DSPMU, Ranchi",
    marks: "80%",
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/Dspmu-photo.jpeg",
  },
  {
    degree: "Master of Computer Applications (MCA)",
    school: "SBU, Ranchi",
    marks: "88%",
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/SBU-Photo.jpeg",
  },
];

const About = () => {
  const [particles, setParticles] = useState([]);
  
  // Hero floating particles
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

  // Mini particles for cards
  const generateMiniParticles = (count = 10) => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    }));
  };

  return (
    <section
      id="about"
      className="min-h-screen relative flex flex-col justify-center items-center px-6 py-20
                 bg-white dark:bg-gray-900 transition-colors duration-700 overflow-hidden"
    >
      {/* ✨ Hero Floating Particles */}
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
            y: [0, -15, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 5 + Math.random() * 4,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glowing Orbs */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 bg-[#e16928ff]/25 rounded-full blur-3xl"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, 20, -20, 0],
          opacity: [0.5, 0.8, 0.6, 0.5],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-400/25 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 20, 0],
          y: [0, -20, 20, 0],
          opacity: [0.4, 0.7, 0.5, 0.4],
        }}
        transition={{ duration: 11, repeat: Infinity }}
      />

      {/* Section Header */}
      <motion.h2
        className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text
                   bg-gradient-to-r from-[#e16928ff] to-yellow-400 mb-12 tracking-wider z-10"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
      >
        About Me
      </motion.h2>

      {/* Profile + Intro */}
      <div className="flex flex-col md:flex-row items-center md:items-start max-w-6xl w-full gap-12 z-10">
        <motion.div
          className="flex-shrink-0 w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden border-4 border-[#e16928ff] dark:border-yellow-400 shadow-2xl"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          <img
            src="https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/portfolio-background-pic.png"
            alt="Shubham Goswami"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </motion.div>

        <motion.div
          className="flex-1 space-y-6 transition-colors duration-500"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <TypeAnimation
            sequence={[
              "Hi, I'm Shubham Goswami 👋",
              2000,
              "I'm a passionate Web Developer and Designer",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
            className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text
                       bg-gradient-to-r from-[#e16928ff] to-yellow-400"
          />

          {[ 
            "I love creating modern, responsive, and animated websites. I focus on combining creativity with clean and maintainable code.",
            "As a person, I am dedicated, detail-oriented, and always eager to learn new technologies. I enjoy solving challenging problems and improving my skills every day.",
            "I am comfortable working both independently and in team environments, and I value effective communication and collaboration.",
          ].map((text, i) => (
            <motion.p
              key={i}
              className="text-lg md:text-xl text-gray-800 dark:text-gray-100 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3 + 0.5, duration: 0.8 }}
              viewport={{ once: false }}
            >
              {text.split(/(modern|detail-oriented|collaboration)/g).map((word, idx) =>
                /modern|detail-oriented|collaboration/.test(word) ? (
                  <span key={idx} className="text-[#e16928ff] dark:text-yellow-400 font-semibold">{word}</span>
                ) : word
              )}
            </motion.p>
          ))}
        </motion.div>
      </div>

      {/* Education Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-16 z-10">
        {education.map((edu, index) => {
          const miniParticles = generateMiniParticles(6);
          return (
            <motion.div
              key={edu.degree}
              className="relative rounded-xl shadow-2xl text-center cursor-pointer
                         bg-white dark:bg-gray-800 transition-colors duration-500 border border-transparent hover:border-yellow-400 overflow-hidden"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              whileHover={{
                scale: 1.08,
                rotate: 1,
                boxShadow: "0 0 25px 5px #FFD700",
              }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: false }}
            >
              {/* Mini Particles */}
              {miniParticles.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-yellow-300/50 dark:bg-yellow-400/40"
                  style={{
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    top: `${p.y}%`,
                    left: `${p.x}%`,
                  }}
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 3,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: "easeInOut",
                  }}
                />
              ))}

              <div className="w-full h-40 rounded-t-xl overflow-hidden">
                <img
                  src={edu.img}
                  alt={edu.degree}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 relative z-10">
                <h3 className="font-bold text-xl md:text-2xl text-transparent bg-clip-text
                               bg-gradient-to-r from-[#e16928ff] to-yellow-400 mb-2">
                  {edu.degree}
                </h3>
                <p className="text-gray-800 dark:text-gray-200 mb-2">{edu.school}</p>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{edu.marks}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  );
};

export default About;
