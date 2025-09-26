import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { GiRocketThruster } from "react-icons/gi";
import { HiMenu, HiX } from "react-icons/hi";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  const navLinks = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md shadow-lg transition-colors duration-500 ${
        darkMode
          ? "bg-gray-900/90"
          : "bg-gradient-to-r from-blue-100 to-indigo-200/80"
      }`}
      initial={{ y: -120 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className={`text-3xl cursor-pointer transition-colors duration-500 ${
            darkMode ? "text-sky-400" : "text-gray-900"
          }`}
          whileHover={{ scale: 1.2, rotate: 10 }}
        >
          <GiRocketThruster />
        </motion.div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-10 font-medium items-center">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.to}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? "text-gray-200 hover:text-sky-400"
                  : "text-gray-900 hover:text-indigo-700"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={link.to}
                smooth={true}
                duration={600}
                offset={-70}
                spy={true}
                activeClass={darkMode ? "text-sky-400 font-bold" : "text-indigo-700 font-bold"}
              >
                {link.name}
              </Link>
            </motion.li>
          ))}

          {/* Theme Toggle */}
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-colors duration-500 ${
              darkMode ? "bg-gray-800" : "bg-white/30 backdrop-blur-sm"
            }`}
            whileTap={{ scale: 0.9, rotate: 20 }}
            whileHover={{ scale: 1.1 }}
          >
            {darkMode ? (
              <FaSun className="text-yellow-400 text-xl" />
            ) : (
              <FaMoon className="text-gray-800 text-xl" />
            )}
          </motion.button>
        </ul>

        {/* Mobile Hamburger */}
        <div
          className={`md:hidden text-2xl cursor-pointer transition-colors duration-500 ${
            darkMode ? "text-gray-200" : "text-gray-900"
          }`}
          onClick={toggleMenu}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={`md:hidden absolute w-full top-full left-0 flex flex-col items-center space-y-6 py-6 font-medium shadow-xl backdrop-blur-md transition-colors duration-500 ${
              darkMode
                ? "bg-gray-900/95 text-gray-200"
                : "bg-gradient-to-b from-blue-100/90 to-indigo-200/80 text-gray-900"
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {navLinks.map((link, index) => (
              <motion.li
                key={link.to}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  darkMode ? "hover:text-sky-400" : "hover:text-indigo-700"
                }`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                onClick={() => setIsOpen(false)}
              >
                <Link
                  to={link.to}
                  smooth={true}
                  duration={600}
                  offset={-70}
                  spy={true}
                  activeClass={darkMode ? "text-sky-400 font-bold" : "text-indigo-700 font-bold"}
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}

            {/* Theme Toggle Mobile */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-full transition-colors duration-500 ${
                darkMode ? "bg-gray-800" : "bg-white/30 backdrop-blur-sm"
              }`}
              whileTap={{ scale: 0.9, rotate: 20 }}
            >
              {darkMode ? (
                <FaSun className="text-yellow-400 text-xl" />
              ) : (
                <FaMoon className="text-gray-800 text-xl" />
              )}
            </motion.button>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
