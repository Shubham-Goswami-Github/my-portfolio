import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import emailjs from "@emailjs/browser";
import { db, serverTimestamp } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import AnimatedPlanetStarBackground from "./AnimatedPlanetStarBackground";
import { LenisContext } from "../LenisProvider";
import ResumeRequestPopup from "./ResumeRequestPopup";


/* -------------------- TYPING EFFECT -------------------- */
const TypingEffect = ({ text, duration = 2, className, startDelay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
  const [currentText, setCurrentText] = useState("");
  const [planetAnim, setPlanetAnim] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__planetTextAnim = () => {
        setPlanetAnim(true);
        setTimeout(() => setPlanetAnim(false), 600);
      };
      return () => (window.__planetTextAnim = undefined);
    }
  }, []);

  useEffect(() => {
    let controls;
    let timeoutId;
    count.set(0);

    if (shouldReduceMotion) {
      setCurrentText(text);
      return;
    } else setCurrentText("");

    timeoutId = setTimeout(() => {
      controls = animate(count, text.length, {
        type: "tween",
        duration,
        ease: "easeInOut",
      });
    }, startDelay * 1000);

    return () => {
      controls?.stop();
      clearTimeout(timeoutId);
    };
  }, [text, duration, startDelay, shouldReduceMotion, count]);

  useEffect(() => {
    const unsubscribe = displayText.on("change", (latest) =>
      setCurrentText(latest)
    );
    return () => unsubscribe();
  }, [displayText]);

  return (
    <motion.h1
      className={
        (className || "") +
        " font-extrabold break-words inline-block relative bg-clip-text text-transparent"
      }
      aria-label={text}
      aria-live="polite"
      animate={planetAnim ? { scale: 1.04 } : { scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        backgroundImage:
          "linear-gradient(90deg, #e16928, #fbbf24, #e16928)",
        backgroundSize: "300% 100%",
        animation: "shimmer 6s infinite linear",
      }}
    >
      {Array.from(currentText).map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.08 : 0.14,
            delay: shouldReduceMotion ? i * 0.005 : i * 0.01,
            ease: "easeOut",
          }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.h1>
  );
};

/* Add keyframe for shimmer effect */
const shimmerStyle = document.createElement("style");
shimmerStyle.innerHTML = `
@keyframes shimmer {
  0% { background-position: 0% 0%; }
  50% { background-position: 150% 0%; }
  100% { background-position: 0% 0%; }
}`;
document.head.appendChild(shimmerStyle);

/* -------------------- HERO SECTION -------------------- */
const Hero = () => {
  const lenisRef = useContext(LenisContext);
  useEffect(() => {
    if (lenisRef?.current)
      lenisRef.current.scrollTo(window.scrollY, { immediate: true });
  }, [lenisRef]);

  const prefersReducedMotion = useReducedMotion();
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await addDoc(collection(db, "resume_requests"), {
        Sname: formData.name,
        email: formData.email,
        message: formData.message || "Requesting resume download",
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      await emailjs.send(
        "service_r7zsx5o",
        "template_3qknvw3",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message || "Requesting resume download",
          site: "my-portfolio",
        },
        "CXfCaFkoekA1FCLDh"
      );

      setSuccess(true);
      setSending(false);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setShowPopup(false), 4000);
    } catch (err) {
      alert(err.message);
      setSending(false);
    }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-white dark:bg-black transition-all duration-700">
      <AnimatedPlanetStarBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE — Increased size */}
        <motion.div
          className="flex justify-center md:justify-start"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96" // ← bigger now
            animate={prefersReducedMotion ? { y: 0 } : { y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-[#e16928] via-yellow-400 to-sky-400 opacity-30 blur-3xl" />
            <div className="absolute inset-0 rounded-full p-[4px] bg-gradient-to-br from-[#e16928] via-yellow-400 to-sky-400">
              <img
                src="https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/GithubProfile.jpeg"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT TEXT */}
        <div className="text-center md:text-left">
          <motion.p className="text-2xl md:text-4xl font-semibold text-gray-700 dark:text-gray-200">
            Hi, I'm
          </motion.p>

          <div className="mt-1">
            <TypingEffect
              text={"Shubham\u00A0\u00A0Das\u00A0\u00A0Goswami"}
              duration={1.8}
              startDelay={0.15}
              className="
                text-[clamp(1.5rem,2.3vw,2.4rem)]
                sm:text-[clamp(1.9rem,2.6vw,2.7rem)]
                md:text-[clamp(2.2rem,2.8vw,3rem)]
                lg:text-[clamp(2.4rem,2.8vw,3.1rem)]
                xl:text-[clamp(2.6rem,3vw,3.3rem)]
                2xl:text-[clamp(2.8rem,3vw,3.5rem)]
                tracking-tight leading-tight w-full"
            />
          </div>
          <motion.p className="mt-5 text-lg md:text-2xl text-gray-700 dark:text-gray-300">
  A passionate Web Developer crafting{" "}
  <span className="text-yellow-500 font-semibold">modern</span> and{" "}
  <span className="text-[#e16928] font-semibold">animated</span>{" "}
  experiences.
</motion.p>

{/* ✅ New Buttons */}
<motion.div
  className="mt-8 flex flex-col sm:flex-row gap-4 md:gap-6 
             justify-center md:justify-start 
             items-center"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>

  {/* Download Resume (opens popup) */}
  <motion.button
    onClick={() => setShowPopup(true)}
    className="px-8 py-4 bg-gradient-to-r from-[#e16928] to-yellow-400 
               text-white font-semibold rounded-lg shadow-lg 
               hover:brightness-110 hover:scale-105 
               transition-transform duration-300"
    whileHover={{ scale: 1.06 }}
  >
    Download Resume
  </motion.button>

  {/* View Projects (scrolls to projects section) */}
  <motion.button
    onClick={() => {
      const proj = document.getElementById("projects");
      if (proj) proj.scrollIntoView({ behavior: "smooth" });
    }}
    className="px-8 py-4 border-2 border-[#e16928] text-[#e16928] dark:text-yellow-400 
               dark:border-yellow-400 font-semibold rounded-lg shadow-md 
               hover:bg-[#e16928] hover:text-white dark:hover:bg-yellow-400 dark:hover:text-black 
               transition-all duration-300 hover:scale-105"
    whileHover={{ scale: 1.06 }}
  >
    View Projects
  </motion.button>
</motion.div>

        </div>
      </div>

      <AnimatePresence>
  {showPopup && (
    <ResumeRequestPopup onClose={() => setShowPopup(false)} />
  )}
</AnimatePresence>

    </section>
  );
};

export default Hero;
