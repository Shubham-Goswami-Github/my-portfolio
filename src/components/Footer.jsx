import { motion, useReducedMotion } from "framer-motion";
import { memo, useEffect, useState, useContext, useMemo, lazy, Suspense } from "react";
import { LenisContext } from "../LenisProvider";
import { Sparkles, Mail, MapPin, Phone } from "lucide-react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaRobot,
  FaCode,
  FaHeart
} from "react-icons/fa";

// Lazy load heavy background component
const AnimatedPlanetStarBackground = lazy(() => import("./AnimatedPlanetStarBackground"));

/* -------------------- STATIC DATA (moved outside component) -------------------- */
const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: FaGithub, link: "https://github.com/Shubham-Goswami-Github", label: "GitHub", hoverClass: "hover:bg-gray-800" },
  { icon: FaLinkedin, link: "https://www.linkedin.com/in/shubham-das-goswami-b66997254/", label: "LinkedIn", hoverClass: "hover:bg-blue-600" },
  { icon: FaTwitter, link: "https://x.com/Shubham_S8990", label: "Twitter", hoverClass: "hover:bg-sky-500" },
  { icon: FaInstagram, link: "https://www.instagram.com/sacrastic_shubham/", label: "Instagram", hoverClass: "hover:bg-pink-500" },
];

const contactInfo = [
  { icon: Mail, text: "shubhamsuraj****@gmail.com", href: "mailto:shubhamsuraj****@gmail.com" },
  { icon: MapPin, text: "Jharkhand, India", href: "#" },
  { icon: Phone, text: "+91 775999****", href: "tel:+91775999****" },
];

