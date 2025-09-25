import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-radial from-primary to-black px-6">
      <motion.h2
        className="text-5xl md:text-7xl font-bold text-secondary"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Hi, I'm Shubham 👋
      </motion.h2>

      <motion.p
        className="mt-4 text-lg md:text-2xl text-gray-300 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        A passionate Web Developer who loves building modern, responsive and
        animated websites.
      </motion.p>

      <motion.div
        className="mt-6 flex space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <motion.a
          href="#projects"
          className="px-6 py-3 bg-secondary text-black font-semibold rounded-lg hover:scale-105 transition"
          whileHover={{ scale: 1.1 }}
        >
          View Projects
        </motion.a>

        <motion.a
          href="#contact"
          className="px-6 py-3 border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-black transition"
          whileHover={{ scale: 1.1 }}
        >
          Contact Me
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
