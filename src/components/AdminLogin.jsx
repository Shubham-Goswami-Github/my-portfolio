import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";
import { auth } from "../firebaseConfig";
import { Lock, Mail } from "lucide-react";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [particles, setParticles] = useState([]);

  // Create glowing floating particles for background
  useEffect(() => {
    const count = 25;
    const arr = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 3,
      delay: Math.random() * 5,
    }));
    setParticles(arr);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(true);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or Firebase Auth not set up!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">

      {/* 🌊 Animated Wave Background (Fixed Orientation) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-0">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[200px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M985.66,92.83c-43.72,4.31-87.07,11.35-130.92,11.62-72.89.46-145.17-9.46-217.9-16.63C516.43,78.49,395,69,321.39,56.44A600.72,600.72,0,0,0,0,65.58V120H1200V95.8C1131.45,88.11,1056.87,85.6,985.66,92.83Z"
            fill="url(#grad)"
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e16928ff" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ✨ Floating Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-yellow-400/30"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: `${p.y}%`,
            left: `${p.x}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 🔥 Animated Glowing Orbs */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 bg-[#e16928ff]/30 rounded-full blur-3xl"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, 20, -20, 0],
          opacity: [0.5, 0.8, 0.6, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 20, 0],
          y: [0, -20, 20, 0],
          opacity: [0.4, 0.7, 0.5, 0.4],
        }}
        transition={{ duration: 9, repeat: Infinity }}
      />

      {/* 🧊 Login Card */}
      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl border border-white/10 
                   p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <motion.h2
          className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-[#e16928ff] to-yellow-400 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Admin Login
        </motion.h2>

        {error && (
          <motion.p
            className="text-red-500 mb-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {/* Email */}
        <motion.div className="relative mb-4" whileFocusWithin={{ scale: 1.02 }}>
          <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                       bg-gray-100/80 dark:bg-gray-700/60 text-gray-900 dark:text-white 
                       focus:ring-2 focus:ring-[#e16928ff] dark:focus:ring-yellow-400 outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </motion.div>

        {/* Password */}
        <motion.div className="relative mb-6" whileFocusWithin={{ scale: 1.02 }}>
          <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                       bg-gray-100/80 dark:bg-gray-700/60 text-gray-900 dark:text-white 
                       focus:ring-2 focus:ring-[#e16928ff] dark:focus:ring-yellow-400 outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </motion.div>

        {/* Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(225,105,40,0.6)" }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-gradient-to-r from-[#e16928ff] to-yellow-400 text-white dark:text-gray-900 
                     py-3 rounded-lg font-semibold shadow-md hover:brightness-110 transition-all duration-300"
        >
          Login
        </motion.button>

        <motion.div
          className="mt-4 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Secure access for authorized admins only
        </motion.div>
      </motion.form>
    </div>
  );
};

export default AdminLogin;
