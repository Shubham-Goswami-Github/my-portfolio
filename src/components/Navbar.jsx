import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FiSun, FiMoon, FiLogOut, FiUser } from "react-icons/fi";
import { RiHome5Line, RiUser3Line, RiCodeSSlashLine, RiFolderOpenLine } from "react-icons/ri";

/* -------------------- INJECT NAVBAR STYLES -------------------- */
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('navbar-premium-styles');
  if (!existingStyle) {
    const style = document.createElement("style");
    style.id = 'navbar-premium-styles';
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');
      
      .nav-glass {
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }
      
      .nav-glass-light {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }
      
      .nav-link-hover::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%) scaleX(0);
        width: 100%;
        height: 1px;
        background: linear-gradient(90deg, transparent, #C9A86C, transparent);
        transition: transform 0.3s ease;
      }
      
      .nav-link-hover:hover::after {
        transform: translateX(-50%) scaleX(1);
      }
      
      .menu-btn-glow {
        box-shadow: 0 0 20px rgba(201, 168, 108, 0.2),
                    0 4px 15px rgba(0, 0, 0, 0.3);
      }
      
      .menu-btn-glow:hover {
        box-shadow: 0 0 30px rgba(201, 168, 108, 0.35),
                    0 6px 20px rgba(0, 0, 0, 0.4);
      }
      
      .gold-border {
        border: 1px solid rgba(201, 168, 108, 0.3);
      }
      
      .gold-border:hover {
        border-color: rgba(201, 168, 108, 0.6);
      }
      
      .nav-active-indicator {
        background: linear-gradient(135deg, #C9A86C, #D4AF37);
      }
    `;
    document.head.appendChild(style);
  }
}

/* -------------------- NAV LINKS DATA -------------------- */
const navLinks = [
  { name: "Home", to: "hero", icon: RiHome5Line },
  { name: "About", to: "about", icon: RiUser3Line },
  { name: "Skills", to: "skills", icon: RiCodeSSlashLine },
  { name: "Projects", to: "projects", icon: RiFolderOpenLine },
];

/* -------------------- MAIN NAVBAR COMPONENT -------------------- */
const Navbar = ({ onAdminLoginClick, adminLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
  );
  const [activeSection, setActiveSection] = useState("hero");
  
  const hideTimeoutRef = useRef(null);
  const navRef = useRef(null);

  // Toggle menu
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  // Show navbar and auto-hide after delay
  const showNavbar = useCallback(() => {
    setIsNavVisible(true);
    
    // Clear existing timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    
    // Set new hide timeout (3 seconds)
    hideTimeoutRef.current = setTimeout(() => {
      setIsNavVisible(false);
      setIsMenuOpen(false);
    }, 3000);
  }, []);

  // Toggle navbar visibility
  const toggleNavbar = () => {
    if (isNavVisible) {
      setIsNavVisible(false);
      setIsMenuOpen(false);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    } else {
      showNavbar();
    }
  };

  // Keep navbar visible while interacting
  const keepNavbarVisible = () => {
    if (isNavVisible) {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        setIsNavVisible(false);
        setIsMenuOpen(false);
      }, 3000);
    }
  };

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

  /* ---------------- CLEANUP TIMEOUT ---------------- */
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  /* ---------------- CLOSE MENU ON OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Animation variants
  const navVariants = {
    hidden: { 
      y: -100, 
      opacity: 0,
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const menuButtonVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0 
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "backOut"
      }
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <>
      {/* ============ FLOATING MENU BUTTON (When navbar is hidden) ============ */}
      <AnimatePresence>
        {!isNavVisible && (
          <motion.button
            className={`
              fixed top-6 right-6 z-[100] p-4 rounded-full
              menu-btn-glow gold-border
              transition-all duration-300
              ${darkMode 
                ? 'bg-black/90 text-[#C9A86C]' 
                : 'bg-white/95 text-amber-700'
              }
            `}
            variants={menuButtonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={toggleNavbar}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <HiMenuAlt3 className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ============ MAIN NAVBAR ============ */}
      <AnimatePresence>
        {isNavVisible && (
          <motion.nav
            ref={navRef}
            className={`
              fixed top-0 left-0 w-full z-[100]
              ${darkMode ? 'nav-glass' : 'nav-glass-light'}
            `}
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseEnter={keepNavbarVisible}
            onMouseMove={keepNavbarVisible}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {/* Bottom accent line */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C9A86C]/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16 lg:h-18">
                
                {/* Logo */}
                <motion.div
                  className="flex items-center gap-3 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Logo Icon */}
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center
                    bg-gradient-to-br from-[#C9A86C] to-[#A68B4B]
                    shadow-[0_4px_15px_rgba(201,168,108,0.3)]
                  `}>
                    <span className="text-black font-bold text-lg font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      S
                    </span>
                  </div>
                  
                  {/* Brand Text - Hidden on mobile */}
                  <div className="hidden sm:flex flex-col">
                    <span className={`
                      text-sm font-semibold tracking-wide
                      ${darkMode ? 'text-white' : 'text-neutral-900'}
                    `} style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Shubham
                    </span>
                    <span className={`
                      text-[10px] tracking-wider uppercase
                      ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}
                    `}>
                      Portfolio
                    </span>
                  </div>
                </motion.div>

                {/* Desktop Navigation Links */}
                <ul className="hidden lg:flex items-center gap-1">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      custom={index}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        to={link.to}
                        smooth={true}
                        duration={600}
                        offset={-80}
                        spy={true}
                        onSetActive={() => setActiveSection(link.to)}
                        className={`
                          relative px-4 py-2 rounded-lg text-sm font-medium
                          transition-all duration-300 cursor-pointer
                          nav-link-hover
                          ${activeSection === link.to
                            ? darkMode 
                              ? 'text-[#C9A86C] bg-[#C9A86C]/10' 
                              : 'text-amber-700 bg-amber-50'
                            : darkMode
                              ? 'text-neutral-400 hover:text-white hover:bg-white/5'
                              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                          }
                        `}
                        onClick={() => {
                          keepNavbarVisible();
                        }}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}

                  {/* Admin/Logout Button */}
                  <motion.li
                    custom={navLinks.length}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <button
                      onClick={() => {
                        if (adminLoggedIn) onLogout();
                        else onAdminLoginClick();
                        keepNavbarVisible();
                      }}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                        transition-all duration-300
                        ${darkMode
                          ? 'text-neutral-400 hover:text-[#C9A86C] hover:bg-[#C9A86C]/10'
                          : 'text-neutral-600 hover:text-amber-700 hover:bg-amber-50'
                        }
                      `}
                    >
                      {adminLoggedIn ? (
                        <>
                          <FiLogOut className="w-4 h-4" />
                          Logout
                        </>
                      ) : (
                        <>
                          <FiUser className="w-4 h-4" />
                          Admin
                        </>
                      )}
                    </button>
                  </motion.li>
                </ul>

                {/* Right Side Actions */}
                <div className="flex items-center gap-3">
                  
                  {/* Theme Toggle */}
                  <motion.button
                    onClick={() => {
                      setDarkMode(prev => !prev);
                      keepNavbarVisible();
                    }}
                    className={`
                      p-2.5 rounded-xl border transition-all duration-300
                      ${darkMode
                        ? 'border-neutral-800 hover:border-[#C9A86C]/50 bg-neutral-900/50 text-[#C9A86C]'
                        : 'border-neutral-200 hover:border-amber-300 bg-white text-amber-600'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95, rotate: 15 }}
                  >
                    {darkMode ? (
                      <FiSun className="w-4 h-4" />
                    ) : (
                      <FiMoon className="w-4 h-4" />
                    )}
                  </motion.button>

                  {/* Close/Hide Navbar Button */}
                  <motion.button
                    onClick={toggleNavbar}
                    className={`
                      p-2.5 rounded-xl border transition-all duration-300
                      ${darkMode
                        ? 'border-neutral-800 hover:border-red-500/50 bg-neutral-900/50 text-neutral-400 hover:text-red-400'
                        : 'border-neutral-200 hover:border-red-300 bg-white text-neutral-500 hover:text-red-500'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IoClose className="w-4 h-4" />
                  </motion.button>

                  {/* Mobile Menu Toggle */}
                  <motion.button
                    className={`
                      lg:hidden p-2.5 rounded-xl border transition-all duration-300
                      ${darkMode
                        ? 'border-neutral-800 bg-neutral-900/50 text-[#C9A86C]'
                        : 'border-neutral-200 bg-white text-amber-600'
                      }
                    `}
                    onClick={toggleMenu}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isMenuOpen ? (
                      <IoClose className="w-5 h-5" />
                    ) : (
                      <HiMenuAlt3 className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* ============ MOBILE MENU ============ */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className={`
                    lg:hidden absolute top-full left-0 w-full
                    border-t
                    ${darkMode 
                      ? 'nav-glass border-neutral-800/50' 
                      : 'nav-glass-light border-neutral-200'
                    }
                  `}
                  variants={mobileMenuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="max-w-7xl mx-auto px-4 py-6">
                    <ul className="space-y-2">
                      {navLinks.map((link, index) => {
                        const Icon = link.icon;
                        return (
                          <motion.li
                            key={link.name}
                            custom={index}
                            variants={linkVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <Link
                              to={link.to}
                              smooth={true}
                              duration={600}
                              offset={-80}
                              spy={true}
                              className={`
                                flex items-center gap-3 px-4 py-3 rounded-xl
                                transition-all duration-300 cursor-pointer
                                ${activeSection === link.to
                                  ? darkMode
                                    ? 'bg-[#C9A86C]/10 text-[#C9A86C]'
                                    : 'bg-amber-50 text-amber-700'
                                  : darkMode
                                    ? 'text-neutral-400 hover:bg-white/5 hover:text-white'
                                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                                }
                              `}
                              onClick={() => {
                                setIsMenuOpen(false);
                                keepNavbarVisible();
                              }}
                            >
                              <Icon className="w-5 h-5" />
                              <span className="font-medium">{link.name}</span>
                            </Link>
                          </motion.li>
                        );
                      })}

                      {/* Admin/Logout - Mobile */}
                      <motion.li
                        custom={navLinks.length}
                        variants={linkVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <button
                          onClick={() => {
                            if (adminLoggedIn) onLogout();
                            else onAdminLoginClick();
                            setIsMenuOpen(false);
                          }}
                          className={`
                            w-full flex items-center gap-3 px-4 py-3 rounded-xl
                            transition-all duration-300
                            ${darkMode
                              ? 'text-neutral-400 hover:bg-white/5 hover:text-[#C9A86C]'
                              : 'text-neutral-600 hover:bg-neutral-100 hover:text-amber-700'
                            }
                          `}
                        >
                          {adminLoggedIn ? (
                            <>
                              <FiLogOut className="w-5 h-5" />
                              <span className="font-medium">Logout</span>
                            </>
                          ) : (
                            <>
                              <FiUser className="w-5 h-5" />
                              <span className="font-medium">Admin</span>
                            </>
                          )}
                        </button>
                      </motion.li>
                    </ul>

                    {/* Divider */}
                    <div className={`
                      my-4 h-px
                      ${darkMode ? 'bg-neutral-800' : 'bg-neutral-200'}
                    `} />

                    {/* Theme Toggle - Mobile */}
                    <div className="flex items-center justify-between px-4">
                      <span className={`
                        text-sm font-medium
                        ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}
                      `}>
                        Theme
                      </span>
                      <motion.button
                        onClick={() => {
                          setDarkMode(prev => !prev);
                          keepNavbarVisible();
                        }}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-xl border
                          transition-all duration-300
                          ${darkMode
                            ? 'border-neutral-800 bg-neutral-900/50 text-[#C9A86C]'
                            : 'border-neutral-200 bg-white text-amber-600'
                          }
                        `}
                        whileTap={{ scale: 0.95 }}
                      >
                        {darkMode ? (
                          <>
                            <FiSun className="w-4 h-4" />
                            <span className="text-sm">Light</span>
                          </>
                        ) : (
                          <>
                            <FiMoon className="w-4 h-4" />
                            <span className="text-sm">Dark</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[#C9A86C]/30 to-transparent" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ============ PROGRESS INDICATOR (Optional - Shows when scrolling) ============ */}
      <ScrollProgress darkMode={darkMode} />
    </>
  );
};

/* -------------------- SCROLL PROGRESS INDICATOR -------------------- */
const ScrollProgress = ({ darkMode }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 h-[2px] z-[99] bg-gradient-to-r from-[#C9A86C] via-[#D4AF37] to-[#C9A86C]"
      style={{ width: `${progress}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: progress > 0 ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    />
  );
};

export default Navbar;