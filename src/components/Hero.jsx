import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react"; // scroll icon

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
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#e1692815] to-transparent pointer-events-none"></div>

      {/* Typing Heading */}
      <TypingEffect
        text="Hi, I'm Shubham Das Goswami"
        duration={2}
        className="text-4xl md:text-6xl font-bold 
        text-[#e16928ff] dark:text-yellow-400 
        font-sans tracking-wide drop-shadow-lg"
      />

      {/* Subheading */}
      <motion.p
        className="mt-6 text-lg md:text-2xl 
        text-gray-800 dark:text-gray-300 
        max-w-2xl transition-colors duration-500 
        font-medium leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        A passionate Web Developer who loves building{" "}
        <span className="font-semibold text-[#e16928ff] dark:text-yellow-400">
          modern, responsive
        </span>{" "}
        and{" "}
        <span className="font-semibold text-[#e16928ff] dark:text-yellow-400">
          animated websites
        </span>
        .
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
          className="px-8 py-4 bg-[#e16928ff] dark:bg-yellow-400 
          text-white dark:text-gray-900 
          font-semibold rounded-lg shadow-lg 
          hover:scale-105 hover:shadow-xl 
          transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
        >
          View Projects
        </motion.a>

        <motion.a
          href="#contact"
          className="px-8 py-4 border border-[#e16928ff] dark:border-yellow-400 
          text-[#e16928ff] dark:text-yellow-400 
          rounded-lg hover:bg-[#e16928ff] dark:hover:bg-yellow-400 
          hover:text-white dark:hover:text-gray-900 
          transition-colors duration-300 font-semibold shadow hover:shadow-lg"
          whileHover={{ scale: 1.1 }}
        >
          Contact Me
        </motion.a>
      </motion.div>

      {/* Animated Scroll Icon */}
      <motion.div
        className="absolute bottom-10 text-4xl text-[#e16928ff] dark:text-yellow-400 animate-bounce"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          delay: 1.5,
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <ChevronDown size={40} />
      </motion.div>
    </section>
  );
};

export default Hero;
