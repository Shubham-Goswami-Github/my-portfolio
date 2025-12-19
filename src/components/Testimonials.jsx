import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import AnimatedPlanetStarBackground from "./AnimatedPlanetStarBackground";
import { useContext, useEffect, useState } from "react";
import { LenisContext } from "../LenisProvider";
import { 
  Sparkles, 
  Star, 
  Award, 
  Users,
  Trophy,
  Quote,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Heart
} from "lucide-react";

/* -------------------- SHIMMER STYLES -------------------- */
const testimonialsShimmerStyle = document.createElement("style");
testimonialsShimmerStyle.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800;900&display=swap');

@keyframes shimmer-testimonials {
  0% { background-position: 0% 0%; }
  50% { background-position: 150% 0%; }
  100% { background-position: 0% 0%; }
}

@keyframes float-testimonial {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.shimmer-text-testimonials {
  background-image: linear-gradient(90deg, #e16928, #fbbf24, #f59e0b, #e16928);
  background-size: 300% 100%;
  animation: shimmer-testimonials 6s infinite linear;
  -webkit-background-clip: text;
  background-clip: text;
}

.testimonial-card-shine::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.15),
    transparent
  );
  transition: 0.6s;
  pointer-events: none;
}

.testimonial-card-shine:hover::before {
  left: 100%;
}

.scroll-container {
  animation: scroll-left 35s linear infinite;
}

.scroll-container:hover {
  animation-play-state: paused;
}
`;
if (!document.querySelector('#testimonials-shimmer-style')) {
  testimonialsShimmerStyle.id = 'testimonials-shimmer-style';
  document.head.appendChild(testimonialsShimmerStyle);
}

/* -------------------- DATA -------------------- */
const testimonials = [
  {
    name: "Priya Sharma",
    role: "Project Manager, TechServe",
    feedback:
      "He's detail-oriented, creative, and incredibly professional. Shubham consistently delivers beyond expectations and always ensures deadlines are met.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Rohan Mehta",
    role: "UI/UX Designer, Freelance",
    feedback:
      "A highly talented developer with a strong sense of design and interactivity. His work on animations and dark mode design is top-notch!",
    img: "https://randomuser.me/api/portraits/men/47.jpg",
    rating: 5,
  },
  {
    name: "Sneha Kapoor",
    role: "Team Lead, Webverse",
    feedback:
      "Shubham's code is clean, efficient, and beautifully structured. His teamwork and leadership in hackathons have inspired many junior developers.",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
];

const achievements = [
  {
    icon: Award,
    title: "Best Web Design Award",
    description:
      "Recognized for innovative and responsive portfolio design at a regional tech fest.",
    color: "from-orange-500 to-yellow-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
  },
  {
    icon: Users,
    title: "Hackathon Finalist",
    description:
      "Participated in a 36-hour coding event and built a job portal web app with team Oasys.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  {
    icon: Star,
    title: "100+ Positive Reviews",
    description:
      "Consistently praised for communication, quality work, and quick delivery.",
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
  },
];

/* -------------------- FLOATING DECORATIVE ELEMENTS -------------------- */
const FloatingElement = ({ delay, duration, className }) => (
  <motion.div
    className={`absolute rounded-full pointer-events-none ${className}`}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
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

/* -------------------- SECTION BADGE -------------------- */
const SectionBadge = ({ text, icon: Icon }) => (
  <motion.div
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
               bg-[#e16928]/10 border border-[#e16928]/30 
               text-[#e16928] dark:text-orange-400"
    initial={{ opacity: 0, scale: 0.8, y: -20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e16928] opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#e16928]"></span>
    </span>
    {Icon && <Icon className="w-4 h-4" />}
    <span className="text-sm font-medium">{text}</span>
  </motion.div>
);

/* -------------------- ACHIEVEMENT CARD -------------------- */
const AchievementCard = ({ achievement, index }) => {
  const shouldReduceMotion = useReducedMotion();
  const Icon = achievement.icon;
  const delay = index * 0.15;

  return (
    <motion.div
      className={`
        group relative flex flex-col items-center text-center
        p-6 sm:p-8 rounded-3xl cursor-pointer
        bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl
        border ${achievement.borderColor} dark:border-white/10
        shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        transition-all duration-500 ease-out overflow-hidden
        hover:shadow-[0_20px_50px_rgba(225,105,40,0.2)] 
        dark:hover:shadow-[0_20px_50px_rgba(225,105,40,0.3)]
        testimonial-card-shine
      `}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        delay: delay, 
        duration: 0.5, 
        type: "spring",
        stiffness: 100
      }}
      whileHover={!shouldReduceMotion ? { 
        y: -10, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" } 
      } : undefined}
    >
      {/* Animated gradient border on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
                   transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(225,105,40,0.4), rgba(250,204,21,0.4))`,
          padding: "2px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Background glow */}
      <div className={`absolute inset-0 rounded-3xl ${achievement.bgColor} opacity-0 
                      group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Icon Container */}
      <motion.div
        className="relative z-10 mb-4"
        animate={!shouldReduceMotion ? { 
          y: [0, -5, 0]
        } : undefined}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${achievement.color} 
                        blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`}
             style={{ transform: 'scale(1.5)' }} />
        
        <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl 
                        bg-gradient-to-br ${achievement.bgColor} 
                        border border-white/20 dark:border-white/10
                        flex items-center justify-center
                        group-hover:border-[#e16928]/40 transition-all duration-300`}>
          <Icon className={`w-8 h-8 sm:w-10 sm:h-10 text-[#e16928] dark:text-orange-400
                          group-hover:scale-110 transition-transform duration-500`} />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h4
        className="relative z-10 text-xl sm:text-2xl font-bold mb-3
                   font-['Poppins',sans-serif] text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 0.4 }}
      >
        <span className="group-hover:shimmer-text-testimonials group-hover:text-transparent 
                        group-hover:bg-clip-text transition-all duration-300
                        text-gray-900 dark:text-white">
          {achievement.title}
        </span>
      </motion.h4>

      {/* Description */}
      <motion.p
        className="relative z-10 text-gray-600 dark:text-gray-400 
                   text-sm sm:text-base leading-relaxed
                   font-['Inter',sans-serif]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3, duration: 0.4 }}
      >
        {achievement.description}
      </motion.p>

      {/* Bottom progress line */}
      <span className="pointer-events-none absolute bottom-0 left-0 h-1 w-0 
                      group-hover:w-full transition-[width] duration-700 
                      bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400 rounded-b-3xl" />
    </motion.div>
  );
};

