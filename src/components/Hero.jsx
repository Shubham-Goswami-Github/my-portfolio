import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import emailjs from "@emailjs/browser";
import { db, serverTimestamp } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

// Typing Animation Component
const TypingEffect = ({ text, duration = 2, className }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      duration,
      ease: "easeInOut", // smoother easing
    });
    const unsubscribe = displayText.onChange((latest) => setCurrentText(latest));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, displayText, text, duration]);

  return (
    <motion.h2
      className={className}
      aria-label={text}
      aria-live="polite"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {currentText}
    </motion.h2>
  );
};

// Main Hero Section
const Hero = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [particles, setParticles] = useState([]);

  // Floating glowing particles
  useEffect(() => {
    const count = 30;
    const arr = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 3,
      delay: Math.random() * 5,
    }));
    setParticles(arr);
  }, []);

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
      alert("Error submitting request: " + err.message);
      setSending(false);
    }
  };

  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center text-center 
                 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black
                 relative overflow-hidden px-6 transition-all duration-700"
    >
      {/* Floating Glowing Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-yellow-400/30 dark:bg-yellow-400/30"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: `${p.y}%`,
            left: `${p.x}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 6 + Math.random() * 3, // slower & smoother
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glowing Orbs */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 bg-orange-200/40 dark:bg-[#e16928ff]/25 rounded-full blur-3xl"
        animate={{
          x: [0, 25, -25, 0],
          y: [0, 20, -20, 0],
          opacity: [0.5, 0.8, 0.6, 0.5],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-200/30 dark:bg-yellow-400/25 rounded-full blur-3xl"
        animate={{
          x: [0, -25, 25, 0],
          y: [0, -20, 20, 0],
          opacity: [0.4, 0.7, 0.5, 0.4],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Typing Title */}
      <TypingEffect
        text="Hi, I'm Shubham Das Goswami"
        duration={2}
        className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text 
                   bg-gradient-to-r from-[#e16928ff] to-yellow-400 
                   font-sans tracking-wide drop-shadow-lg z-10"
      />

      {/* Subheading */}
      <motion.p
        className="mt-6 text-lg md:text-2xl text-gray-800 dark:text-gray-200 
                   max-w-2xl font-medium leading-relaxed z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
      >
        A passionate Web Developer who loves building{" "}
        <span className="font-semibold text-yellow-500">modern, responsive</span>{" "}
        and{" "}
        <span className="font-semibold text-orange-500 dark:text-[#e16928ff]">
          animated websites
        </span>
        .
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
      >
        {[{ label: "View Projects", href: "#projects" }].map((btn, idx) => (
         <motion.a
  key={idx}
  href={btn.href}
  className="px-8 py-4 bg-gradient-to-r from-[#e16928ff] to-yellow-400 
  text-white font-semibold rounded-lg shadow-lg hover:brightness-110 hover:scale-105 
  transition-transform duration-300 no-underline hover:no-underline"
  whileHover={{ scale: 1.06 }}
>
  {btn.label}
</motion.a>

        ))}

        <motion.button
          onClick={() => setShowPopup(true)}
          className="px-8 py-4 bg-gradient-to-r from-[#e16928ff] to-yellow-400 
                     text-white font-semibold rounded-lg shadow-lg 
                     hover:brightness-110 hover:scale-105 
                     transition-transform duration-500 ease-in-out"
          whileHover={{ scale: 1.06 }}
        >
          Download Resume
        </motion.button>
      </motion.div>

      {/* Scroll Icon */}
      <motion.div
        className="absolute bottom-10 text-4xl text-yellow-500 z-10"
        animate={{ y: [0, 10, 0], opacity: [1, 0.7, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown size={40} />
      </motion.div>

      {/* Resume Request Popup */}
      {showPopup && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative 
                       border border-gray-200 dark:border-yellow-400/30"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <button
              className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 font-bold text-xl hover:scale-110 transition-transform"
              onClick={() => setShowPopup(false)}
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-4 text-[#e16928ff] dark:text-yellow-400">
              Request Resume
            </h3>

            {success ? (
              <motion.p
                className="text-green-500 font-semibold text-center py-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                ✅ Request sent successfully!
                <br />You will receive confirmation soon.
              </motion.p>
            ) : (
              <motion.form
                className="flex flex-col space-y-4"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white 
                  focus:ring-2 focus:ring-[#e16928ff] dark:focus:ring-yellow-400 outline-none transition-all"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white 
                  focus:ring-2 focus:ring-[#e16928ff] dark:focus:ring-yellow-400 outline-none transition-all"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Optional message"
                  rows="3"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white resize-none 
                  focus:ring-2 focus:ring-[#e16928ff] dark:focus:ring-yellow-400 outline-none transition-all"
                  value={formData.message}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="bg-gradient-to-r from-[#e16928ff] to-yellow-400 text-white dark:text-gray-900 
                  font-semibold py-3 rounded-lg hover:brightness-110 transition-all duration-500 ease-in-out"
                >
                  {sending ? "Sending..." : "Send Request"}
                </button>
              </motion.form>
            )}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
