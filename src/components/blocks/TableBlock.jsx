import React from 'react';
import { motion } from 'framer-motion';

const TableBlock = ({ title, headers, rows }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-lg overflow-hidden"
        >
            {title && (
                <div className="p-6 border-b border-gray-200 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/20">
                    <h2 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">{title}</h2>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100/50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300">
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    className="p-4 font-bold text-sm uppercase tracking-wider border-b border-gray-200 dark:border-gray-700"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {rows.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                            >
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className={`p-4 text-sm md:text-base text-gray-700 dark:text-gray-300 ${cellIndex === 0 ? 'font-semibold text-gray-900 dark:text-gray-100' : ''
                                            }`}
                                    >
                                        <div dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default TableBlock;
