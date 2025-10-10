import { motion } from "framer-motion";
import { useRef } from "react";
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
  // Designer animated shapes & stars canvas
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Geometric shapes (triangles, squares, hexagons)
    const shapes = Array.from({ length: 10 }, (_, i) => {
      const types = ["triangle", "square", "hexagon"];
      const type = types[i % types.length];
      return {
        type,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 60 + 40,
        color:
          type === "triangle"
            ? "#e16928"
            : type === "square"
            ? "#fcd34d"
            : "#38bdf8",
        dx: Math.random() * 0.5 - 0.25,
        dy: Math.random() * 0.5 - 0.25,
        angle: Math.random() * Math.PI * 2,
        dAngle: Math.random() * 0.01 - 0.005,
      };
    });

    // Stars
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.5,
      twinkle: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.2 + 0.05,
    }));

    // Falling stars
    let fallingStars = [];
    function spawnFallingStar() {
      fallingStars.push({
        x: Math.random() * width,
        y: -10,
        r: Math.random() * 2 + 1,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 3 + 2,
        alpha: 1,
      });
    }

    let lastFallingStar = 0;
    function drawShape(s) {
      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.translate(s.x, s.y);
      ctx.rotate(s.angle);
      ctx.beginPath();
      if (s.type === "triangle") {
        for (let i = 0; i < 3; i++) {
          const theta = (i * 2 * Math.PI) / 3;
          const x = Math.cos(theta) * s.size;
          const y = Math.sin(theta) * s.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
      } else if (s.type === "square") {
        for (let i = 0; i < 4; i++) {
          const theta = (i * 2 * Math.PI) / 4 + Math.PI / 4;
          const x = Math.cos(theta) * s.size;
          const y = Math.sin(theta) * s.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
      } else if (s.type === "hexagon") {
        for (let i = 0; i < 6; i++) {
          const theta = (i * 2 * Math.PI) / 6;
          const x = Math.cos(theta) * s.size;
          const y = Math.sin(theta) * s.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
      }
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 40;
      ctx.fill();
      ctx.restore();
    }

    function animateBg(ts) {
      ctx.clearRect(0, 0, width, height);

      // Shapes
      shapes.forEach((s) => {
        drawShape(s);
        s.x += s.dx;
        s.y += s.dy;
        s.angle += s.dAngle;
        if (s.x < -s.size) s.x = width + s.size;
        if (s.x > width + s.size) s.x = -s.size;
        if (s.y < -s.size) s.y = height + s.size;
        if (s.y > height + s.size) s.y = -s.size;
      });

      // Stars
      stars.forEach((st, i) => {
        ctx.save();
        ctx.globalAlpha = st.twinkle + Math.sin(ts / 500 + i) * 0.3;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
        // Move
        st.x += st.speed;
        if (st.x > width) st.x = 0;
      });

      // Falling stars
      fallingStars.forEach((fs) => {
        ctx.save();
        ctx.globalAlpha = fs.alpha;
        ctx.beginPath();
        ctx.arc(fs.x, fs.y, fs.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.restore();
        // Move
        fs.x += fs.dx;
        fs.y += fs.dy;
        fs.alpha -= 0.008;
      });
      fallingStars = fallingStars.filter((fs) => fs.y < height && fs.alpha > 0.1);

      // Spawn falling star every 1.5s
      if (ts - lastFallingStar > 1500) {
        spawnFallingStar();
        lastFallingStar = ts;
      }

      requestAnimationFrame(animateBg);
    }
    animateBg(0);

    // Resize handler
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen relative flex flex-col justify-center items-center px-6 py-20
                 bg-white dark:bg-gray-900 transition-colors duration-700 overflow-hidden"
    >
      {/* Seamless animated planets & stars canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

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
            className="relative flex items-stretch gap-0 bg-white/20 dark:bg-gray-800/40 border border-white/10 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden
                       transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
            custom={idx}
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            viewport={{ once: true, amount: 0.2 }}
            role="article"
            aria-label={edu.degree}
          >
            {/* Left image area (fixed width rectangle) */}
            <motion.div
              className="flex-shrink-0 w-36 md:w-44 h-36 md:h-auto"
              initial="hidden"
              whileInView="visible"
              variants={imageVariant}
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src={edu.img}
                alt={`${edu.degree} photo`}
                className="w-full h-full object-cover object-center block"
              />
            </motion.div>

            {/* Right details area */}
            <motion.div
              className="p-5 flex-1 flex flex-col justify-between"
              initial="hidden"
              whileInView="visible"
              variants={detailsVariant}
              viewport={{ once: true, amount: 0.3 }}
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
                    <li key={j} className="leading-tight">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* subtle CTA / meta area (optional) */}
              <div className="mt-4 text-xs text-gray-600 dark:text-gray-400 flex items-center justify-end gap-2">
                <span className="hidden md:inline">More →</span>
                <FaLaptopCode className="opacity-20 text-2xl" />
              </div>
            </motion.div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default About;
