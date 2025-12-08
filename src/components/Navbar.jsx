import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { GiRocketThruster } from "react-icons/gi";
import { HiMenu, HiX } from "react-icons/hi";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ onAdminLoginClick, adminLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
  );
  const [showNav, setShowNav] = useState(true);

  const lastScrollYRef = useRef(0);
  // ❌ TypeScript generic hata diya, normal JS useRef
  const hideTimeoutRef = useRef(null);

  const navLinks = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);

  /* ---------------- THEME HANDLING ---------------- */
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  /* ---------------- NAV VISIBILITY (INACTIVITY + SCROLL) ---------------- */
  useEffect(() => {
    const showAndScheduleHide = (delay = 2600) => {
      setShowNav(true);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = setTimeout(() => {
        setShowNav(false);
      }, delay);
    };

    const handleScroll = () => {
      const currentY = window.scrollY || 0;
      const lastY = lastScrollYRef.current;
      const delta = currentY - lastY;
      lastScrollYRef.current = currentY;

      // Scroll down -> hide fast
      if (delta > 6 && currentY > 80) {
        setShowNav(false);
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        if (isOpen) setIsOpen(false);
        return;
      }

      // Scroll up / small movement -> show then auto-hide
      showAndScheduleHide(2600);

      if (isOpen) setIsOpen(false);
    };

    const handleActivity = () => {
      showAndScheduleHide(2600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("touchstart", handleActivity);

    lastScrollYRef.current = window.scrollY || 0;
    showAndScheduleHide(2600);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [isOpen]);

  return (
    <motion.nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-500
        backdrop-blur-xl
        border-b border-white/20 dark:border-white/10
        shadow-[0_14px_45px_rgba(15,23,42,0.35)]
        ${darkMode ? "bg-[#020617]/85" : "bg-white/80"}
      `}
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: showNav ? 0 : -120, opacity: showNav ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* bottom gradient line */}
      <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-[#e16928] via-amber-400 to-sky-400 opacity-80 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo + brand */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-[#e16928] to-amber-400 text-white shadow-[0_10px_25px_rgba(234,88,12,0.55)]">
            <GiRocketThruster className="text-xl" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span
              className={`text-sm font-semibold tracking-wide ${
                darkMode ? "text-slate-100" : "text-slate-900"
              }`}
            >
              Shubham Portfolio
            </span>
            <span className="text-[0.7rem] text-slate-500">
              Web Developer & UI Engineer
            </span>
          </div>
        </motion.div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-3 lg:gap-5 font-medium">
          {[...navLinks, { name: adminLoggedIn ? "Logout" : "Admin", to: "admin" }].map(
            (link, index) => (
              <motion.li
                key={link.name}
                className="relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  to={link.to !== "admin" ? link.to : ""}
                  smooth={true}
                  duration={600}
                  offset={-80}
                  spy={true}
                  className={`
                    px-3 py-1.5 rounded-full text-sm
                    transition-all duration-300
                    ${
                      darkMode
                        ? "text-slate-200 hover:text-amber-300 hover:bg-slate-800/70"
                        : "text-slate-800 hover:text-indigo-700 hover:bg-slate-100"
                    }
                  `}
                  activeClass={
                    darkMode
                      ? "bg-slate-900 text-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.35)]"
                      : "bg-white text-indigo-700 shadow-[0_12px_30px_rgba(79,70,229,0.22)]"
                  }
                  onClick={
                    link.to === "admin"
                      ? (e) => {
                          e.preventDefault();
                          if (link.name === "Admin") onAdminLoginClick();
                          if (link.name === "Logout") onLogout();
                        }
                      : undefined
                  }
                >
                  {link.name}
                </Link>

                {/* underline hover */}
                <span
                  className="
                    pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2
                    h-[2px] w-0 rounded-full
                    bg-gradient-to-r from-[#e16928] via-orange-400 to-amber-300
                    transition-all duration-300 group-hover:w-6
                  "
                />
              </motion.li>
            )
          )}

          {/* Theme Toggle */}
          <motion.button
            onClick={() => setDarkMode((prev) => !prev)}
            className={`
              ml-2 p-2 rounded-full border
              transition-colors duration-500
              ${
                darkMode
                  ? "bg-slate-900 border-slate-700 hover:border-amber-400"
                  : "bg-white/80 border-slate-200 hover:border-indigo-400"
              }
              shadow-sm
            `}
            whileTap={{ scale: 0.9, rotate: 20 }}
            whileHover={{ scale: 1.08 }}
          >
            {darkMode ? (
              <FaSun className="text-yellow-400 text-lg" />
            ) : (
              <FaMoon className="text-slate-800 text-lg" />
            )}
          </motion.button>
        </ul>

        {/* Mobile Hamburger */}
        <div
          className={`
            md:hidden text-2xl cursor-pointer transition-colors duration-500
            ${darkMode ? "text-slate-100" : "text-slate-900"}
          `}
          onClick={toggleMenu}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={`
              md:hidden absolute w-full top-full left-0 flex flex-col items-center
              space-y-5 py-6 font-medium shadow-2xl backdrop-blur-xl
              border-b border-white/15
              ${
                darkMode
                  ? "bg-[#020617]/98 text-gray-200"
                  : "bg-gradient-to-b from-white/95 via-slate-50/95 to-indigo-100/90 text-slate-900"
              }
            `}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {[...navLinks, { name: adminLoggedIn ? "Logout" : "Admin", to: "admin" }].map(
              (link, index) => (
                <motion.li
                  key={link.name}
                  className={`
                    cursor-pointer transition-all duration-300
                    ${
                      darkMode ? "hover:text-amber-300" : "hover:text-indigo-700"
                    }
                  `}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.08 + 0.15 }}
                  onClick={() => {
                    if (link.name === "Admin") onAdminLoginClick();
                    if (link.name === "Logout") onLogout();
                  }}
                >
                  <Link
                    to={link.to !== "admin" ? link.to : ""}
                    smooth={true}
                    duration={600}
                    offset={-80}
                    spy={true}
                    className="px-4 py-2 rounded-full text-base"
                    activeClass={
                      darkMode
                        ? "bg-slate-900 text-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.25)]"
                        : "bg-white text-indigo-700 shadow-[0_10px_25px_rgba(79,70,229,0.2)]"
                    }
                    onClick={
                      link.to === "admin"
                        ? (e) => {
                            e.preventDefault();
                            setIsOpen(false);
                            if (link.name === "Admin") onAdminLoginClick();
                            if (link.name === "Logout") onLogout();
                          }
                        : () => setIsOpen(false)
                    }
                  >
                    {link.name}
                  </Link>
                </motion.li>
              )
            )}

            {/* Theme Toggle Mobile */}
            <motion.button
              onClick={() => setDarkMode((prev) => !prev)}
              className={`
                mt-1 p-3 rounded-full border
                transition-colors duration-500
                ${
                  darkMode
                    ? "bg-slate-900 border-slate-700"
                    : "bg-white/90 border-slate-200"
                }
              `}
              whileTap={{ scale: 0.9, rotate: 20 }}
            >
              {darkMode ? (
                <FaSun className="text-yellow-400 text-xl" />
              ) : (
                <FaMoon className="text-slate-800 text-xl" />
              )}
            </motion.button>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
