import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaMoon, FaSun, FaChevronDown, FaBook } from 'react-icons/fa';

const Navbar = ({ isDark, toggleTheme }) => {
    const [isTechOpen, setIsTechOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                            <FaBook className="text-blue-600 dark:text-blue-400 text-3xl" />
                        </motion.div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">
                            Zee Notes
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors relative group">
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full" />
                        </Link>

                        {/* Mega Menu Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsTechOpen(true)}
                            onMouseLeave={() => setIsTechOpen(false)}
                        >
                            <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors py-2">
                                <span>Course Tech</span>
                                <FaChevronDown className={`text-xs transition-transform ${isTechOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isTechOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden p-4"
                                    >
                                        <div className="grid gap-4">
                                            <Link to="/topic/history-imperative-declarative" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                                                <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                                    <FaReact className="text-blue-600 dark:text-blue-400 text-xl" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900 dark:text-white">React.js</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">The library for web and native user interfaces</div>
                                                </div>
                                            </Link>
                                            {/* Add more tech here later */}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link to="/interview-prep" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors relative group">
                            Interview Prep
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-500 transition-all group-hover:w-full" />
                        </Link>

                        {/* Theme Toggle */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-yellow-500 dark:text-yellow-400 transition-colors"
                        >
                            {isDark ? <FaSun /> : <FaMoon className="text-gray-700 dark:text-gray-300" />}
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-yellow-500 dark:text-yellow-400 transition-colors"
                        >
                            {isDark ? <FaSun /> : <FaMoon className="text-gray-700 dark:text-gray-300" />}
                        </motion.button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-700 dark:text-gray-300 focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            <Link
                                to="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                Home
                            </Link>

                            {/* Mobile Technical Courses Section */}
                            <div className="space-y-1">
                                <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Technical Courses
                                </div>
                                <Link
                                    to="/topic/history-imperative-declarative"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    <FaReact className="text-blue-500" />
                                    <span>React.js</span>
                                </Link>
                                {/* Add more courses here */}
                            </div>

                            <Link
                                to="/interview-prep"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                Interview Prep
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
