import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/ContactBubble";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Testimonials from "./components/Testimonials";

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  return (
    <div className="bg-primary text-white font-sans">
      <Navbar
        adminLoggedIn={adminLoggedIn}
        onLogout={() => setAdminLoggedIn(false)}
        onAdminLoginClick={() => setShowAdminModal(true)}
      />

      {!adminLoggedIn ? (
        <>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Testimonials />
          <Contact />
          <Footer />
        </>
      ) : (
        <AdminDashboard />
      )}

      {/* ✅ Admin Login Modal - Only shows when clicked */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-gray-800 dark:text-gray-100">
            <button
              onClick={() => setShowAdminModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
            >
              ✕
            </button>
            <AdminLogin
              onLogin={(success) => {
                if (success) {
                  setAdminLoggedIn(true);
                  setShowAdminModal(false);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
