import { motion } from "framer-motion";
import { 
  SiHtml5, SiCss3, SiJavascript, SiC, SiMysql, SiPhp, SiPython,
} from "react-icons/si";

const skills = [
  { name: "HTML", color: "from-orange-400 to-red-500", icon: <SiHtml5 size={50} /> },
  { name: "CSS", color: "from-blue-400 to-indigo-600", icon: <SiCss3 size={50} /> },
  { name: "JavaScript", color: "from-yellow-400 to-yellow-600", icon: <SiJavascript size={50} /> },
  { name: "Java", color: "from-orange-500 to-red-600", icon: <SiCss3 size={50} /> },
  { name: "C", color: "from-gray-400 to-gray-600", icon: <SiC size={50} /> },
  { name: "MySQL", color: "from-cyan-400 to-cyan-700", icon: <SiMysql size={50} /> },
  { name: "PHP", color: "from-purple-500 to-indigo-700", icon: <SiPhp size={50} /> },
  { name: "Python", color: "from-blue-400 to-blue-700", icon: <SiPython size={50} /> },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen bg-gradient-to-b from-black to-primary px-6 py-24"
    >
      {/* Section Title */}
      <motion.h2
        className="text-5xl md:text-6xl font-bold text-secondary text-center mb-20 tracking-wide"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
      >
        Skills
      </motion.h2>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className={`p-10 rounded-3xl shadow-2xl text-center font-bold text-white bg-gradient-to-r ${skill.color} cursor-pointer flex flex-col items-center justify-center space-y-5 hover:scale-105 hover:rotate-2 hover:shadow-[0_25px_35px_rgba(0,0,0,0.6)] transition-transform duration-500`}
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: false }}
          >
            {/* Icon */}
            <motion.div
              className="text-white"
              initial={{ opacity: 0, y: -20, rotate: -10 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
              viewport={{ once: false }}
            >
              {skill.icon}
            </motion.div>

            {/* Skill Name */}
            <span className="text-xl md:text-2xl tracking-wide">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
