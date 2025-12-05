import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.5
            }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