/* -------------------- SIMPLE CSS (inline styles instead of dynamic injection) -------------------- */
const shimmerStyle = {
  backgroundImage: 'linear-gradient(90deg, #e16928, #fbbf24, #f59e0b, #e16928)',
  backgroundSize: '300% 100%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

/* -------------------- OPTIMIZED SIMPLE ANIMATION VARIANTS -------------------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.05 } }
};

/* -------------------- MEMOIZED COMPONENTS -------------------- */
const SocialLink = memo(({ social }) => {
  const Icon = social.icon;
  return (
    <a
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      className={`p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-white/30 
                 dark:border-white/10 text-gray-700 dark:text-gray-300 
                 transition-all duration-200 hover:text-white hover:scale-105 
                 hover:shadow-lg ${social.hoverClass}`}
    >
      <Icon className="w-5 h-5" />
    </a>
  );
});

const QuickLink = memo(({ link }) => (
  <li>
    <a
      href={link.href}
      className="group inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 
                 hover:text-[#e16928] transition-colors duration-200"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#e16928]/50 
                      group-hover:bg-[#e16928] transition-colors duration-200" />
      <span className="hover:translate-x-1 transition-transform duration-200">
        {link.label}
      </span>
    </a>
  </li>
));

const ContactItem = memo(({ item }) => {
  const Icon = item.icon;
  return (
    <a
      href={item.href}
      className="group flex items-center gap-3 text-gray-600 dark:text-gray-400
                 hover:text-[#e16928] transition-colors duration-200"
    >
      <div className="p-2 rounded-lg bg-[#e16928]/10 group-hover:bg-[#e16928]/20 
                     transition-colors duration-200">
        <Icon className="w-4 h-4 text-[#e16928]" />
      </div>
      <span className="text-sm">{item.text}</span>
    </a>
  );
});

const VisitorCounter = memo(({ count }) => (
  <div className="relative p-4 rounded-2xl bg-white/60 dark:bg-white/5 
                 border border-white/30 dark:border-white/10 shadow-sm">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl bg-gradient-to-br from-[#e16928]/20 to-yellow-400/20">
        <FaRobot className="w-8 h-8 text-[#e16928] dark:text-orange-400" />
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
          Total Visitors
        </p>
        <p className="text-2xl sm:text-3xl font-bold" style={shimmerStyle}>
          {count.toLocaleString()}
        </p>
      </div>
    </div>
  </div>
));

const TechBadges = memo(() => (
  <div className="flex flex-wrap gap-2 pt-2">
    {['React', 'Tailwind', 'Node.js'].map((tech) => (
      <span key={tech} 
            className="px-2.5 py-1 text-xs rounded-lg bg-[#e16928]/10 
                      text-[#e16928] dark:text-orange-400 border border-[#e16928]/20 font-medium">
        {tech}
      </span>
    ))}
  </div>
));

/* -------------------- MAIN FOOTER COMPONENT -------------------- */
const Footer = () => {
  const lenisRef = useContext(LenisContext);
  const shouldReduceMotion = useReducedMotion();
  const [visitors, setVisitors] = useState(0);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(window.scrollY, { immediate: true });
    }
  }, [lenisRef]);

  // Visitor counter
  useEffect(() => {
    const stored = localStorage.getItem("visitors");
    const count = stored ? parseInt(stored) + 1 : 1;
    localStorage.setItem("visitors", count.toString());
    setVisitors(count);
  }, []);

  // Delay loading heavy background
  useEffect(() => {
    const timer = setTimeout(() => setShowBackground(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  
  // Simplified motion props
  const motionProps = shouldReduceMotion 
    ? {} 
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" },
        variants: fadeInUp,
        transition: { duration: 0.4 }
      };

  return (
    <footer
      className="relative pt-16 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden
                 bg-gradient-to-br from-white via-gray-50 to-orange-50/30 
                 dark:from-gray-950 dark:via-black dark:to-gray-900"
    >
      {/* Lazy loaded background - only render if not reducing motion */}
      {showBackground && !shouldReduceMotion && (
        <Suspense fallback={null}>
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-50">
            <AnimatedPlanetStarBackground />
          </div>
        </Suspense>
      )}

      {/* Simple gradient overlays instead of animated floating elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#e16928]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 
                     bg-gradient-to-r from-transparent via-[#e16928] to-transparent opacity-50" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header Section */}
        <motion.div className="text-center mb-12 sm:mb-16" {...motionProps}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            <span style={shimmerStyle}>Shubham Goswami</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-md mx-auto">
            Web Developer & Designer crafting beautiful digital experiences
          </p>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full 
                        bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400" />
        </motion.div>

        {/* Footer Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12"
          {...motionProps}
          variants={staggerContainer}
        >
          {/* About Section */}
          <motion.div className="lg:col-span-1 space-y-4" variants={fadeInUp}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-8 h-1 rounded-full bg-gradient-to-r from-[#e16928] to-yellow-400" />
              About Me
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              A passionate <span className="text-[#e16928] dark:text-orange-400 font-medium">
              Full Stack Developer</span> creating immersive, animated, and responsive 
              digital experiences using modern technologies.
            </p>
            <TechBadges />
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-4" variants={fadeInUp}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-8 h-1 rounded-full bg-gradient-to-r from-[#e16928] to-yellow-400" />
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <QuickLink key={link.label} link={link} />
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="space-y-4" variants={fadeInUp}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-8 h-1 rounded-full bg-gradient-to-r from-[#e16928] to-yellow-400" />
              Contact
            </h3>
            <div className="space-y-3">
              {contactInfo.map((item) => (
                <ContactItem key={item.text} item={item} />
              ))}
            </div>
          </motion.div>

          {/* Social & Visitors */}
          <motion.div className="space-y-6" variants={fadeInUp}>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="w-8 h-1 rounded-full bg-gradient-to-r from-[#e16928] to-yellow-400" />
                Follow Me
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <SocialLink key={social.label} social={social} />
                ))}
              </div>
            </div>
            <VisitorCounter count={visitors} />
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1.5 flex-wrap justify-center">
            <span>&copy; {currentYear}</span>
            <span style={shimmerStyle} className="font-semibold">Shubham Goswami</span>
            <span>• All rights reserved</span>
          </p>

          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1.5">
            <span>Made with</span>
            <FaHeart className="w-4 h-4 text-red-500" />
            <span>&</span>
            <FaCode className="w-4 h-4 text-[#e16928]" />
            <span>in India</span>
          </p>
        </div>

        {/* Bottom Decoration */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#e16928]" />
            <Sparkles className="w-5 h-5 text-[#e16928]" />
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-yellow-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);