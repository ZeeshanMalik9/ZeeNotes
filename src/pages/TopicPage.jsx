import React, { useState, useEffect } from 'react';
import { useParams, Link, useOutletContext, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { courses } from '../reactjsData';
import useCourseProgress from '../hooks/useCourseProgress';

// Legacy Blocks (still used for Theory/Example content)
import TheoryBlock from '../components/blocks/TheoryBlock';
import ExampleBlock from '../components/blocks/ExampleBlock';
import TableBlock from '../components/blocks/TableBlock';

// New High-End UI Components
import CodeEditor from '../components/ui/CodeEditor';
import DiagramRenderer from '../components/ui/DiagramRenderer';
import ScrollReveal from '../components/ui/ScrollReveal';
import InterviewAccordion from '../components/ui/InterviewAccordion';
import CongratulationsModal from '../components/ui/CongratulationsModal';

const TopicPage = () => {
    const { topicId } = useParams();
    const { isDark } = useOutletContext();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);

    const {
        completedTopics,
        completedQuestions,
        markTopicComplete,
        markQuestionComplete,
        isTopicComplete
    } = useCourseProgress();

    // Find the course and topic
    const course = courses.find(c => c.topics.some(t => t.id === topicId));
    const topic = course?.topics.find(t => t.id === topicId);

    // Navigation Logic
    const currentTopicIndex = course?.topics.findIndex(t => t.id === topicId);
    const prevTopic = currentTopicIndex > 0 ? course.topics[currentTopicIndex - 1] : null;
    const nextTopic = currentTopicIndex < course?.topics.length - 1 ? course.topics[currentTopicIndex + 1] : null;

    useEffect(() => {
        // Close sidebar on route change (mobile)
        setIsSidebarOpen(false);
        window.scrollTo(0, 0);
    }, [topicId]);

    if (!topic) {
        return <div className="text-center text-white pt-20">Topic not found</div>;
    }

    const handleNext = () => {
        if (!isTopicComplete(topicId)) {
            markTopicComplete(topicId);
        }

        if (nextTopic) {
            navigate(`/topic/${nextTopic.id}`);
        } else {
            setShowCongrats(true);
        }
    };

    const SidebarContent = () => (
        <>
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Course Curriculum
                    </h3>
                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>
                <ul className="space-y-1">
                    {course.topics.map((t) => {
                        const isCompleted = isTopicComplete(t.id);
                        const isActive = t.id === topicId;

                        return (
                            <li key={t.id}>
                                <Link
                                    to={`/topic/${t.id}`}
                                    className={`flex items-center justify-between px-4 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold translate-x-1'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <span>{t.title}</span>
                                    {isCompleted && (
                                        <FaCheckCircle className="text-green-500 text-xs ml-2" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );

    return (
        <div className="flex flex-col lg:flex-row min-h-screen w-full overflow-x-hidden bg-gray-50 dark:bg-black transition-colors duration-300">
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-40 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
                <FaBars size={24} />
            </button>

            {/* Mobile Sidebar Drawer */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-gray-900 z-50 p-6 overflow-y-auto border-r border-gray-200 dark:border-gray-800 lg:hidden"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <aside className="w-72 fixed left-0 top-16 bottom-0 bg-white dark:bg-gray-900/50 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 p-6 overflow-y-auto hidden lg:block z-10">
                <SidebarContent />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-72 min-h-screen min-w-0">
                <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12">
                    <ScrollReveal>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-16 text-center lg:text-left"
                        >
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-4">
                                <span className="text-blue-600 dark:text-blue-400 font-mono text-sm tracking-wide uppercase">
                                    React Mastery
                                </span>
                                <button
                                    onClick={() => markTopicComplete(topicId)}
                                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${isTopicComplete(topicId)
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {isTopicComplete(topicId) ? (
                                        <>
                                            <FaCheckCircle /> Completed
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-3 h-3 rounded-full border-2 border-current" /> Mark Complete
                                        </>
                                    )}
                                </button>
                            </div>

                            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight break-words">
                                {topic.title}
                            </h1>
                            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto lg:mx-0" />
                        </motion.div>
                    </ScrollReveal>

                    <div className="space-y-16">
                        {topic.blocks.map((block, index) => {
                            // Dynamic Component Rendering
                            const renderBlock = () => {
                                switch (block.type) {
                                    case 'theory':
                                        return <TheoryBlock {...block} />;
                                    case 'code':
                                        return <CodeEditor codeString={block.code} fileName={block.title} />;
                                    case 'diagram':
                                        return <DiagramRenderer definition={block.definition} isDarkMode={isDark} />;
                                    case 'example':
                                        return <ExampleBlock {...block} />;
                                    case 'table':
                                        return <TableBlock {...block} />;
                                    default:
                                        return null;
                                }
                            };

                            return (
                                <ScrollReveal key={index}>
                                    <div id={`block-${index}`} className="scroll-mt-32">
                                        {renderBlock()}
                                    </div>
                                </ScrollReveal>
                            );
                        })}

                        {/* Interview Section */}
                        {topic.interviewQuestions && (
                            <ScrollReveal>
                                <div id="interview-prep" className="scroll-mt-32 pt-12 border-t border-gray-200 dark:border-gray-800">
                                    <InterviewAccordion
                                        questions={topic.interviewQuestions}
                                        completedQuestions={completedQuestions}
                                        onToggleComplete={markQuestionComplete}
                                    />
                                </div>
                            </ScrollReveal>
                        )}
                    </div>

                    {/* Bottom Navigation */}
                    <div className="mt-24 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            {prevTopic ? (
                                <Link
                                    to={`/topic/${prevTopic.id}`}
                                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center"
                                >
                                    ← {prevTopic.title}
                                </Link>
                            ) : (
                                <div /> // Spacer
                            )}

                            <button
                                onClick={handleNext}
                                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all transform"
                            >
                                {nextTopic ? (
                                    <>Next Topic: {nextTopic.title} →</>
                                ) : (
                                    <>Finish Course 🎉</>
                                )}
                            </button>
                        </div>

                        <div className="text-center mt-12 text-sm text-gray-400">
                            Zee Notes &copy; 2025
                        </div>
                    </div>
                </div>
            </main>

            <CongratulationsModal
                isOpen={showCongrats}
                onClose={() => setShowCongrats(false)}
            />
        </div>
    );
};

export default TopicPage;
