import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { FaEnvelope } from "react-icons/fa";
import { X, Send } from "lucide-react";

/* -------------------- INJECT CONTACT BUBBLE STYLES -------------------- */
if (typeof document !== "undefined") {
  const existingStyle = document.getElementById("contact-bubble-styles");
  if (!existingStyle) {
    const style = document.createElement("style");
    style.id = "contact-bubble-styles";
    style.innerHTML = `
      .bubble-gold-gradient {
        background: linear-gradient(135deg, #C9A86C 0%, #D4AF37 50%, #C9A86C 100%);
      }
      
      .bubble-gold-gradient:hover {
        background: linear-gradient(135deg, #D4AF37 0%, #E8D5B5 50%, #D4AF37 100%);
      }
      
      .bubble-glow {
        box-shadow: 0 4px 20px rgba(201, 168, 108, 0.35),
                    0 0 40px rgba(201, 168, 108, 0.15);
      }
      
      .bubble-glow:hover {
        box-shadow: 0 6px 30px rgba(201, 168, 108, 0.45),
                    0 0 60px rgba(201, 168, 108, 0.25);
      }
      
      .popup-card {
        background: rgba(10, 10, 10, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(201, 168, 108, 0.15);
      }
      
      .input-gold {
        background: rgba(26, 26, 26, 0.8);
        border: 1px solid rgba(64, 64, 64, 0.6);
        color: #ffffff;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .input-gold::placeholder {
        color: #737373;
      }
      
      .input-gold:focus {
        border-color: rgba(201, 168, 108, 0.5);
        box-shadow: 0 0 0 3px rgba(201, 168, 108, 0.1),
                    0 0 20px rgba(201, 168, 108, 0.1);
        outline: none;
      }
      
      .btn-submit-gold {
        background: linear-gradient(135deg, #C9A86C 0%, #D4AF37 50%, #C9A86C 100%);
        box-shadow: 0 4px 15px rgba(201, 168, 108, 0.25);
      }
      
      .btn-submit-gold:hover {
        background: linear-gradient(135deg, #D4AF37 0%, #E8D5B5 50%, #D4AF37 100%);
        box-shadow: 0 6px 25px rgba(201, 168, 108, 0.35);
      }
      
      .btn-submit-gold:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
      
      .btn-cancel-gold {
        background: rgba(26, 26, 26, 0.8);
        border: 1px solid rgba(64, 64, 64, 0.6);
        color: #a3a3a3;
      }
      
      .btn-cancel-gold:hover {
        border-color: rgba(201, 168, 108, 0.4);
        color: #C9A86C;
        background: rgba(201, 168, 108, 0.05);
      }
      
      .text-gold-gradient {
        background: linear-gradient(135deg, #D4AF37 0%, #C9A86C 30%, #E8D5B5 50%, #C9A86C 70%, #B8956A 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .close-btn-gold {
        color: #525252;
        transition: all 0.3s ease;
      }
      
      .close-btn-gold:hover {
        color: #C9A86C;
        background: rgba(201, 168, 108, 0.1);
      }
      
      .noise-overlay {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        opacity: 0.02;
      }
    `;
    document.head.appendChild(style);
  }
}