/* -------------------- TESTIMONIAL CARD -------------------- */
const TestimonialCard = ({ testimonial, index }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`
        group relative flex-shrink-0 w-[320px] sm:w-[380px]
        flex flex-col items-center text-center
        p-6 sm:p-8 rounded-3xl
        bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl
        border border-white/40 dark:border-white/10
        shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        transition-all duration-500 ease-out overflow-hidden
        hover:shadow-[0_20px_50px_rgba(225,105,40,0.2)] 
        dark:hover:shadow-[0_20px_50px_rgba(225,105,40,0.3)]
        hover:border-[#e16928]/30
        testimonial-card-shine
      `}
      whileHover={!shouldReduceMotion ? { 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" } 
      } : undefined}
    >
      {/* Animated gradient border on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
                   transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(225,105,40,0.4), rgba(250,204,21,0.4))`,
          padding: "2px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Quote Icon */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 
                      transition-opacity duration-500">
        <Quote className="w-12 h-12 text-[#e16928]" />
      </div>

      {/* Profile Image */}
      <div className="relative mb-5">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#e16928] to-yellow-400 
                        blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500"
             style={{ transform: 'scale(1.1)' }} />
        
        <div className="relative p-1 rounded-full bg-gradient-to-r from-[#e16928] to-yellow-400">
          <img
            src={testimonial.img}
            alt={testimonial.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover 
                       border-3 border-white dark:border-gray-900
                       group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </div>

      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star 
            key={i} 
            className="w-4 h-4 text-yellow-400 fill-yellow-400" 
          />
        ))}
      </div>

      {/* Feedback */}
      <p className="relative z-10 text-gray-600 dark:text-gray-300 
                   text-sm sm:text-base leading-relaxed mb-5
                   font-['Inter',sans-serif] italic">
        "{testimonial.feedback}"
      </p>

      {/* Name & Role */}
      <div className="relative z-10 mt-auto">
        <h4 className="text-lg sm:text-xl font-bold font-['Poppins',sans-serif]">
          <span className="shimmer-text-testimonials text-transparent bg-clip-text">
            {testimonial.name}
          </span>
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 
                     font-['Inter',sans-serif] mt-1">
          {testimonial.role}
        </p>
      </div>

      {/* Bottom progress line */}
      <span className="pointer-events-none absolute bottom-0 left-0 h-1 w-0 
                      group-hover:w-full transition-[width] duration-700 
                      bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400 rounded-b-3xl" />
    </motion.div>
  );
};

