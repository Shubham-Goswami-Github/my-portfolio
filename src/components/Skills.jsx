import { motion } from "framer-motion";

const skills = [
  { name: "HTML", img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/html.png" },
  { name: "CSS", img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/CSS.png" },
  { name: "JavaScript", img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/javascript.png" },
  { name: "Java", img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/JAVA.png" },
  { name: "C", img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/CICON.png" },
  { name: "MySQL", img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/MYSQL-ICON.png" },
  { name: "PHP", img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/PHP.png" },
  { name: "Python", img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/pythone.png" },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-200 
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                 px-6 py-24 transition-colors duration-500"
    >
      {/* Section Title */}
      <motion.h2
        className="text-5xl md:text-6xl font-bold text-[#e16928ff] dark:text-yellow-400 
                   text-center mb-20 tracking-wide drop-shadow-lg"
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
            className="relative group p-8 rounded-3xl text-center font-bold 
                       text-gray-900 dark:text-white cursor-pointer 
                       flex flex-col items-center justify-center space-y-5
                       bg-white/20 dark:bg-black/20 backdrop-blur-xl
                       shadow-lg border border-gray-200 dark:border-gray-700
                       hover:shadow-[0_0_25px_rgba(225,105,40,0.6)]
                       transition-all duration-500"
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.08, rotate: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: false }}
          >
            {/* Glow background on hover */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
                            bg-gradient-to-r from-[#e16928ff] to-yellow-400 blur-2xl transition-all duration-700"></div>

            {/* Icon/Image */}
            <motion.img
              src={skill.img}
              alt={skill.name}
              className="w-20 h-20 object-contain z-10 relative drop-shadow-xl 
                         group-hover:scale-110 transition-transform duration-500"
              initial={{ opacity: 0, y: -20, rotate: -10 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
              viewport={{ once: false }}
            />

            {/* Skill Name */}
            <span className="text-xl md:text-2xl tracking-wide z-10 relative">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
