import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const CongratulationsModal = ({ isOpen, onClose }) => {
    const { width, height } = useWindowSize();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <Confetti
                        width={width}
                        height={height}
                        recycle={false}
                        numberOfPieces={500}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 100 }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-200 dark:border-gray-700"
                    >
                        <div className="mb-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: "spring" }}
                                className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto"
                            >
                                <span className="text-4xl">🎉</span>
                            </motion.div>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Congratulations!
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            You've successfully completed the entire React Mastery course! You're now ready to build amazing applications.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onClose}
                            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                        >
                            Awesome!
                        </motion.button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CongratulationsModal;
