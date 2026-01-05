import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaReact, FaJava, FaArrowRight, FaCode } from 'react-icons/fa';
import { courses } from '../reactjsData';

const TiltCard = ({ course }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-[350px] h-[400px] rounded-3xl bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 cursor-pointer group perspective-1000 shadow-xl dark:shadow-none"
        >
            <div
                style={{ transform: "translateZ(75px)" }}
                className="absolute inset-4 flex flex-col justify-between p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-xl group-hover:shadow-blue-500/20 transition-shadow duration-500"
            >
                <div>
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        {course.icon === 'FaJava' ? (
                            <FaJava className="text-4xl text-orange-400" />
                        ) : course.icon === 'FaCode' ? (
                            <FaCode className="text-4xl text-green-400" />
                        ) : (
                            <FaReact className="text-4xl text-blue-400" />
                        )}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {course.description}
                    </p>
                </div>

                <div className="flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Start Learning</span>
                    <FaArrowRight className="ml-2" />
                </div>
            </div>

            {/* Glow Effect */}
            <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                style={{ transform: "translateZ(-50px)" }}
            />
        </motion.div>
    );
};

const Home = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
            >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    Master Modern Web Dev
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Interactive, physics-based learning experiences designed to make complex concepts stick.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-7xl mx-auto">
                {courses.map((course) => (
                    <Link
                        to={course.id === 'dsa-mastery' ? `/dsa/${course.topics[0].id}` : `/topic/${course.topics[0].id}`}
                        key={course.id}
                        className="w-full flex justify-center"
                    >
                        <TiltCard course={course} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
