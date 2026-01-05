import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaChevronRight, FaCode, FaSave, FaCheckCircle, FaLightbulb, FaExternalLinkAlt } from 'react-icons/fa';
import { dsaCourse } from '../dsaData';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Component for the Code Solution Display (Read Only)
const CodeSolution = ({ code, language = 'javascript' }) => (
    <div className="rounded-lg overflow-x-auto w-full my-4 text-sm font-mono border border-gray-700 custom-scrollbar relative">
        <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers={true}
            customStyle={{ margin: 0, padding: '1rem', background: '#1e1e1e', minWidth: '100%' }} // minWidth 100% ensures bg covers scroll area
        >
            {code}
        </SyntaxHighlighter>
    </div>
);

// Component for User Notes/Solution Editor
const UserSolutionEditor = ({ questionId }) => {
    const [code, setCode] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const savedCode = localStorage.getItem(`dsa-solution-${questionId}`);
        if (savedCode) setCode(savedCode);
        else setCode('// Write your solution or notes here...');
    }, [questionId]);

    const handleSave = () => {
        localStorage.setItem(`dsa-solution-${questionId}`, code);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FaCode /> Your Solution / Notes
                </h3>
                <button
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${saved
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                >
                    {saved ? <><FaCheckCircle /> Saved</> : <><FaSave /> Save to Local Storage</>}
                </button>
            </div>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-y text-gray-800 dark:text-gray-200"
                spellCheck="false"
            />
        </div>
    );
};

