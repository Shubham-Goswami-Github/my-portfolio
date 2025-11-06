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
import { LenisProvider } from "./LenisProvider";

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  return (
    <LenisProvider>
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

        {/* ✅ FULL-SCREEN ADMIN LOGIN */}

        {showAdminModal && (
          <div className="fixed inset-0 z-[9999]">
            <AdminLogin
              onLogin={(success) => {
                if (success) {
                  setAdminLoggedIn(true);
                  setShowAdminModal(false);
                }
              }}
              onClose={() => setShowAdminModal(false)}
            />
          </div>
        )}
      </div>
    </LenisProvider>
  );
}

export default App;
