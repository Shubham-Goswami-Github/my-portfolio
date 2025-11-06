import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";
import { auth } from "../firebaseConfig";
import { Lock, Mail } from "lucide-react";

const AdminLogin = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 35 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      onLogin(true);
    } catch {
      setError("❌ Invalid Email or Password");
    }
  };

  return (
    /* ✅ FULL SCREEN + BLUR + DARK OVERLAY */
    <div className="fixed inset-0 z-[9999] flex items-center justify-center 
                    bg-black/80 backdrop-blur-md overflow-hidden">

      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-white/90 text-3xl hover:text-white transition"
        >
          ✕
        </button>
      )}

      {/* Floating Stars */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/70 shadow-lg"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: `${p.y}%`,
            left: `${p.x}%`,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 3.5 + Math.random() * 3,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Login Card */}
      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 w-[90%] max-w-sm bg-white/10 border border-white/20 rounded-2xl backdrop-blur-xl p-8 shadow-2xl"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text">
          Admin Login
        </h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <div className="relative mb-5">
          <Mail className="absolute left-3 top-3 text-gray-300" size={20} />
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full pl-10 pr-3 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-300 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative mb-6">
          <Lock className="absolute left-3 top-3 text-gray-300" size={20} />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-3 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-300 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg shadow-lg hover:shadow-yellow-400/50 transition"
        >
          Login
        </motion.button>

        <p className="text-gray-300 text-sm text-center mt-4 opacity-60">
          Authorized Access Only
        </p>
      </motion.form>
    </div>
  );
};

export default AdminLogin;
