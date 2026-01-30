import { motion, useReducedMotion } from "framer-motion";
import { memo, useEffect, useState, useContext, useMemo } from "react";
import { LenisContext } from "../LenisProvider";
import { 
  Sparkles, 
  Mail, 
  MapPin, 
  Phone,
  ArrowUpRight,
  Heart,
  Code2,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram,
  FaRobot,
} from "react-icons/fa";

/* -------------------- INJECT PREMIUM STYLES -------------------- */
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('footer-premium-styles');
  if (!existingStyle) {
    const style = document.createElement("style");
    style.id = 'footer-premium-styles';
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
      
      :root {
        --footer-gold: #C9A86C;
        --footer-gold-light: #E8D5B5;
        --footer-gold-dark: #A68B4B;
      }
      
      .footer-bg-pure-black {
        background-color: #000000;
      }
      
      .footer-text-gold {
        color: var(--footer-gold);
      }
      
      .footer-noise-texture {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        opacity: 0.015;
      }
      
      .footer-gold-gradient-text {
        background: linear-gradient(135deg, #D4AF37 0%, #C9A86C 30%, #E8D5B5 50%, #C9A86C 70%, #B8956A 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .footer-glow-line {
        background: linear-gradient(90deg, transparent, rgba(201, 168, 108, 0.5), transparent);
      }
      
      .footer-accent-dot {
        width: 6px;
        height: 6px;
        background: var(--footer-gold);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--footer-gold);
      }
      
      @keyframes footer-pulse-slow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      .footer-animate-pulse-slow {
        animation: footer-pulse-slow 3s ease-in-out infinite;
      }
      
      .footer-btn-gold {
        background: linear-gradient(135deg, #C9A86C 0%, #D4AF37 50%, #C9A86C 100%);
        box-shadow: 0 4px 20px rgba(201, 168, 108, 0.2);
      }
      
      .footer-btn-gold:hover {
        box-shadow: 0 6px 30px rgba(201, 168, 108, 0.3);
      }
      
      .footer-border-gold {
        border: 1px solid rgba(201, 168, 108, 0.3);
      }
      
      .footer-card-glass {
        background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
        border: 1px solid rgba(255, 255, 255, 0.06);
        transition: all 0.3s ease;
      }
      
      .footer-card-glass:hover {
        background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
        border-color: rgba(201, 168, 108, 0.2);
      }
      
      .footer-link-hover {
        transition: all 0.3s ease;
      }
      
      .footer-link-hover:hover {
        color: var(--footer-gold);
        transform: translateX(4px);
      }
      
      .footer-social-btn {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        transition: all 0.3s ease;
      }
      
      .footer-social-btn:hover {
        border-color: rgba(201, 168, 108, 0.5);
        transform: translateY(-3px);
      }
    `;
    document.head.appendChild(style);
  }
}

/* -------------------- STATIC DATA -------------------- */
const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { 
    icon: FaGithub, 
    link: "https://github.com/Shubham-Goswami-Github", 
    label: "GitHub",
    color: "#ffffff"
  },
  { 
    icon: FaLinkedin, 
    link: "https://www.linkedin.com/in/shubham-das-goswami-b66997254/", 
    label: "LinkedIn",
    color: "#0A66C2"
  },
  { 
    icon: FaTwitter, 
    link: "https://x.com/Shubham_S8990", 
    label: "Twitter",
    color: "#1DA1F2"
  },
  { 
    icon: FaInstagram, 
    link: "https://www.instagram.com/sacrastic_shubham/", 
    label: "Instagram",
    color: "#E4405F"
  },
];

const contactInfo = [
  { icon: Mail, text: "shubhamsuraj****@gmail.com", href: "mailto:shubhamsuraj****@gmail.com" },
  { icon: MapPin, text: "Jharkhand, India", href: "#" },
  { icon: Phone, text: "+91 775999****", href: "tel:+91775999****" },
];

const techStack = ["React", "Tailwind CSS", "Node.js", "Firebase"];

/* -------------------- MEMOIZED COMPONENTS -------------------- */
const SocialLink = memo(({ social }) => {
  const Icon = social.icon;
  return (
    <motion.a
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      className="footer-social-btn p-3 rounded-xl text-neutral-400
                 hover:text-white"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ '--hover-color': social.color }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = social.color + '80';
        e.currentTarget.style.boxShadow = `0 0 20px ${social.color}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  );
});

const QuickLink = memo(({ link, index }) => (
  <motion.li
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
  >
    <a
      href={link.href}
      className="footer-link-hover group inline-flex items-center gap-2 text-neutral-400 text-sm"
    >
      <ChevronRight className="w-3 h-3 footer-text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
      <span>{link.label}</span>
    </a>
  </motion.li>
));

