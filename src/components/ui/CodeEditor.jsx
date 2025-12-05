import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

const CodeEditor = ({ codeString, fileName = 'Example.jsx' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-lg overflow-hidden shadow-2xl bg-[#1e1e1e] border border-gray-700 my-8 font-mono text-sm">
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="ml-4 text-gray-400 text-xs">{fileName}</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <>
                            <Check size={14} className="text-green-500" />
                            <span className="text-xs text-green-500">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={14} />
                            <span className="text-xs">Copy Code</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code Area */}
            <div className="relative">
                <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    showLineNumbers={true}
                    customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: '#1e1e1e',
                        fontSize: '14px',
                        lineHeight: '1.5',
                    }}
                    lineNumberStyle={{
                        minWidth: '2.5em',
                        paddingRight: '1em',
                        color: '#858585',
                        textAlign: 'right',
                    }}
                >
                    {codeString}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeEditor;