/* -------------------- MAIN TESTIMONIALS SECTION -------------------- */
const Testimonials = () => {
  const lenisRef = useContext(LenisContext);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(window.scrollY, { immediate: true });
    }
  }, [lenisRef]);

  return (
    <section
      id="testimonials"
      className="relative min-h-screen flex flex-col justify-center items-center 
                 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24
                 bg-gradient-to-br from-white via-gray-50 to-orange-50/30 
                 dark:from-gray-950 dark:via-black dark:to-gray-900
                 transition-colors duration-700 overflow-hidden"
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
            className="w-72 h-72 bg-gradient-to-r from-[#e16928]/20 to-yellow-400/20 blur-3xl top-10 -left-36" 
          />
          <FloatingElement 
            delay={2} 
            duration={12} 
            className="w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-3xl bottom-20 -right-48" 
          />
          <FloatingElement 
            delay={4} 
            duration={8} 
            className="w-48 h-48 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 blur-2xl top-1/4 right-1/4" 
          />
        </>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">

        {/* Achievements Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.div className="flex justify-center mb-4">
            <SectionBadge text="Recognition & Milestones" icon={Trophy} />
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold 
                       tracking-tight mb-4 font-['Montserrat',sans-serif]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="shimmer-text-testimonials text-transparent bg-clip-text">
              Achievements
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 
                       max-w-2xl mx-auto leading-relaxed font-['Inter',sans-serif]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Milestones and recognitions that reflect my dedication to excellence and continuous growth.
          </motion.p>

          {/* Decorative underline */}
          <motion.div
            className="mt-6 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-[#e16928] via-orange-400 to-yellow-400"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {achievements.map((achievement, index) => (
            <AchievementCard 
              key={achievement.title} 
              achievement={achievement} 
              index={index} 
            />
          ))}
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          className="text-center mb-12 sm:mb-14"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.div className="flex justify-center mb-4">
            <SectionBadge text="What People Say" icon={MessageCircle} />
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-3xl sm:text-4xl md:text-5xl font-bold 
                       tracking-tight mb-4 font-['Montserrat',sans-serif]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="shimmer-text-testimonials text-transparent bg-clip-text">
              Client Feedback
            </span>
          </motion.h3>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 
                       max-w-xl mx-auto leading-relaxed font-['Inter',sans-serif]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Trusted by clients and colleagues for delivering quality work.
          </motion.p>
        </motion.div>

        {/* Auto-scrolling Testimonials Carousel */}
        <motion.div
          className="relative w-full overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10
                         bg-gradient-to-r from-white dark:from-gray-950 to-transparent 
                         pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10
                         bg-gradient-to-l from-white dark:from-gray-950 to-transparent 
                         pointer-events-none" />

          {/* Scrolling Container */}
          <div className={`flex gap-6 sm:gap-8 py-4 ${!shouldReduceMotion ? 'scroll-container' : ''}`}
               style={{ width: 'max-content' }}>
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
              <TestimonialCard 
                key={`${testimonial.name}-${index}`} 
                testimonial={testimonial} 
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
       

        {/* Bottom decorative element */}
        <motion.div
          className="flex justify-center mt-14 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#e16928]" />
            <Sparkles className="w-6 h-6 text-[#e16928] animate-pulse" />
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-yellow-400" />
          </div>
        </motion.div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 
                      bg-gradient-to-t from-white dark:from-gray-950 to-transparent 
                      pointer-events-none z-10" />
    </section>
  );
};

export default Testimonials;