const ContactItem = memo(({ item, index }) => {
  const Icon = item.icon;
  return (
    <motion.a
      href={item.href}
      className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors duration-300"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
    >
      <div className="p-2.5 rounded-lg bg-[#C9A86C]/10 footer-border-gold
                     group-hover:bg-[#C9A86C]/20 transition-colors duration-300">
        <Icon className="w-4 h-4 footer-text-gold" />
      </div>
      <span className="text-sm">{item.text}</span>
    </motion.a>
  );
});

const VisitorCounter = memo(({ count }) => (
  <motion.div 
    className="footer-card-glass p-5 rounded-2xl"
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl footer-btn-gold">
        <FaRobot className="w-7 h-7 text-black" />
      </div>
      <div>
        <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider mb-1">
          Total Visitors
        </p>
        <p className="text-2xl sm:text-3xl font-bold footer-gold-gradient-text"
           style={{ fontFamily: "'Outfit', sans-serif" }}>
          {count.toLocaleString()}
        </p>
      </div>
    </div>
  </motion.div>
));

const TechBadge = memo(({ tech, index }) => (
  <motion.span 
    className="px-3 py-1.5 text-[10px] sm:text-xs font-medium tracking-wider uppercase
               text-neutral-400 border border-neutral-800/80 rounded-full
               bg-neutral-900/30 hover:border-[#C9A86C]/40 hover:text-[#C9A86C]
               transition-all duration-300"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    {tech}
  </motion.span>
));

/* -------------------- SECTION TITLE -------------------- */
const SectionTitle = memo(({ title }) => (
  <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-3 mb-5"
      style={{ fontFamily: "'Outfit', sans-serif" }}>
    <span className="w-8 h-0.5 rounded-full bg-gradient-to-r from-[#C9A86C] to-transparent" />
    {title}
  </h3>
));

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

  // Visitor counter
  useEffect(() => {
    const stored = localStorage.getItem("visitors");
    const count = stored ? parseInt(stored) + 1 : 1;
    localStorage.setItem("visitors", count.toString());
    setVisitors(count);
  }, []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <footer
      className="relative pt-20 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden footer-bg-pure-black"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 footer-noise-texture pointer-events-none z-[1]" />
      
      {/* Subtle ambient glows */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-[#C9A86C]/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] bg-neutral-800/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Top Border Line */}
      <div className="absolute top-0 left-0 right-0 h-px footer-glow-line" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ========== HEADER SECTION ========== */}
        <motion.div 
          className="text-center mb-16 sm:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                           bg-[#C9A86C]/10 footer-border-gold">
              <span className="footer-accent-dot footer-animate-pulse-slow" />
              <Sparkles className="w-4 h-4 footer-text-gold" />
              <span className="text-xs sm:text-sm font-medium footer-text-gold tracking-wider uppercase">
                Let's Connect
              </span>
            </div>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <span className="footer-gold-gradient-text">Shubham Goswami</span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-neutral-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed"
          >
            Web Developer & UI Engineer crafting beautiful digital experiences
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="mt-6 mx-auto w-20 h-px footer-glow-line"
          />
        </motion.div>

        {/* ========== FOOTER GRID ========== */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* About Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-5">
            <SectionTitle title="About Me" />
            <p className="text-neutral-400 text-sm leading-relaxed">
              A passionate <span className="footer-text-gold font-medium">Full Stack Developer</span> creating 
              immersive, animated, and responsive digital experiences using modern technologies.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {techStack.map((tech, index) => (
                <TechBadge key={tech} tech={tech} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-5">
            <SectionTitle title="Quick Links" />
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <QuickLink key={link.label} link={link} index={index} />
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-5">
            <SectionTitle title="Contact" />
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <ContactItem key={item.text} item={item} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Social & Visitors */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <SectionTitle title="Follow Me" />
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <SocialLink key={social.label} social={social} />
                ))}
              </div>
            </div>
            <VisitorCounter count={visitors} />
          </motion.div>
        </motion.div>

        {/* ========== DIVIDER ========== */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent mb-8" />

        {/* ========== BOTTOM SECTION ========== */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-neutral-500 text-xs sm:text-sm flex items-center gap-1.5 flex-wrap justify-center">
            <span>&copy; {currentYear}</span>
            <span className="footer-gold-gradient-text font-semibold">Shubham Goswami</span>
            <span>• All rights reserved</span>
          </p>

          <p className="text-neutral-500 text-xs sm:text-sm flex items-center gap-2">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>&</span>
            <Code2 className="w-4 h-4 footer-text-gold" />
            <span>in India</span>
          </p>
        </motion.div>

        {/* ========== BOTTOM DECORATION ========== */}
        <motion.div 
          className="flex justify-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-neutral-800" />
            <div className="footer-accent-dot" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-neutral-800" />
          </div>
        </motion.div>

        {/* Corner accents */}
        <div className="hidden lg:block absolute top-8 left-8 w-12 h-12">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-neutral-800/50 to-transparent" />
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-neutral-800/50 to-transparent" />
        </div>
        
        <div className="hidden lg:block absolute bottom-8 right-8 w-12 h-12">
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-neutral-800/50 to-transparent" />
          <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-neutral-800/50 to-transparent" />
        </div>
      </div>

      {/* ========== SCROLL TO TOP BUTTON ========== */}
      <motion.button
        className="fixed bottom-6 right-6 p-3 rounded-xl footer-btn-gold
                   shadow-lg z-50 group"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUpRight className="w-5 h-5 text-black group-hover:rotate-[-45deg] transition-transform duration-300" />
      </motion.button>
    </footer>
  );
};

export default memo(Footer);