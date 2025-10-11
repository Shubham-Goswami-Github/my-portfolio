import { motion } from "framer-motion";
import AnimatedPlanetStarBackground from "./AnimatedPlanetStarBackground";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaRobot } from "react-icons/fa";
import { useEffect, useState } from "react";

const Footer = () => {
  const [visitors, setVisitors] = useState(0);

  // 🧠 Fake visitor counter logic (replace with API later if needed)
  useEffect(() => {
    const stored = localStorage.getItem("visitors");
    let count = stored ? parseInt(stored) + 1 : 1;
    localStorage.setItem("visitors", count);
    setVisitors(count);
  }, []);

  return (
    <motion.footer
      className="relative bg-gradient-to-r from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-300 pt-16 pb-8 px-6 overflow-hidden transition-colors duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}
    >
      {/* Animated Planets & Stars Background - covers full footer */}
      <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
        <AnimatedPlanetStarBackground />
      </div>

      {/* Footer Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {/* About Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-[#e16928ff] dark:text-yellow-400">About Me</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Hi, I'm <span className="font-semibold">Shubham Goswami</span>, a creative Web Developer &
            Designer. I craft immersive, animated, and responsive digital experiences using React, Tailwind,
            and Django.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-[#e16928ff] dark:text-yellow-400">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { label: "Home", href: "#home" },
              { label: "About", href: "#about" },
              { label: "Skills", href: "#skills" },
              { label: "Projects", href: "#projects" },
              { label: "Testimonials", href: "#testimonials" },
            ].map((link, i) => (
              <motion.li key={i} whileHover={{ x: 5, scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
                <a
                  href={link.href}
                  className="relative inline-block px-1 font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 hover:text-[#e16928ff] dark:hover:text-yellow-400 no-underline hover:no-underline decoration-none"
                >
                  {link.label}
                  <motion.span
                    className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#e16928ff] dark:bg-yellow-400 rounded-full"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-[#e16928ff] dark:text-yellow-400">Follow Me</h3>
          <div className="flex space-x-4 mt-2">
            {[
              { icon: <FaGithub />, link: "https://github.com/Shubham-Goswami-Github" },
              { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/shubham-das-goswami-b66997254/" },
              { icon: <FaTwitter />, link: "https://x.com/Shubham_S8990" },
              { icon: <FaInstagram />, link: "https://www.instagram.com/sacrastic_shubham/" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-gray-700 dark:text-gray-300 hover:text-[#e16928ff] dark:hover:text-yellow-400 transition"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Total Visitors Box */}
      <motion.div
        className="absolute bottom-6 right-6 bg-white/30 dark:bg-black/30 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-lg flex items-center space-x-3 border border-gray-300/20 dark:border-gray-700/40"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <FaRobot className="text-[#e16928ff] dark:text-yellow-400 text-3xl" />
        </motion.div>
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">Total Visitors</p>
          <motion.p
            key={visitors}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-[#e16928ff] dark:text-yellow-400"
          >
            {visitors}
          </motion.p>
        </div>
      </motion.div>

      {/* Footer Bottom */}
      <motion.div
        className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        &copy; {new Date().getFullYear()} <span className="text-[#e16928ff] dark:text-yellow-400 font-semibold">Shubham Goswami</span>. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;