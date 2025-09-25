import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const education = [
  { degree: "10th - CBSE", school: "Central Academy, Kanke, Ranchi", marks: "66%" },
  { degree: "Intermediate of Science", school: "Marwari College, Ranchi", marks: "54% (JAC Board)" },
  { degree: "BCA", school: "DSPMU, Ranchi", marks: "80%" },
  { degree: "MCA", school: "SBU, Ranchi", marks: "88%" },
];

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center bg-black px-6 py-20 space-y-16"
    >
      {/* Animated Section Title */}
      <motion.h2
        className="text-5xl md:text-6xl font-bold text-secondary mb-10 tracking-wider"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
      >
        About Me
      </motion.h2>

      {/* Typing Intro */}
      <motion.div
        className="text-center text-lg md:text-xl text-gray-300 max-w-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        viewport={{ once: false }}
      >
        <TypeAnimation
          sequence={[
            "Hi, I'm Shubham Goswami 👋",
            2000,
            "I'm a passionate Web Developer and Designer",
            2000,
          ]}
          speed={50}
          repeat={Infinity}
          className="text-gray-300 font-semibold"
        />
      </motion.div>

      {/* About Paragraphs */}
      <div className="max-w-3xl space-y-6 text-center text-gray-300">
        {[
          "I love creating modern, responsive, and animated websites. I focus on combining creativity with clean and maintainable code.",
          "As a person, I am dedicated, detail-oriented, and always eager to learn new technologies. I enjoy solving challenging problems and improving my skills every day.",
          "I am comfortable working both independently and in team environments, and I value effective communication and collaboration.",
        ].map((text, i) => (
          <motion.p
            key={i}
            className="text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3, duration: 0.8 }}
            viewport={{ once: false }}
          >
            {text.split(/(modern|detail-oriented|collaboration)/g).map((word, idx) =>
              /modern|detail-oriented|collaboration/.test(word) ? (
                <span key={idx} className="text-secondary font-semibold">{word}</span>
              ) : word
            )}
          </motion.p>
        ))}
      </div>

      {/* Education Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {education.map((edu, index) => (
          <motion.div
            key={edu.degree}
            className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-3xl shadow-2xl text-center text-white cursor-pointer hover:scale-105 hover:rotate-1 hover:shadow-[0_25px_35px_rgba(0,0,0,0.6)] transition-transform duration-500"
            initial={{ opacity: 0, y: 40, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.08, rotate: 2 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: false }}
          >
            <h3 className="font-bold text-xl md:text-2xl text-secondary mb-2">{edu.degree}</h3>
            <p className="text-gray-300 mb-2">{edu.school}</p>
            <p className="font-semibold text-gray-100">{edu.marks}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
