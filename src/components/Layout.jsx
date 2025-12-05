import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-500/30 transition-colors duration-300 flex flex-col">
            <Navbar isDark={isDark} toggleTheme={toggleTheme} />
            <main className="pt-16 flex-grow">
                <Outlet context={{ isDark }} />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
