import { motion } from "framer-motion";
import { Link } from "react-scroll";

const Navbar = () => {
  const navLinks = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full bg-primary/80 backdrop-blur-md shadow-md z-50"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.h1
          className="text-2xl font-bold text-secondary cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          Shubham
        </motion.h1>

        {/* Nav Links */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.to}
              className="text-white hover:text-accent cursor-pointer transition"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.1 }}
            >
              <Link
                to={link.to}
                smooth={true}
                duration={600}
                offset={-70} // navbar height adjust
                spy={true}
                activeClass="text-accent"
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
