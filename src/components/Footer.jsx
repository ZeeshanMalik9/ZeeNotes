
import React from 'react';
import { FaHeart, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {

    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Branding */}
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 mb-2">
                            Zee Notes
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Mastering web development, one note at a time.
                        </p>
                    </div>

                    {/* Contact Logos */}
                    <div className="flex items-center gap-6">
                        <a
                            href="https://www.linkedin.com/in/zeeshanmalik9/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110 duration-200"
                            title="Connect on LinkedIn"
                        >
                            <FaLinkedin size={28} />
                        </a>
                        <a
                            href="mailto:zeeshan.m9990@gmail.com"
                            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors transform hover:scale-110 duration-200"
                            title="Send Email"
                        >
                            <FaEnvelope size={28} />
                        </a>
                    </div>



                </div>
            </div>
        </footer>
    );
};

export default Footer;
