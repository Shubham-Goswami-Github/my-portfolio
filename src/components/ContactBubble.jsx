import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { FaEnvelope } from "react-icons/fa";

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
      if (!containerRef.current?.contains(e.target) && !bubbleRef.current?.contains(e.target))
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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed right-6 bottom-8 z-50 cursor-grab active:cursor-grabbing"
      >
        {/* Smoke effect when dragging */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              key="smoke"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0.6, 0.3, 0],
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
              className="absolute inset-0 blur-2xl bg-gradient-to-br from-[#e16928ff]/40 to-yellow-300/40 rounded-full"
              style={{ pointerEvents: "none" }}
            />
          )}
        </AnimatePresence>

        {/* Bubble button */}
        <motion.button
          aria-label="Open contact form"
          onClick={handleBubbleClick}
          className="relative flex items-center justify-center w-14 h-14 rounded-full 
                     bg-gradient-to-br from-[#e16928ff] to-yellow-400 text-white shadow-2xl
                     ring-0 hover:ring-4 hover:ring-[#e16928ff]/30 transition-all duration-300"
        >
          <FaEnvelope size={20} />
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
                transition: { type: "spring", stiffness: 180, damping: 12 },
              }}
              exit={{
                opacity: 0,
                scale: 0.7,
                y: 10,
                transition: { duration: 0.25, ease: "easeInOut" },
              }}
              className="pointer-events-auto max-w-sm w-[22rem] md:w-96 origin-bottom-right"
            >
              <div className="relative">
                {/* Glow behind popup */}
                <motion.div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl blur-3xl bg-gradient-to-r from-[#e16928ff]/20 to-yellow-400/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {/* popup card */}
                <motion.div
                  className="relative z-10 bg-white/20 dark:bg-black/20 backdrop-blur-md border border-gray-200/30 dark:border-gray-700/30
                             rounded-2xl shadow-2xl overflow-hidden p-4 md:p-6"
                  role="dialog"
                  aria-modal="true"
                >
                  {/* header */}
                  <div className="flex items-center justify-between mb-3">
                    <h4
                      className="text-lg md:text-xl font-semibold text-transparent bg-clip-text
                                 bg-gradient-to-r from-[#e16928ff] to-yellow-400"
                    >
                      Send a message
                    </h4>
                    <button
                      aria-label="Close contact form"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-700 dark:text-gray-200
                                 hover:bg-gray-100/40 dark:hover:bg-white/5 transition"
                    >
                      ✕
                    </button>
                  </div>

                  {/* success message */}
                  {state.succeeded ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="py-6 text-center text-sm md:text-base text-[#0f172a] dark:text-gray-100"
                    >
                      ✅ Thanks — your message has been sent!
                    </motion.div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col space-y-3"
                    >
                      <div>
                        <input
                          ref={firstInputRef}
                          name="name"
                          type="text"
                          placeholder="Your name"
                          required
                          className="w-full px-3 py-2 rounded-xl bg-gray-100/60 dark:bg-gray-800/60
                                     text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                     focus:outline-none focus:ring-3 focus:ring-[#e16928ff]/30 dark:focus:ring-yellow-400/30
                                     transition duration-200"
                        />
                      </div>
                      <div>
                        <input
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="w-full px-3 py-2 rounded-xl bg-gray-100/60 dark:bg-gray-800/60
                                     text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                     focus:outline-none focus:ring-3 focus:ring-[#e16928ff]/30 dark:focus:ring-yellow-400/30
                                     transition duration-200"
                        />
                      </div>
                      <div>
                        <textarea
                          name="message"
                          placeholder="Write a short message..."
                          required
                          rows={4}
                          className="w-full px-3 py-2 rounded-xl bg-gray-100/60 dark:bg-gray-800/60
                                     text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                     focus:outline-none focus:ring-3 focus:ring-[#e16928ff]/30 dark:focus:ring-yellow-400/30
                                     transition duration-200 resize-none"
                        />
                      </div>
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

                      {/* actions */}
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          type="submit"
                          disabled={state.submitting}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-xl
                                     bg-gradient-to-r from-[#e16928ff] to-yellow-400 text-white font-semibold
                                     shadow-md hover:shadow-lg transform transition duration-200"
                        >
                          {state.submitting ? "Sending..." : "Send"}
                        </button>

                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="px-3 py-2 rounded-xl bg-gray-100/60 dark:bg-gray-800/60 text-sm text-gray-800 dark:text-gray-200
                                     hover:bg-gray-200/60 dark:hover:bg-white/5 transition duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
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