// Sidebar Component defined OUTSIDE the page component to prevent re-renders
const Sidebar = ({
    isSidebarOpen,
    setIsSidebarOpen,
    dsaCourse,
    toggleModule,
    navigate,
    activeModule,
    expandedModules,
    activeQuestion,
    setActiveQuestion,
    solvedQuestions,
    toggleSolved
}) => (
    <div className="pb-20">
        <div className="flex items-center justify-between mb-6 px-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Curriculum
            </span>
            <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden text-gray-400"
            >
                <FaTimes />
            </button>
        </div>

        <div className="space-y-1">
            {dsaCourse.topics.map(module => (
                <div key={module.id} className="rounded-lg overflow-hidden">
                    {/* Module Header */}
                    <button
                        onClick={() => {
                            toggleModule(module.id);
                            if (module.id !== activeModule.id) {
                                navigate(`/dsa/${module.id}`);
                            }
                        }}
                        className={`w-full flex items-center justify-between p-3 text-sm font-bold transition-colors ${module.id === activeModule.id
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                    >
                        <span>{module.title}</span>
                        {expandedModules[module.id] ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                    </button>

                    {/* Subtopics & Questions */}
                    <AnimatePresence>
                        {expandedModules[module.id] && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-gray-50 dark:bg-black/20"
                            >
                                {module.subTopics.map(sub => (
                                    <div key={sub.id} className="border-l-2 border-gray-200 dark:border-gray-800 ml-4 my-1">
                                        <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase mt-2 mb-1 flex items-center gap-1">
                                            <FaLightbulb size={10} /> {sub.title}
                                        </div>
                                        {sub.questions.map(q => (
                                            <div key={q.id} className="flex items-center w-full group">
                                                <input
                                                    type="checkbox"
                                                    checked={solvedQuestions.has(q.id)}
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        toggleSolved(q.id);
                                                    }}
                                                    className="ml-3 w-3 h-3 text-blue-600 rounded focus:ring-blue-500 bg-gray-200 dark:bg-gray-700 border-gray-400 cursor-pointer"
                                                />
                                                <button
                                                    onClick={() => {
                                                        if (q.id !== activeQuestion?.id) {
                                                            if (module.id !== activeModule.id) {
                                                                navigate(`/dsa/${module.id}`);
                                                            }
                                                            setActiveQuestion(q);
                                                            setIsSidebarOpen(false);
                                                            // window.scrollTo(0, 0); // Removed to prevent jarring scroll jumps
                                                        }
                                                    }}
                                                    className={`flex-1 text-left px-3 py-2 text-xs truncate transition-colors ${activeQuestion?.id === q.id
                                                        ? 'text-blue-600 dark:text-blue-400 font-bold'
                                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                                        } ${solvedQuestions.has(q.id) ? 'line-through opacity-70' : ''}`}
                                                >
                                                    {q.title}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    </div>
);

const DSAPage = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [solvedQuestions, setSolvedQuestions] = useState(new Set());

    // Load solved status
    useEffect(() => {
        const saved = localStorage.getItem('dsa-solved-questions');
        if (saved) {
            setSolvedQuestions(new Set(JSON.parse(saved)));
        }
    }, []);

    // Toggle Solved
    const toggleSolved = (qId) => {
        setSolvedQuestions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(qId)) newSet.delete(qId);
            else newSet.add(qId);
            localStorage.setItem('dsa-solved-questions', JSON.stringify([...newSet]));
            return newSet;
        });
    };

    // State to track expanded sidebar items
    const [expandedModules, setExpandedModules] = useState({});

    // Identify current content
    // topicId in URL might be the Module ID (e.g. 'arrays'). 
    // If so, we default to the first question of the first subtopic.

    const activeModule = dsaCourse.topics.find(m => m.id === topicId) || dsaCourse.topics[0];
    const [activeQuestion, setActiveQuestion] = useState(null);

    // Initialize View
    useEffect(() => {
        if (activeModule && !activeQuestion) {
            // Default to first question of first subtopic
            if (activeModule.subTopics?.[0]?.questions?.[0]) {
                setActiveQuestion(activeModule.subTopics[0].questions[0]);
            }
        }
    }, [activeModule, activeQuestion]);

    // Toggle Sidebar Module
    const toggleModule = (modId) => {
        setExpandedModules(prev => ({
            ...prev,
            [modId]: !prev[modId]
        }));
    };

    // Auto-expand current module on load
    useEffect(() => {
        if (activeModule) {
            setExpandedModules(prev => ({ ...prev, [activeModule.id]: true }));
        }
    }, [activeModule]);



    return (
        <div className="flex flex-col lg:flex-row min-h-screen w-full bg-white dark:bg-black text-gray-900 dark:text-gray-100">
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-blue-600 text-white rounded-full shadow-xl"
            >
                <FaBars />
            </button>

            {/* Sidebar Drawer (Mobile + Desktop) */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            <aside className={`fixed top-16 bottom-0 left-0 w-80 bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-gray-800 z-50 lg:z-0 transform transition-transform duration-300 lg:translate-x-0 overflow-y-auto p-6 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    dsaCourse={dsaCourse}
                    toggleModule={toggleModule}
                    navigate={navigate}
                    activeModule={activeModule}
                    expandedModules={expandedModules}
                    activeQuestion={activeQuestion}
                    setActiveQuestion={setActiveQuestion}
                    solvedQuestions={solvedQuestions}
                    toggleSolved={toggleSolved}
                />
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-80 pt-8 px-4 md:px-12 lg:px-16 min-h-screen pb-24">
                {activeQuestion ? (
                    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up">
                        {/* Header */}
                        <div>
                            <div className="flex items-center gap-2 text-blue-500 mb-2 font-mono text-sm uppercase tracking-wider">
                                <span>{activeModule.title}</span>
                                <FaChevronRight size={10} />
                                <span>Question</span>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                                    {activeQuestion.title}
                                </h1>
                                <div className="flex items-center gap-3">
                                    {activeQuestion.problemLink && (
                                        <a
                                            href={activeQuestion.problemLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-200 transition-all"
                                        >
                                            <FaExternalLinkAlt size={14} /> Solve Problem
                                        </a>
                                    )}
                                    <button
                                        onClick={() => toggleSolved(activeQuestion.id)}
                                        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${solvedQuestions.has(activeQuestion.id)
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200'
                                            }`}
                                    >
                                        {solvedQuestions.has(activeQuestion.id) ? (
                                            <><FaCheckCircle /> Solved</>
                                        ) : (
                                            <><div className="w-4 h-4 border-2 border-current rounded-full" /> Mark Solved</>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                {activeQuestion.problemStatement}
                            </div>
                        </div>

                        {/* Examples */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
                                <span className="text-xs font-bold text-gray-400 uppercase">Input</span>
                                <div className="mt-2 font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg break-all">
                                    {activeQuestion.sampleInput}
                                </div>
                            </div>
                            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
                                <span className="text-xs font-bold text-gray-400 uppercase">Output</span>
                                <div className="mt-2 font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg break-all">
                                    {activeQuestion.sampleOutput}
                                </div>
                            </div>
                        </div>

                        {/* Solutions */}
                        <div className="space-y-8">
                            <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-800 pb-2">
                                Solutions & Approaches
                            </h2>

                            {activeQuestion.approaches.map((approach, idx) => (
                                <div key={idx} className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold">
                                            {idx + 1}
                                        </div>
                                        <h3 className="text-xl font-bold">{approach.name}</h3>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-400 pl-11">
                                        {approach.explanation}
                                    </p>

                                    <div className="pl-11 grid grid-cols-2 gap-4 mb-2">
                                        <div className="text-sm">
                                            <span className="font-bold text-gray-500">Time:</span> <span className="font-mono text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">{approach.timeComplexity}</span>
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-bold text-gray-500">Space:</span> <span className="font-mono text-purple-500 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 rounded">{approach.spaceComplexity}</span>
                                        </div>
                                    </div>

                                    <div className="pl-11">
                                        <CodeSolution code={approach.code} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* User Workspace */}
                        <UserSolutionEditor questionId={activeQuestion.id} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-50 pt-20">
                        <FaCode size={48} className="mb-4" />
                        <h2 className="text-2xl font-bold">Select a Question</h2>
                        <p>Choose a topic from the sidebar to start coding.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DSAPage;
