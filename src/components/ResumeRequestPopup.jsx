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
      // Save to Firestore
      await addDoc(collection(db, "resume_requests"), {
        Sname: formData.name,
        email: formData.email,
        message: formData.message || "Requesting resume download",
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      // Send Email via EmailJS
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
      setTimeout(() => onClose(), 4000);
    } catch (err) {
      alert("Error submitting request: " + err.message);
      setSending(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative border border-[#e1692830] dark:border-yellow-400/30"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 font-bold text-xl hover:scale-110 transition"
          onClick={onClose}
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
          >
            ✅ Request sent successfully!
            <br />
            You will receive confirmation soon.
          </motion.p>
        ) : (
          <motion.form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white 
              focus:ring-2 focus:ring-[#e16928ff] dark:focus:ring-yellow-400 outline-none transition"
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
              focus:ring-2 focus:ring-[#e16928ff] dark:focus:ring-yellow-400 outline-none transition"
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
              focus:ring-2 focus:ring-[#e16928ff] dark:focus:ring-yellow-400 outline-none transition"
              value={formData.message}
              onChange={handleChange}
            />
            <button
              type="submit"
              disabled={sending}
              className="bg-[#e16928ff] dark:bg-yellow-400 text-white dark:text-gray-900 
              font-semibold py-3 rounded-lg hover:brightness-110 transition duration-300"
            >
              {sending ? "Sending..." : "Send Request"}
            </button>
          </motion.form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ResumeRequestPopup;
