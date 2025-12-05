import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import TopicPage from './pages/TopicPage';
import InterviewPrep from './pages/InterviewPrep';
import LoadingScreen from './components/ui/LoadingScreen';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading experience
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {isLoading && <LoadingScreen />}
            </AnimatePresence>

            {!isLoading && (
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="topic/:topicId" element={<TopicPage />} />
                            <Route path="interview-prep" element={<InterviewPrep />} />
                        </Route>
                    </Routes>
                </Router>
            )}
        </>
    );
}

export default App;
