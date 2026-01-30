import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { db, serverTimestamp } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { X, Send, User, Mail, MessageSquare, CheckCircle, Sparkles } from "lucide-react";

/* -------------------- INJECT PREMIUM STYLES -------------------- */
if (typeof document !== "undefined") {
  const existingStyle = document.getElementById("resume-popup-styles");
  if (!existingStyle) {
    const style = document.createElement("style");
    style.id = "resume-popup-styles";
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
      
      .resume-popup-card {
        background: rgba(10, 10, 10, 0.98);
        border: 1px solid rgba(201, 168, 108, 0.15);
      }
      
      .resume-gold-gradient-text {
        background: linear-gradient(135deg, #D4AF37 0%, #C9A86C 30%, #E8D5B5 50%, #C9A86C 70%, #B8956A 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .resume-input-gold {
        background: rgba(26, 26, 26, 0.9);
        border: 1px solid rgba(64, 64, 64, 0.6);
        color: #ffffff;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
      }
      
      .resume-input-gold::placeholder {
        color: #737373;
      }
      
      .resume-input-gold:focus {
        border-color: rgba(201, 168, 108, 0.6);
        box-shadow: 0 0 0 3px rgba(201, 168, 108, 0.1),
                    0 0 20px rgba(201, 168, 108, 0.08);
        outline: none;
      }
      
      .resume-btn-gold {
        background: linear-gradient(135deg, #C9A86C 0%, #D4AF37 50%, #C9A86C 100%);
        box-shadow: 0 4px 20px rgba(201, 168, 108, 0.25);
        transition: box-shadow 0.3s ease, transform 0.2s ease;
      }
      
      .resume-btn-gold:hover:not(:disabled) {
        box-shadow: 0 6px 30px rgba(201, 168, 108, 0.35);
      }
      
      .resume-btn-gold:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
      
      .resume-close-btn {
        color: #525252;
        transition: color 0.3s ease, background 0.3s ease;
      }
      
      .resume-close-btn:hover {
        color: #C9A86C;
        background: rgba(201, 168, 108, 0.1);
      }
      
      .resume-noise-overlay {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        opacity: 0.02;
      }
      
      .resume-glow-line {
        background: linear-gradient(90deg, transparent, rgba(201, 168, 108, 0.5), transparent);
      }
      
      .resume-accent-dot {
        width: 6px;
        height: 6px;
        background: #C9A86C;
        border-radius: 50%;
        box-shadow: 0 0 10px #C9A86C;
      }
      
      /* Smooth spinner animation */
      @keyframes resume-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .resume-spinner {
        animation: resume-spin 1s linear infinite;
        will-change: transform;
      }
      
      /* Smooth pulse animation */
      @keyframes resume-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(0.98); }
      }
      
      .resume-pulse-slow {
        animation: resume-pulse 2s ease-in-out infinite;
      }
      
      /* Success checkmark animation */
      @keyframes resume-check-appear {
        0% { transform: scale(0) rotate(-45deg); opacity: 0; }
        50% { transform: scale(1.2) rotate(0deg); }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      
      .resume-check-animate {
        animation: resume-check-appear 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
      
      /* Input icon styling */
      .resume-input-wrapper {
        position: relative;
      }
      
      .resume-input-icon {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        color: #525252;
        pointer-events: none;
        transition: color 0.3s ease;
      }
      
      .resume-input-wrapper:focus-within .resume-input-icon {
        color: #C9A86C;
      }
      
      .resume-input-with-icon {
        padding-left: 44px;
      }
      
      /* Textarea icon positioning */
      .resume-textarea-icon {
        top: 16px;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }
}

const ResumeRequestPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await addDoc(collection(db, "resume_requests"), {
        name: formData.name,
        email: formData.email,
        message: formData.message || "Requesting resume download",
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      await emailjs.send(
        "service_s8kkwnl",
        "template_3qknvw3",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message || "Requesting resume download",
          site: "my-portfolio",
        },
        "F2wa8gLjvNeUzf3KK"
      );

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => onClose(), 3800);
    } catch (err) {
      alert("Error submitting request: " + err.message);
    } finally {
      setSending(false);
    }
  };

  // Optimized animation variants for smooth performance
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0.95,
      y: prefersReducedMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.8
      }
    },
    exit: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0.95,
      transition: { duration: 0.2 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.1, duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={(e) => {
        if (e.target === e.currentTarget && !sending) onClose();
      }}
    >
      <motion.div
        className="relative w-full max-w-md resume-popup-card rounded-2xl shadow-2xl overflow-hidden"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Noise texture overlay */}
        <div className="absolute inset-0 resume-noise-overlay pointer-events-none rounded-2xl" />

        {/* Ambient glow */}
        <div 
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
          style={{ 
            background: "radial-gradient(circle, rgba(201, 168, 108, 0.08) 0%, transparent 70%)"
          }}
        />
        <div 
          className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full pointer-events-none"
          style={{ 
            background: "radial-gradient(circle, rgba(201, 168, 108, 0.05) 0%, transparent 70%)"
          }}
        />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#C9A86C]/40 to-transparent" />
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-[#C9A86C]/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-[#C9A86C]/40 to-transparent" />
          <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-[#C9A86C]/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8">
          
          {/* Close button */}
          <button
            className="absolute top-4 right-4 w-9 h-9 rounded-lg resume-close-btn
                       flex items-center justify-center disabled:opacity-50"
            onClick={onClose}
            disabled={sending}
            aria-label="Close popup"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          {/* Header */}
          <motion.div 
            className="text-center mb-6"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4
                           resume-btn-gold"
            >
              <Sparkles className="w-6 h-6 text-black" />
            </div>

            {/* Title */}
            <h3 
              className="text-2xl sm:text-3xl font-bold resume-gold-gradient-text mb-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Request Resume
            </h3>

            {/* Subtitle */}
            <p className="text-neutral-500 text-sm">
              Fill in your details and I'll send it right away
            </p>

            {/* Decorative line */}
            <div className="mt-4 mx-auto w-16 h-px resume-glow-line" />
          </motion.div>

          {/* Success State */}
          {success ? (
            <motion.div
              className="py-8 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Success Icon */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-5"
                   style={{ 
                     background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)",
                     border: "1px solid rgba(16, 185, 129, 0.3)"
                   }}>
                <CheckCircle className="w-10 h-10 text-emerald-400 resume-check-animate" />
              </div>

              {/* Success Text */}
              <h4 className="text-xl font-semibold text-white mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}>
                Request Sent Successfully!
              </h4>
              <p className="text-neutral-400 text-sm">
                You'll receive the resume in your inbox shortly.
              </p>

              {/* Auto close indicator */}
              <div className="mt-6 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse" />
                <span className="text-xs text-neutral-600">Closing automatically...</span>
              </div>
            </motion.div>
          ) : (
            /* Form */
            <motion.form
              className="flex flex-col space-y-4"
              onSubmit={handleSubmit}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-medium pl-1">
                  Full Name
                </label>
                <div className="resume-input-wrapper">
                  <User className="resume-input-icon w-4 h-4" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={sending}
                    className="w-full p-3.5 rounded-xl resume-input-gold resume-input-with-icon
                             text-sm disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-medium pl-1">
                  Email Address
                </label>
                <div className="resume-input-wrapper">
                  <Mail className="resume-input-icon w-4 h-4" />
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={sending}
                    className="w-full p-3.5 rounded-xl resume-input-gold resume-input-with-icon
                             text-sm disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-medium pl-1">
                  Message <span className="text-neutral-600">(Optional)</span>
                </label>
                <div className="resume-input-wrapper">
                  <MessageSquare className="resume-input-icon resume-textarea-icon w-4 h-4" />
                  <textarea
                    name="message"
                    placeholder="Any specific requirements..."
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={sending}
                    className="w-full p-3.5 rounded-xl resume-input-gold resume-input-with-icon
                             text-sm resize-none disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-800 to-transparent my-2" />

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 rounded-xl font-semibold text-sm sm:text-base
                         resume-btn-gold text-black flex items-center justify-center gap-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
                whileHover={sending ? {} : { scale: 1.02 }}
                whileTap={sending ? {} : { scale: 0.98 }}
              >
                {sending ? (
                  <>
                    <span 
                      className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full resume-spinner"
                    />
                    <span>Sending Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Request</span>
                  </>
                )}
              </motion.button>

              {/* Footer note */}
              <p className="text-center text-[11px] text-neutral-600 pt-1">
                Your information is secure and won't be shared.
              </p>
            </motion.form>
          )}
        </div>

        {/* Bottom accent glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px resume-glow-line" />
      </motion.div>
    </motion.div>
  );
};

export default ResumeRequestPopup;