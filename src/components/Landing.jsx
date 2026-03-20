import React from 'react';
import { motion } from 'framer-motion';

const Landing = ({ onStart }) => {
    return (
        <div className="landing-container">
            <div className="video-background">
                <video autoPlay loop muted playsInline id="bg-video">
                    <source src="/Hack_the_core_landing_page.mp4" type="video/mp4" />
                </video>
            </div>

            <motion.div
                className="full-overlay flex-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                <motion.button
                    id="enter-btn"
                    className="glow-btn"
                    whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(0, 229, 255, 0.8)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onStart}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                >
                    Start Game
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Landing;
