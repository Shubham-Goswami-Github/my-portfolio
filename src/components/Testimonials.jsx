import { motion } from "framer-motion";
import AnimatedPlanetStarBackground from "./AnimatedPlanetStarBackground";
import { Star, Award, Users } from "lucide-react";
import { useContext, useEffect } from "react";
import { LenisContext } from "../LenisProvider";

const testimonials = [
	{
		name: "Rahul Verma",
		role: "Frontend Developer, Oasys Tech",
		feedback:
			"Working with Shubham was an amazing experience. His ability to convert complex UI ideas into clean and beautiful designs impressed our entire team.",
		img: "https://randomuser.me/api/portraits/men/32.jpg",
	},
	{
		name: "Priya Sharma",
		role: "Project Manager, TechServe",
		feedback:
			"He’s detail-oriented, creative, and incredibly professional. Shubham consistently delivers beyond expectations and always ensures deadlines are met.",
		img: "https://randomuser.me/api/portraits/women/44.jpg",
	},
	{
		name: "Rohan Mehta",
		role: "UI/UX Designer, Freelance",
		feedback:
			"A highly talented developer with a strong sense of design and interactivity. His work on animations and dark mode design is top-notch!",
		img: "https://randomuser.me/api/portraits/men/47.jpg",
	},
	{
		name: "Sneha Kapoor",
		role: "Team Lead, Webverse",
		feedback:
			"Shubham’s code is clean, efficient, and beautifully structured. His teamwork and leadership in hackathons have inspired many junior developers.",
		img: "https://randomuser.me/api/portraits/women/68.jpg",
	},
];

const achievements = [
	{
		icon: (
			<Award className="w-10 h-10 text-[#e16928] dark:text-yellow-400" />
		),
		title: "Best Web Design Award",
		description:
			"Recognized for innovative and responsive portfolio design at a regional tech fest.",
	},
	{
		icon: (
			<Users className="w-10 h-10 text-[#e16928] dark:text-yellow-400" />
		),
		title: "Hackathon Finalist",
		description:
			"Participated in a 36-hour coding event and built a job portal web app with team Oasys.",
	},
	{
		icon: (
			<Star className="w-10 h-10 text-[#e16928] dark:text-yellow-400" />
		),
		title: "100+ Positive Client Reviews",
		description:
			"Consistently praised for communication, quality work, and quick delivery.",
	},
];

const Testimonials = (props) => {
	const lenisRef = useContext(LenisContext);
	useEffect(() => {
		if (lenisRef && lenisRef.current) {
			lenisRef.current.scrollTo(window.scrollY, { immediate: true });
		}
	}, [lenisRef]);

	return (
		<section
			id="testimonials"
			className="relative min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black overflow-hidden transition-colors duration-700"
			style={{ minHeight: "100vh", position: "relative" }}
		>
			{/* Animated Planets & Stars Background - covers full section */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					width: "100%",
					height: "100%",
					zIndex: 0,
					pointerEvents: "none",
				}}
			>
				<AnimatedPlanetStarBackground />
			</div>

			{/* Section Header */}
			<motion.h2
				className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e16928ff] to-yellow-400 text-center mb-20 tracking-wide drop-shadow-lg relative z-10"
				initial={{ opacity: 0, y: -50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 1.2, ease: "easeInOut" }}
			>
				Achievements
			</motion.h2>

			{/* Achievements Section */}
			<motion.div
				className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10"
				initial="hidden"
				whileInView="visible"
				variants={{
					hidden: { opacity: 0, y: 40 },
					visible: {
						opacity: 1,
						y: 0,
						transition: {
							staggerChildren: 0.18,
							duration: 1.1,
						},
					},
				}}
			>
				{achievements.map((a, index) => (
					<motion.div
						key={index}
						className="flex flex-col items-center text-center bg-white/30 dark:bg-gray-800/40 p-8 rounded-2xl shadow-lg border border-yellow-400/30 dark:border-yellow-400/40 hover:shadow-[0_0_35px_rgba(225,105,40,0.5)] transition-all duration-700"
						initial={{ opacity: 0, y: 50, scale: 0.92 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						whileHover={{ scale: 1.07, boxShadow: "0 0 60px 0 #e16928" }}
						transition={{
							delay: index * 0.18,
							duration: 0.9,
							ease: "easeInOut",
						}}
					>
						{a.icon}
						<h4 className="text-2xl font-bold mt-4 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#e16928ff] to-yellow-400">
							{a.title}
						</h4>
						<p className="text-gray-700 dark:text-gray-300">
							{a.description}
						</p>
					</motion.div>
				))}
			</motion.div>

			{/* Testimonials Header */}
			<motion.h3
				className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e16928ff] to-yellow-400 mt-24 mb-16 text-center z-10"
				initial={{ opacity: 0, y: -30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 1.1, ease: "easeInOut" }}
			>
				Client Feedback
			</motion.h3>

			{/* Auto-scrolling Testimonials Carousel */}
			<div className="relative w-full overflow-hidden max-w-7xl mx-auto z-10">
				<motion.div
					className="flex gap-10"
					animate={{ x: ["0%", "-50%"] }}
					transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
				>
					{[...testimonials, ...testimonials].map((t, i) => (
						<motion.div
							key={i}
							className="min-w-[320px] md:min-w-[380px] bg-white/40 dark:bg-gray-800/50 backdrop-blur-xl border border-yellow-400/30 dark:border-yellow-400/40 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center space-y-4 hover:shadow-[0_0_45px_rgba(225,105,40,0.7)] transition-all duration-700"
							initial={{ opacity: 0, scale: 0.92, y: 30 }}
							whileInView={{ opacity: 1, scale: 1, y: 0 }}
							whileHover={{ scale: 1.07, boxShadow: "0 0 60px 0 #e16928" }}
							transition={{
								duration: 1.1,
								delay: i * 0.07,
								ease: "easeInOut",
							}}
						>
							<motion.img
								src={t.img}
								alt={t.name}
								className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-yellow-400"
								initial={{ opacity: 0, y: -18 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7, ease: "easeInOut" }}
							/>
							<p className="text-gray-700 dark:text-gray-300 leading-relaxed italic text-lg">
								“{t.feedback}”
							</p>
							<div>
								<h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#e16928ff] to-yellow-400">
									{t.name}
								</h3>
								<p className="text-gray-600 dark:text-gray-400">
									{t.role}
								</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>

			{/* Bottom Glow */}
			<div
				className="absolute bottom-0 left-0 right-0 h-40 
                      bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none"
			></div>
		</section>
	);
};

export default Testimonials;