const ContactBubble = () => {
  const [state, handleSubmit] = useForm("mblzlyoy");
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const bubbleRef = useRef(null);
  const firstInputRef = useRef(null);

  // motion values for tracking bubble position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // prevent opening when releasing after drag
  const dragEndTime = useRef(0);

  // handle outside click / ESC close
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onDocClick = (e) => {
      if (
        !containerRef.current?.contains(e.target) &&
        !bubbleRef.current?.contains(e.target)
      )
        setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, []);

  // autofocus first field when open
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => firstInputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  // handle click vs drag distinction
  const handleBubbleClick = () => {
    const now = Date.now();
    if (now - dragEndTime.current < 150) return; // ignore clicks right after drag
    setOpen((v) => !v);
  };

  // calculate popup position dynamically (relative to bubble)
  const [popupPos, setPopupPos] = useState({ right: 0, bottom: 0 });
  useEffect(() => {
    const updatePosition = () => {
      if (bubbleRef.current) {
        const rect = bubbleRef.current.getBoundingClientRect();
        const fromRight = window.innerWidth - rect.right;
        const fromBottom = window.innerHeight - rect.bottom;
        setPopupPos({ right: fromRight, bottom: fromBottom + 70 });
      }
    };
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <>
      {/* Floating draggable bubble */}
      <motion.div
        ref={bubbleRef}
        drag
        dragElastic={0.25}
        dragMomentum={false}
        dragConstraints={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setIsDragging(false);
          dragEndTime.current = Date.now();
        }}
        style={{ x, y }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed right-6 bottom-24 z-50 cursor-grab active:cursor-grabbing"
      >
        {/* Gold smoke/glow effect when dragging */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              key="smoke"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0.5, 0.25, 0],
                scale: [1, 2.5],
                x: [-10, 10, 0],
                y: [10, -20],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeOut",
              }}
              className="absolute inset-0 blur-2xl rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(201, 168, 108, 0.4) 0%, rgba(212, 175, 55, 0.2) 50%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>

        {/* Ambient glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: open
              ? [
                  "0 0 20px rgba(201, 168, 108, 0.3)",
                  "0 0 40px rgba(201, 168, 108, 0.5)",
                  "0 0 20px rgba(201, 168, 108, 0.3)",
                ]
              : "0 0 20px rgba(201, 168, 108, 0.2)",
          }}
          transition={{
            duration: 2,
            repeat: open ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        {/* Bubble button */}
        <motion.button
          aria-label="Open contact form"
          onClick={handleBubbleClick}
          className="relative flex items-center justify-center w-14 h-14 rounded-full 
                     bubble-gold-gradient bubble-glow text-black
                     ring-0 hover:ring-4 hover:ring-amber-500/20 transition-all duration-300"
        >
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <FaEnvelope size={20} />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Popup form container */}
      <div
        ref={containerRef}
        aria-hidden={!open}
        className="fixed z-50 pointer-events-none"
        style={{
          right: popupPos.right,
          bottom: popupPos.bottom,
          width: "auto",
        }}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              key="popup"
              initial={{
                opacity: 0,
                scale: 0.4,
                y: 20,
                transformOrigin: "bottom right",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.7,
                y: 10,
                transition: { duration: 0.2, ease: "easeInOut" },
              }}
              className="pointer-events-auto max-w-sm w-[22rem] md:w-96 origin-bottom-right"
            >
              <div className="relative">
                {/* Glow behind popup */}
                <motion.div
                  aria-hidden
                  className="absolute -inset-1 rounded-2xl blur-2xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(201, 168, 108, 0.15) 0%, transparent 70%)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />

                {/* Popup card */}
                <motion.div
                  className="relative z-10 popup-card rounded-2xl shadow-2xl overflow-hidden"
                  role="dialog"
                  aria-modal="true"
                  style={{
                    fontFamily: "'Inter', 'Space Grotesk', sans-serif",
                  }}
                >
                  {/* Noise texture overlay */}
                  <div className="absolute inset-0 noise-overlay pointer-events-none rounded-2xl" />

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-amber-500/30 to-transparent" />
                    <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-amber-500/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-8 h-8">
                    <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-amber-500/30 to-transparent" />
                    <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-amber-500/30 to-transparent" />
                  </div>

                  <div className="relative z-10 p-5 md:p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        {/* Accent dot */}
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-amber-500"
                          style={{ boxShadow: "0 0 8px rgba(201, 168, 108, 0.6)" }}
                        />
                        <h4
                          className="text-lg md:text-xl font-semibold text-gold-gradient tracking-tight"
                          style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                        >
                          Send a Message
                        </h4>
                      </div>
                      <motion.button
                        aria-label="Close contact form"
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg close-btn-gold"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <X size={18} strokeWidth={1.5} />
                      </motion.button>
                    </div>

                    {/* Divider line */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent mb-5" />

                    {/* Success message */}
                    {state.succeeded ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="py-8 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 12,
                            delay: 0.1,
                          }}
                          className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(201, 168, 108, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%)",
                            border: "1px solid rgba(201, 168, 108, 0.3)",
                          }}
                        >
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl"
                          >
                            ✓
                          </motion.span>
                        </motion.div>
                        <p className="text-neutral-300 text-sm md:text-base font-light">
                          Thanks — your message has been sent!
                        </p>
                        <p className="text-neutral-500 text-xs mt-2">
                          I'll get back to you soon.
                        </p>
                      </motion.div>
                    ) : (
                      <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-4"
                      >
                        {/* Name Input */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-medium">
                            Name
                          </label>
                          <input
                            ref={firstInputRef}
                            name="name"
                            type="text"
                            placeholder="Your name"
                            required
                            className="w-full px-4 py-3 rounded-xl input-gold text-sm"
                          />
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-medium">
                            Email
                          </label>
                          <input
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            required
                            className="w-full px-4 py-3 rounded-xl input-gold text-sm"
                          />
                        </div>

                        {/* Message Textarea */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-medium">
                            Message
                          </label>
                          <textarea
                            name="message"
                            placeholder="Write a short message..."
                            required
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl input-gold text-sm resize-none"
                          />
                        </div>

                        {/* Validation Errors */}
                        <div className="text-red-400 text-xs">
                          <ValidationError
                            prefix="Name"
                            field="name"
                            errors={state.errors}
                          />
                          <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                          />
                          <ValidationError
                            prefix="Message"
                            field="message"
                            errors={state.errors}
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-2">
                          <motion.button
                            type="submit"
                            disabled={state.submitting}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                                       btn-submit-gold text-black font-semibold text-sm tracking-wide
                                       transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                          >
                            {state.submitting ? (
                              <>
                                <motion.span
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                  className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                                />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send size={16} strokeWidth={2} />
                                Send Message
                              </>
                            )}
                          </motion.button>

                          <motion.button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="px-4 py-3 rounded-xl btn-cancel-gold text-sm font-medium
                                       transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Cancel
                          </motion.button>
                        </div>
                      </form>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ContactBubble;