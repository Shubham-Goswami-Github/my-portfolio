import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gradient-to-r from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-300 pt-16 pb-8 px-6 transition-colors duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-[#e16928ff] dark:text-yellow-400">About Me</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Hi, I'm Shubham Goswami, a passionate Web Developer & Designer. I
            create responsive, modern, and animated websites using React, Tailwind, and Django.
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
            <li><a href="#about" className="hover:text-[#e16928ff] dark:hover:text-yellow-400 transition-colors">About</a></li>
            <li><a href="#skills" className="hover:text-[#e16928ff] dark:hover:text-yellow-400 transition-colors">Skills</a></li>
            <li><a href="#projects" className="hover:text-[#e16928ff] dark:hover:text-yellow-400 transition-colors">Projects</a></li>
            <li><a href="#contact" className="hover:text-[#e16928ff] dark:hover:text-yellow-400 transition-colors">Contact</a></li>
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-[#e16928ff] dark:text-yellow-400">Contact Info</h3>
          <p>Email: shubham@example.com</p>
          <p>Phone: +91 1234567890</p>
          <p>Location: Ranchi, Jharkhand, India</p>
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
            <a href="https://github.com/Shubham-Goswami-Github" target="_blank" rel="noopener noreferrer"
               className="hover:text-[#e16928ff] dark:hover:text-yellow-400 transition-transform transform hover:scale-110">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/shubham-das-goswami-b66997254/" target="_blank" rel="noopener noreferrer"
               className="hover:text-[#e16928ff] dark:hover:text-yellow-400 transition-transform transform hover:scale-110">
              <FaLinkedin size={24} />
            </a>
            <a href="https://x.com/Shubham_S8990" target="_blank" rel="noopener noreferrer"
               className="hover:text-[#e16928ff] dark:hover:text-yellow-400 transition-transform transform hover:scale-110">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com/sacrastic_shubham/" target="_blank" rel="noopener noreferrer"
               className="hover:text-[#e16928ff] dark:hover:text-yellow-400 transition-transform transform hover:scale-110">
              <FaInstagram size={24} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <motion.div
        className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        &copy; {new Date().getFullYear()} Shubham Goswami. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
