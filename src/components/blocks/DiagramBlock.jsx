import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad: true,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'Inter',
});

const DiagramBlock = ({ title, definition }) => {
    const [svg, setSvg] = React.useState('');
    const id = React.useId().replace(/:/g, ''); // Unique ID for this instance

    useEffect(() => {
        const renderDiagram = async () => {
            try {
                // Mermaid needs a unique ID for each render
                const { svg } = await mermaid.render(`mermaid-${id}`, definition);
                setSvg(svg);
            } catch (error) {
                console.error('Mermaid render error:', error);
                // Fallback or error message could go here
                setSvg('<div class="text-red-500">Diagram Error</div>');
            }
        };

        renderDiagram();
    }, [definition, id]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col items-center shadow-lg dark:shadow-none"
        >
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-6">{title}</h3>
            <div
                className="mermaid-container w-full flex justify-center"
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        </motion.div>
    );
};

export default DiagramBlock;
