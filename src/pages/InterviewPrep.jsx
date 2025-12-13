import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaLightbulb, FaReact, FaArrowLeft } from 'react-icons/fa';
import { courses } from '../reactjsData';

const TopicCard = ({ course, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group shadow-sm dark:shadow-none"
        >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FaReact className="text-2xl text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{course.topics.length} Topics</p>
        </motion.div>
    );
};

const QuestionAccordion = ({ question, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between p-6 rounded-xl transition-all duration-300 ${isOpen
                    ? 'bg-blue-50 dark:bg-blue-600/20 border-blue-200 dark:border-blue-500/50 shadow-lg shadow-blue-500/10'
                    : 'bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'
                    } border`}
            >
                <span className="text-lg font-semibold text-left text-gray-900 dark:text-gray-100">
                    {question.question}
                </span>
                <FaChevronDown
                    className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-2 bg-gray-50 dark:bg-gray-900/30 border-x border-b border-gray-200 dark:border-gray-800 rounded-b-xl">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                {question.answer}
                            </p>

                            <div className="flex items-start p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                <FaLightbulb className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-yellow-500 mb-1 uppercase tracking-wide">
                                        Interview Tip
                                    </h4>
                                    <p className="text-sm text-gray-400">
                                        {question.tips}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const InterviewPrep = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);

    if (selectedCourse) {
        const questions = selectedCourse.topics.flatMap(t => t.interviewQuestions || []);

        return (
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setSelectedCourse(null)}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Topics
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        {selectedCourse.title} Questions
                    </h1>
                    <p className="text-gray-400">
                        {questions.length} questions available
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {questions.map((q, i) => (
                        <QuestionAccordion key={q.id} question={q} index={i} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                    Interview Preparation
                </h1>
                <p className="text-xl text-gray-400">
                    Select a technology to start practicing.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <TopicCard
                        key={course.id}
                        course={course}
                        onClick={() => setSelectedCourse(course)}
                    />
                ))}
            </div>
        </div>
    );
};

export default InterviewPrep;
