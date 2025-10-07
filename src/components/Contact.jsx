import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  const [state, handleSubmit] = useForm("mblzlyoy"); // <- apna Formspree form ID

  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-200 
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-20 transition-colors duration-500"
    >
      {/* Section Title */}
      <motion.h2
        className="text-5xl md:text-6xl font-bold text-[#e16928ff] dark:text-yellow-400 text-center mb-16 drop-shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
      >
        📬 Contact Me
      </motion.h2>

      {/* Contact Form Container */}
      <motion.div
        className="max-w-3xl mx-auto bg-white/30 dark:bg-black/30 p-10 rounded-3xl shadow-2xl backdrop-blur-lg transition-colors duration-500"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
      >
        {state.succeeded ? (
          <motion.div
            className="text-center text-2xl text-[#e16928ff] dark:text-yellow-400 font-bold py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            ✅ Thanks for contacting me! I will get back to you soon.
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <label className="text-gray-800 dark:text-gray-200 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#e16928ff] dark:focus:ring-yellow-400 transition"
                required
              />
            </motion.div>

            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <label className="text-gray-800 dark:text-gray-200 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#e16928ff] dark:focus:ring-yellow-400 transition"
                required
              />
            </motion.div>

            {/* Message Textarea */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label className="text-gray-800 dark:text-gray-200 font-semibold">Message</label>
              <textarea
                name="message"
                placeholder="Type your message here..."
                className="w-full p-4 rounded-2xl bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white h-40 focus:outline-none focus:ring-2 focus:ring-[#e16928ff] dark:focus:ring-yellow-400 transition resize-none"
                required
              />
            </motion.div>

            {/* Validation Errors */}
            <ValidationError prefix="Name" field="name" errors={state.errors} />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
            <ValidationError prefix="Message" field="message" errors={state.errors} />

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={state.submitting}
              className="w-full py-4 bg-[#e16928ff] dark:bg-yellow-400 text-white dark:text-black font-bold rounded-2xl hover:scale-105 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-red-500 transition transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        )}
      </motion.div>
    </section>
  );
};

export default Contact;
