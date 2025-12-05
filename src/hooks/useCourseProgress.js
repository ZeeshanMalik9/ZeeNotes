import { useState, useEffect } from 'react';

const useCourseProgress = () => {
    // Initialize state from localStorage or empty arrays
    const [completedTopics, setCompletedTopics] = useState(() => {
        const saved = localStorage.getItem('completedTopics');
        return saved ? JSON.parse(saved) : [];
    });

    const [completedQuestions, setCompletedQuestions] = useState(() => {
        const saved = localStorage.getItem('completedQuestions');
        return saved ? JSON.parse(saved) : [];
    });

    // Sync with localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
    }, [completedTopics]);

    useEffect(() => {
        localStorage.setItem('completedQuestions', JSON.stringify(completedQuestions));
    }, [completedQuestions]);

    // Toggle topic completion
    const markTopicComplete = (topicId) => {
        setCompletedTopics(prev => {
            if (prev.includes(topicId)) {
                return prev.filter(id => id !== topicId);
            }
            return [...prev, topicId];
        });
    };

    // Toggle question completion
    const markQuestionComplete = (questionId) => {
        setCompletedQuestions(prev => {
            if (prev.includes(questionId)) {
                return prev.filter(id => id !== questionId);
            }
            return [...prev, questionId];
        });
    };

    // Check if a topic is complete
    const isTopicComplete = (topicId) => completedTopics.includes(topicId);

    // Check if a question is complete
    const isQuestionComplete = (questionId) => completedQuestions.includes(questionId);

    return {
        completedTopics,
        completedQuestions,
        markTopicComplete,
        markQuestionComplete,
        isTopicComplete,
        isQuestionComplete
    };
};

export default useCourseProgress;
