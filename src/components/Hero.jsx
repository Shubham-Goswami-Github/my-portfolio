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
        " font-extrabold whitespace-nowrap inline-block"
      }
      aria-label={text}
      aria-live="polite"
      animate={planetAnim ? { scale: 1.03 } : { scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {Array.from(currentText).map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.08 : 0.16,
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
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-white dark:bg-black transition-all duration-700">
      <AnimatedPlanetStarBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT IMAGE */}
        <motion.div
          className="flex justify-center md:justify-start"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-80 md:h-80"
            animate={
              prefersReducedMotion ? { y: 0 } : { y: [0, -10, 0] }
            }
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-[#e16928] via-yellow-400 to-sky-400 opacity-30 blur-2xl" />
            <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-br from-[#e16928] via-yellow-400 to-sky-400">
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

          <div className="mt-1 w-full overflow-hidden">
            <div className="text-center md:text-left">
            <div className="mt-1 w-full overflow-hidden">
  <div className="text-center md:text-left">
    <TypingEffect
      text={"Shubham\u00A0Das\u00A0Goswami"}
      duration={1.8}
      startDelay={0.1}
      className="inline-block 
        text-[clamp(1.5rem,2.3vw,2.3rem)]      /* mobile */
        sm:text-[clamp(1.9rem,2.6vw,2.7rem)]   /* sm */
        md:text-[clamp(2.2rem,2.8vw,3rem)]     /* md/laptop */
        lg:text-[clamp(2.4rem,2.9vw,3.2rem)]   /* large screens (reduced more) */
        xl:text-[clamp(2.6rem,3vw,3.4rem)]     /* xl screens */
        2xl:text-[clamp(2.8rem,3.1vw,3.6rem)]  /* ultra wide — controlled */
        text-gray-900 dark:text-white 
        tracking-wide leading-tight break-words w-full"
    />
  </div>
</div>


            </div>
          </div>

          <motion.p className="mt-5 text-lg md:text-2xl text-gray-700 dark:text-gray-300">
            A passionate Web Developer crafting{" "}
            <span className="text-yellow-500 font-semibold">modern</span> and{" "}
            <span className="text-[#e16928] font-semibold">animated</span>{" "}
            experiences.
          </motion.p>

        </div>
      </div>
    </section>
  );
};

export default Hero;
