import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

const DiagramRenderer = ({ definition, isDarkMode = false }) => {
    const ref = useRef(null);
    const [svg, setSvg] = useState('');
    const [error, setError] = useState(null);
    const id = React.useId().replace(/:/g, ''); // Unique ID for mermaid

    useEffect(() => {
        // Initialize mermaid with theme
        mermaid.initialize({
            startOnLoad: false,
            theme: isDarkMode ? 'dark' : 'default',
            securityLevel: 'loose',
            fontFamily: 'Inter, sans-serif',
        });

        const renderDiagram = async () => {
            if (!definition) return;

            try {
                const { svg } = await mermaid.render(`mermaid-${id}`, definition);
                setSvg(svg);
                setError(null);
            } catch (err) {
                console.error('Mermaid render error:', err);
                setError('Failed to render diagram');
                // Mermaid leaves error text in the DOM, we need to clean it up manually sometimes
                // but render() usually handles it by throwing.
            }
        };

        renderDiagram();
    }, [definition, isDarkMode, id]);

    if (error) {
        return (
            <div className="p-4 border border-red-500 rounded text-red-500 bg-red-50 dark:bg-red-900/20">
                {error}
                <pre className="text-xs mt-2 overflow-auto">{definition}</pre>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className="w-full overflow-x-auto flex justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md my-8 border border-gray-200 dark:border-gray-700"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
};

export default DiagramRenderer;
