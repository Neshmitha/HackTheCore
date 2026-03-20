import React from 'react';
import { motion } from 'framer-motion';

const Landing = ({ onStart }) => {
    return (
        <div className="landing-container">
            <div className="hero-section">
                <div className="video-background">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        id="bg-video"
                        onError={() => console.error("Landing Video Failed to Load")}
                    >
                        <source src="/Hack_the_core_landing_page.mp4" type="video/mp4" />
                    </video>
                </div>

                <motion.div
                    className="full-overlay flex-center"
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

            {/* Event Coordinators Section */}
            <div className="coordinators-section">
                <h2 className="neon-text coordinators-title">Event Coordinators</h2>

                <div className="coordinators-content">
                    <div className="coordinators-grid">
                        <div className="coordinator-row">
                            <div className="coordinator-card">
                                <img src="/coordinator1.jpeg" alt="Coordinator 1" />
                            </div>
                            <div className="coordinator-info">
                                <h3 className="coordinator-name">B. Neshmitha</h3>
                                <div className="coordinator-links">
                                    <a href="mailto:neshmithab1@gmail.com" className="contact-link">
                                        <svg className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                                        Email
                                    </a>
                                    <a href="https://github.com/Neshmitha" target="_blank" rel="noopener noreferrer" className="contact-link">
                                        <svg className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        GitHub
                                    </a>
                                    <a href="https://www.linkedin.com/in/neshmitha-burgu-049089354/" target="_blank" rel="noopener noreferrer" className="contact-link">
                                        <svg className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="coordinator-row">
                            <div className="coordinator-card">
                                <img src="/coordinator2.jpeg" alt="Coordinator 2" />
                            </div>
                            <div className="coordinator-info">
                                <h3 className="coordinator-name">C. Sri Lasya</h3>
                                <div className="coordinator-links">
                                    <a href="mailto:csrilasya@gmail.com" className="contact-link">
                                        <svg className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                                        Email
                                    </a>
                                    <a href="https://github.com/Sri-Lasya99" target="_blank" rel="noopener noreferrer" className="contact-link">
                                        <svg className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        GitHub
                                    </a>
                                    <a href="https://www.linkedin.com/in/srilasyasyareddychalla/" target="_blank" rel="noopener noreferrer" className="contact-link">
                                        <svg className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a 
                        href="https://www.canva.com/design/DAHDK3RxRKs/i0ukWx2VWLpNJcqKgNAhIA/edit?utm_content=DAHDK3RxRKs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="side-title-link"
                    >
                        <div className="side-title-container">
                            <span className="side-title-hack">HACK</span>
                            <span className="side-title-the">THE</span>
                            <span className="side-title-core">CORE</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Landing;
