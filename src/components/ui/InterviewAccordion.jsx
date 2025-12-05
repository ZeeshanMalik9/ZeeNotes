import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const AccordionItem = ({ question, answer, tips, isOpen, onClick, isCompleted, onToggleComplete }) => {
    return (
        <div className="mb-4">
            <button
                onClick={onClick}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${isOpen
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-700'
                    }`}
            >
                <div className="flex items-center gap-3 text-left flex-1">
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleComplete();
                        }}
                        className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${isCompleted
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 dark:border-gray-500 hover:border-blue-400'
                            } ${isOpen ? 'bg-white/20 border-white/40' : ''}`}
                    >
                        {isCompleted && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                    <HelpCircle size={20} className={isOpen ? 'text-blue-200' : 'text-blue-500'} />
                    <span className={`font-semibold text-lg ${isCompleted ? 'line-through opacity-70' : ''}`}>
                        {question}
                    </span>
                </div>
                <ChevronDown
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    size={20}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 mt-2 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-inner">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                                {answer}
                            </p>
                            {tips && (
                                <div className="mt-4 flex items-start gap-2 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-100 dark:border-blue-800">
                                    <span className="font-bold uppercase tracking-wider text-xs mt-0.5">Tip:</span>
                                    <span>{tips}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const InterviewAccordion = ({ questions, completedQuestions = [], onToggleComplete }) => {
    const [openId, setOpenId] = useState(null);

    const toggleItem = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="w-full max-w-3xl mx-auto mt-12">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Interview Prep
            </h2>
            {questions.map((q) => (
                <AccordionItem
                    key={q.id}
                    question={q.question}
                    answer={q.answer}
                    tips={q.tips}
                    isOpen={openId === q.id}
                    onClick={() => toggleItem(q.id)}
                    isCompleted={completedQuestions.includes(q.id)}
                    onToggleComplete={() => onToggleComplete && onToggleComplete(q.id)}
                />
            ))}
        </div>
    );
};

export default InterviewAccordion;
