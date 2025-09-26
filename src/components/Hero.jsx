import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

const TypingEffect = ({ text, duration = 2, className }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      duration,
      ease: "linear",
    });

    const unsubscribe = displayText.onChange((latest) => {
      setCurrentText(latest);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, displayText, text, duration]);

  return (
    <motion.h2
      className={className}
      aria-label={text}
      aria-live="polite"
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 1 }}
    >
      {currentText}
    </motion.h2>
  );
};

const Hero = () => {
  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center text-center
      bg-gray-200 dark:bg-gray-900 transition-colors duration-500 px-6 relative overflow-hidden"
    >
      {/* Typing Heading */}
      <TypingEffect
        text="Hi, I'm Shubham Das Goswami"
        duration={2}
        className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-yellow-400 font-sans tracking-wide"
      />

      {/* Subheading */}
      <motion.p
        className="mt-6 text-lg md:text-2xl text-gray-900 dark:text-gray-300 max-w-2xl transition-colors duration-500 font-medium leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        A passionate Web Developer who loves building modern, responsive, and
        animated websites.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.a
          href="#projects"
          className="px-8 py-4 bg-secondary dark:bg-yellow-400 text-black dark:text-gray-900 font-semibold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
        >
          View Projects
        </motion.a>

        <motion.a
          href="#contact"
          className="px-8 py-4 border border-secondary dark:border-yellow-400 text-secondary dark:text-yellow-400 rounded-lg hover:bg-secondary dark:hover:bg-yellow-400 hover:text-black dark:hover:text-gray-900 transition-colors duration-300 font-semibold shadow hover:shadow-lg"
          whileHover={{ scale: 1.1 }}
        >
          Contact Me
        </motion.a>
      </motion.div>

      {/* Animated Scroll Icon */}
      <motion.div
        className="absolute bottom-10 text-4xl dark:text-yellow-400 text-gray-900 animate-bounce"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 1.5, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        
      </motion.div>
    </section>
  );
};

export default Hero;
