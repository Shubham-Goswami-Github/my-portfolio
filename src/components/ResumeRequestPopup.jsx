import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { db, serverTimestamp } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const ResumeRequestPopup = ({ onClose }) => {
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
        name: formData.name,
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
      setTimeout(() => onClose(), 3800);
    } catch (err) {
      alert("Error submitting request: " + err.message);
      setSending(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-md rounded-2xl border border-white/10 
                   bg-gradient-to-br from-[#1a1635]/90 to-[#0d0a1f]/90 shadow-2xl 
                   backdrop-blur-2xl p-7"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-4 text-gray-300 hover:text-red-400 text-2xl transition"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Heading */}
        <motion.h3
          className="text-3xl font-extrabold text-center bg-gradient-to-r 
                     from-[#e16928ff] to-yellow-400 text-transparent bg-clip-text drop-shadow-lg mb-6"
        >
          Request Resume
        </motion.h3>

        {success ? (
          <motion.p
            className="text-green-400 text-center text-lg font-semibold py-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            ✅ Request Sent Successfully!
            <br /> You'll receive confirmation soon.
          </motion.p>
        ) : (
          <motion.form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
                         text-white placeholder-gray-300 focus:ring-2 
                         focus:ring-yellow-400 outline-none transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
                         text-white placeholder-gray-300 focus:ring-2 
                         focus:ring-yellow-400 outline-none transition"
            />

            <textarea
              name="message"
              placeholder="Message (optional)"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 
                         text-white placeholder-gray-300 resize-none 
                         focus:ring-2 focus:ring-yellow-400 outline-none transition"
            />

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-3 rounded-lg font-semibold text-lg shadow-md
                         bg-gradient-to-r from-[#e16928ff] to-yellow-400
                         text-gray-900 hover:brightness-110 transition"
            >
              {sending ? "Sending..." : "Submit Request"}
            </motion.button>
          </motion.form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ResumeRequestPopup;
