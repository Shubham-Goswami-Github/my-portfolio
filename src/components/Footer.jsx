import { motion, useReducedMotion } from "framer-motion";
import AnimatedPlanetStarBackground from "./AnimatedPlanetStarBackground";
import { useEffect, useState, useContext } from "react";
import { LenisContext } from "../LenisProvider";
import { 
  Sparkles, 

  Mail,
  MapPin,
  Phone,
 
} from "lucide-react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaRobot,
  FaCode,
  FaHeart
} from "react-icons/fa";

/* -------------------- SHIMMER STYLES -------------------- */
const footerShimmerStyle = document.createElement("style");
footerShimmerStyle.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800;900&display=swap');

@keyframes shimmer-footer {
  0% { background-position: 0% 0%; }
  50% { background-position: 150% 0%; }
  100% { background-position: 0% 0%; }
}

@keyframes float-footer {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes pulse-border {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.shimmer-text-footer {
  background-image: linear-gradient(90deg, #e16928, #fbbf24, #f59e0b, #e16928);
  background-size: 300% 100%;
  animation: shimmer-footer 6s infinite linear;
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-card-shine::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: 0.6s;
  pointer-events: none;
}

.footer-card-shine:hover::before {
  left: 100%;
}

.float-animation {
  animation: float-footer 3s ease-in-out infinite;
}
`;
if (!document.querySelector('#footer-shimmer-style')) {
  footerShimmerStyle.id = 'footer-shimmer-style';
  document.head.appendChild(footerShimmerStyle);
}

/* -------------------- DATA -------------------- */
const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { 
    icon: FaGithub, 
    link: "https://github.com/Shubham-Goswami-Github",
    label: "GitHub",
    color: "hover:bg-gray-800 hover:text-white"
  },
  { 
    icon: FaLinkedin, 
    link: "https://www.linkedin.com/in/shubham-das-goswami-b66997254/",
    label: "LinkedIn",
    color: "hover:bg-blue-600 hover:text-white"
  },
  { 
    icon: FaTwitter, 
    link: "https://x.com/Shubham_S8990",
    label: "Twitter",
    color: "hover:bg-sky-500 hover:text-white"
  },
  { 
    icon: FaInstagram, 
    link: "https://www.instagram.com/sacrastic_shubham/",
    label: "Instagram",
    color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white"
  },
];

const contactInfo = [
  { icon: Mail, text: "shubhamsuraj****@gmail.com", href: "mailto:shubhamsuraj****@gmail.com" },
  { icon: MapPin, text: "Jharkhand, India", href: "#" },
  { icon: Phone, text: "+91 775999****", href: "tel:+91775999****" },
];

/* -------------------- FLOATING DECORATIVE ELEMENTS -------------------- */
const FloatingElement = ({ delay, duration, className }) => (
  <motion.div
    className={`absolute rounded-full pointer-events-none ${className}`}
    animate={{
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: duration || 8,
      repeat: Infinity,
      delay: delay || 0,
      ease: "easeInOut",
    }}
  />
);

/* -------------------- SOCIAL LINK COMPONENT -------------------- */
const SocialLink = ({ social, index }) => {
  const Icon = social.icon;
  
  return (
    <motion.a
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      className={`
        group relative p-3 rounded-xl
        bg-white/60 dark:bg-white/5 backdrop-blur-sm
        border border-white/40 dark:border-white/10
        text-gray-700 dark:text-gray-300
        transition-all duration-300
        ${social.color}
        hover:border-[#e16928]/40 hover:shadow-lg
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
    </motion.a>
  );
};

/* -------------------- QUICK LINK COMPONENT -------------------- */
const QuickLink = ({ link, index }) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: 0.4 }}
  >
    <motion.a
      href={link.href}
      className="group inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 
                 hover:text-[#e16928] dark:hover:text-orange-400
                 transition-colors duration-300 font-['Inter',sans-serif]"
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#e16928]/50 
                      group-hover:bg-[#e16928] group-hover:scale-125
                      transition-all duration-300" />
      <span className="relative">
        {link.label}
        <span className="absolute left-0 bottom-0 w-0 h-[1px] 
                        bg-[#e16928] group-hover:w-full
                        transition-all duration-300" />
      </span>
    </motion.a>
  </motion.li>
);

/* -------------------- CONTACT INFO COMPONENT -------------------- */
const ContactItem = ({ item, index }) => {
  const Icon = item.icon;
  
  return (
    <motion.a
      href={item.href}
      className="group flex items-center gap-3 text-gray-600 dark:text-gray-400
                 hover:text-[#e16928] dark:hover:text-orange-400
                 transition-colors duration-300"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ x: 3 }}
    >
      <div className="p-2 rounded-lg bg-[#e16928]/10 
                     group-hover:bg-[#e16928]/20 transition-colors duration-300">
        <Icon className="w-4 h-4 text-[#e16928]" />
      </div>
      <span className="text-sm font-['Inter',sans-serif]">{item.text}</span>
    </motion.a>
  );
};

/* -------------------- VISITOR COUNTER COMPONENT -------------------- */
const VisitorCounter = ({ count }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      className="relative p-4 sm:p-5 rounded-2xl
                 bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl
                 border border-white/40 dark:border-white/10
                 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                 footer-card-shine overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      {/* Gradient border */}
      <div className="absolute inset-0 rounded-2xl opacity-50 pointer-events-none"
           style={{
             background: 'linear-gradient(135deg, rgba(225,105,40,0.3), rgba(250,204,21,0.3))',
             padding: '1px',
             WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
             WebkitMaskComposite: 'xor',
             maskComposite: 'exclude',
           }} />
      
      <div className="flex items-center gap-4">
        <motion.div
          className={`p-3 rounded-xl bg-gradient-to-br from-[#e16928]/20 to-yellow-400/20
                     ${!shouldReduceMotion ? 'float-animation' : ''}`}
        >
          <FaRobot className="w-8 h-8 text-[#e16928] dark:text-orange-400" />
        </motion.div>
        
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 
                       font-medium font-['Inter',sans-serif] mb-1">
            Total Visitors
          </p>
          <motion.p
            key={count}
            className="text-2xl sm:text-3xl font-bold font-['Montserrat',sans-serif]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <span className="shimmer-text-footer text-transparent bg-clip-text">
              {count.toLocaleString()}
            </span>
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

/* -------------------- SCROLL TO TOP BUTTON -------------------- */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  
};

/* -------------------- MAIN FOOTER COMPONENT -------------------- */
const Footer = () => {
  const lenisRef = useContext(LenisContext);
  const shouldReduceMotion = useReducedMotion();
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(window.scrollY, { immediate: true });
    }
  }, [lenisRef]);

  // Visitor counter logic
  useEffect(() => {
    const stored = localStorage.getItem("visitors");
    let count = stored ? parseInt(stored) + 1 : 1;
    localStorage.setItem("visitors", count);
    setVisitors(count);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <motion.footer
        className="relative pt-16 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden
                   bg-gradient-to-br from-white via-gray-50 to-orange-50/30 
                   dark:from-gray-950 dark:via-black dark:to-gray-900
                   transition-colors duration-700"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <AnimatedPlanetStarBackground />
        </div>

        {/* Decorative floating elements */}
        {!shouldReduceMotion && (
          <>
            <FloatingElement 
              delay={0} 
              duration={10} 
              className="w-64 h-64 bg-gradient-to-r from-[#e16928]/15 to-yellow-400/15 blur-3xl top-0 -left-32" 
            />
            <FloatingElement 
              delay={2} 
              duration={12} 
              className="w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-3xl bottom-0 -right-36" 
            />
          </>
        )}

        {/* Top Decorative Border */}
        <div className="absolute top-0 left-0 right-0 h-1 
                       bg-gradient-to-r from-transparent via-[#e16928] to-transparent opacity-50" />

        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Top Section - Logo & Tagline */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold 
                         font-['Montserrat',sans-serif] mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="shimmer-text-footer text-transparent bg-clip-text">
                Shubham Goswami
              </span>
            </motion.h2>
            <motion.p
              className="text-gray-600 dark:text-gray-400 text-sm sm:text-base
                        font-['Inter',sans-serif] max-w-md mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Web Developer & Designer crafting beautiful digital experiences
            </motion.p>

            {/* Decorative underline */}
            <motion.div
              className="mt-4 mx-auto w-20 h-1 rounded-full 
                        bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            />
          </motion.div>

          {/* Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12">

            {/* About Section */}
            <motion.div
              className="lg:col-span-1 space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white
                           font-['Poppins',sans-serif] flex items-center gap-2">
                <span className="w-8 h-1 rounded-full bg-gradient-to-r from-[#e16928] to-yellow-400" />
                About Me
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed
                          font-['Inter',sans-serif]">
                A passionate <span className="text-[#e16928] dark:text-orange-400 font-medium">
                Full Stack Developer</span> creating immersive, animated, and responsive 
                digital experiences using modern technologies.
              </p>

              {/* Tech Stack Mini */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['React', 'Tailwind', 'Node.js'].map((tech, i) => (
                  <span key={tech} 
                        className="px-2.5 py-1 text-xs rounded-lg
                                  bg-[#e16928]/10 text-[#e16928] dark:text-orange-400
                                  border border-[#e16928]/20 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white
                           font-['Poppins',sans-serif] flex items-center gap-2">
                <span className="w-8 h-1 rounded-full bg-gradient-to-r from-[#e16928] to-yellow-400" />
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link, index) => (
                  <QuickLink key={link.label} link={link} index={index} />
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white
                           font-['Poppins',sans-serif] flex items-center gap-2">
                <span className="w-8 h-1 rounded-full bg-gradient-to-r from-[#e16928] to-yellow-400" />
                Contact
              </h3>
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <ContactItem key={item.text} item={item} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Social & Visitors */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {/* Social Links */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white
                             font-['Poppins',sans-serif] flex items-center gap-2 mb-4">
                  <span className="w-8 h-1 rounded-full bg-gradient-to-r from-[#e16928] to-yellow-400" />
                  Follow Me
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <SocialLink key={social.label} social={social} index={index} />
                  ))}
                </div>
              </div>

              {/* Visitor Counter */}
              <VisitorCounter count={visitors} />
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />

          {/* Bottom Section */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {/* Copyright */}
            <p className="text-gray-500 dark:text-gray-400 text-sm font-['Inter',sans-serif]
                         flex items-center gap-1.5 flex-wrap justify-center">
              <span>&copy; {currentYear}</span>
              <span className="shimmer-text-footer text-transparent bg-clip-text font-semibold">
                Shubham Goswami
              </span>
              <span>• All rights reserved</span>
            </p>

            {/* Made with Love */}
            <motion.p
              className="text-gray-500 dark:text-gray-400 text-sm font-['Inter',sans-serif]
                        flex items-center gap-1.5"
              whileHover={{ scale: 1.02 }}
            >
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FaHeart className="w-4 h-4 text-red-500" />
              </motion.span>
              <span>&</span>
              <FaCode className="w-4 h-4 text-[#e16928]" />
              <span>in India</span>
            </motion.p>
          </motion.div>

          {/* Bottom decorative element */}
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#e16928]" />
              <Sparkles className="w-5 h-5 text-[#e16928] animate-pulse" />
              <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-yellow-400" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-20 
                       bg-gradient-to-t from-white dark:from-gray-950 to-transparent 
                       pointer-events-none z-0" />
      </motion.footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
};

export default Footer;