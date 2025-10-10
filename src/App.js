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

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  return (
    <div className="bg-primary text-white font-sans">
      {/* Navbar */}
      <Navbar
        adminLoggedIn={adminLoggedIn}
        onLogout={() => setAdminLoggedIn(false)}
      />

      {/* Main Sections */}
      {!adminLoggedIn ? (
        <>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </>
      ) : (
        <AdminDashboard />
      )}

      {/* Admin Login Modal */}
      {!adminLoggedIn && (
        <AdminLogin onLogin={setAdminLoggedIn} />
      )}
    </div>
  );
}

export default App;
