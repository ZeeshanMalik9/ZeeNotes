import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb } from 'react-icons/fa';

const ExampleBlock = ({ title, content }) => {
    // Parse **text** and *text* as bold
    const parseContent = (text) => {
        let parsed = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<strong>$1</strong>');
        return { __html: parsed };
    };

    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="mb-12 flex flex-col md:flex-row relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 border border-amber-200 dark:border-amber-500/20 p-4 md:p-6"
        >
            <div className="mb-4 md:mb-0 md:mr-6 pt-1">
                <div className="p-3 bg-amber-100 dark:bg-amber-500/20 rounded-full text-amber-600 dark:text-amber-500 inline-block">
                    <FaLightbulb className="text-2xl" />
                </div>
            </div>
            <div>
                <h3 className="text-lg md:text-xl font-bold text-amber-600 dark:text-amber-400 mb-2">{title}</h3>
                <div
                    className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base"
                    dangerouslySetInnerHTML={parseContent(content)}
                />
            </div>
        </motion.div>
    );
};

export default ExampleBlock;
