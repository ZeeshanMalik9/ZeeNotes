import React from 'react';
import { motion } from 'framer-motion';

const TheoryBlock = ({ title, content }) => {
    // Simple parser for **bold** and *italic*
    const parseContent = (text) => {
        let parsed = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
        return { __html: parsed };
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-lg"
        >
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">{title}</h2>
            <div
                className="prose prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-justify text-sm md:text-base"
                dangerouslySetInnerHTML={parseContent(content)}
            />
        </motion.div>
    );
};

export default TheoryBlock;
