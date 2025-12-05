import React from 'react';
import { motion } from 'framer-motion';
import { FaBook } from 'react-icons/fa';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-black">
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Revolving Container */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="relative w-full h-full"
                >
                    {/* Book Icon */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <FaBook className="text-4xl text-blue-600 dark:text-blue-400" />
                    </div>

                    {/* Z Letter */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                        <span className="text-4xl font-bold text-purple-600 dark:text-purple-400 font-mono">Z</span>
                    </div>
                </motion.div>

                {/* Center Pulse */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 m-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-xl"
                />
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-20 text-gray-500 dark:text-gray-400 font-medium tracking-widest uppercase text-sm"
            >
                Loading Experience
            </motion.p>
        </div>
    );
};

export default LoadingScreen;
