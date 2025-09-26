import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const education = [
  {
    degree: "10th - CBSE",
    school: "Central Academy, Kanke, Ranchi",
    marks: "66%",
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/School-Photo.jpg",
  },
  {
    degree: "Intermediate of Science",
    school: "Marwari College, Ranchi",
    marks: "54% (JAC Board)",
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/College-Photo.jpeg",
  },
  {
    degree: "BCA",
    school: "DSPMU, Ranchi",
    marks: "80%",
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/Dspmu-photo.jpeg",
  },
  {
    degree: "MCA",
    school: "SBU, Ranchi",
    marks: "88%",
    img: "https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/SBU-Photo.jpeg",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center px-6 py-20 space-y-20
                 bg-gray-200 dark:bg-gray-900 transition-colors duration-700"
    >
      {/* Section Header */}
      <motion.h2
        className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-yellow-400 mb-12 tracking-wider"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
      >
        About Me
      </motion.h2>

      {/* Profile + Text Container */}
      <div className="flex flex-col md:flex-row items-center md:items-start max-w-6xl w-full gap-12">
        {/* Profile Picture */}
        <motion.div
          className="flex-shrink-0 w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden border-4 border-secondary dark:border-yellow-400 shadow-2xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
       <img
  src="https://raw.githubusercontent.com/Shubham-Goswami-Github/portfolio-images/main/portfolio-background-pic.png"
  alt="Shubham Goswami"
  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
/>


        </motion.div>

        {/* Intro Text */}
        <motion.div
          className="flex-1 space-y-6 transition-colors duration-500"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: false }}
        >
          {/* Typing Intro */}
          <TypeAnimation
            sequence={[
              "Hi, I'm Shubham Goswami 👋",
              2000,
              "I'm a passionate Web Developer and Designer",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100"
          />

          {/* About Paragraphs */}
          {[
            "I love creating modern, responsive, and animated websites. I focus on combining creativity with clean and maintainable code.",
            "As a person, I am dedicated, detail-oriented, and always eager to learn new technologies. I enjoy solving challenging problems and improving my skills every day.",
            "I am comfortable working both independently and in team environments, and I value effective communication and collaboration.",
          ].map((text, i) => (
            <motion.p
              key={i}
              className="text-lg md:text-xl text-gray-900 dark:text-gray-100 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3 + 0.5, duration: 0.8 }}
              viewport={{ once: false }}
            >
              {text.split(/(modern|detail-oriented|collaboration)/g).map((word, idx) =>
                /modern|detail-oriented|collaboration/.test(word) ? (
                  <span key={idx} className="text-secondary dark:text-yellow-400 font-semibold">{word}</span>
                ) : word
              )}
            </motion.p>
          ))}
        </motion.div>
      </div>

      {/* Education Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-16">
        {education.map((edu, index) => (
          <motion.div
            key={edu.degree}
            className="rounded-3xl shadow-2xl text-center cursor-pointer
                       bg-gray-100 dark:bg-gray-800 transition-colors duration-500
                       hover:scale-105 hover:rotate-1 hover:shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, y: 40, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.08, rotate: 2 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: false }}
          >
            <div className="w-full h-40 rounded-t-3xl overflow-hidden">
              <img
                src={edu.img}
                alt={edu.degree}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl md:text-2xl text-secondary dark:text-yellow-400 mb-2">
                {edu.degree}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{edu.school}</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">{edu.marks}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
