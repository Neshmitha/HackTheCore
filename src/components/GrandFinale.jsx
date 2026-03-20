import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GOOGLE_SHEET_URL } from '../config';

const GrandFinale = ({ teamData, totalTime, onComplete }) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [rank, setRank] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL === "PASTE_YOUR_SCRIPT_URL_HERE") {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(GOOGLE_SHEET_URL);
                const data = await response.json();
                setLeaderboard(data);
                
                // Find our team's rank
                const ourTeamName = teamData?.teamName;
                if (ourTeamName) {
                    const ourIndex = data.findIndex(t => t.teamName === ourTeamName);
                    if (ourIndex !== -1) {
                        setRank(ourIndex + 1);
                    }
                }
            } catch (err) {
                console.error("Leaderboard Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [teamData]);

    return (
        <motion.div 
            className="glass-card grand-finale-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', padding: '60px 40px' }}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
            >
                <h1 className="neon-text-gold" style={{ fontSize: '4rem', marginBottom: '10px' }}>MISSION ACCOMPLISHED</h1>
                <h2 className="neon-text-blue" style={{ fontSize: '2rem', marginBottom: '40px' }}>THE CORE IS SECURED</h2>
            </motion.div>

            <div className="finale-content">
                <p style={{ fontSize: '1.4rem', color: '#e6edf3', marginBottom: '30px' }}>
                    Congratulations, <strong className="neon-text">{teamData?.teamName || "Agent"}</strong>! 
                </p>
                <div style={{ background: 'rgba(88, 166, 255, 0.1)', border: '1px solid #58a6ff', padding: '20px', borderRadius: '15px', marginBottom: '40px' }}>
                    <h3 style={{ margin: 0, color: '#58a6ff' }}>TOTAL COMPETITION TIME</h3>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
                        {Math.floor(totalTime / 60)}m {totalTime % 60}s
                    </div>
                </div>

                <div className="achievement-grid">
                    <div className="achievement-item">
                        <span className="icon">🛡️</span>
                        <p>Firewall Bypassed</p>
                    </div>
                    <div className="achievement-item">
                        <span className="icon">🔑</span>
                        <p>Logic Decrypted</p>
                    </div>
                    <div className="achievement-item">
                        <span className="icon">⚡</span>
                        <p>Core Synchronized</p>
                    </div>
                </div>

                <motion.div 
                    className="leaderboard-teaser"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <h3 style={{ color: '#58a6ff', marginBottom: '20px' }}>
                        Leaderboard Status: {loading ? 'SYNCING...' : 'LIVE RANKINGS'}
                    </h3>
                    <div className="fake-leaderboard">
                        {loading ? (
                            <div className="leaderboard-row highlight flex-center">
                                <span>Syncing with Satellite...</span>
                            </div>
                        ) : rank ? (
                            <>
                                <div className="leaderboard-row highlight">
                                    <span>{rank}. {teamData.teamName} (YOU)</span>
                                    <span>{Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}</span>
                                </div>
                                {leaderboard.slice(0, 3).map((team, index) => (
                                    team.teamName !== teamData.teamName && (
                                        <div className="leaderboard-row" key={index}>
                                            <span>{index + 1}. {team.teamName}</span>
                                            <span>{Math.floor(team.totalTime / 60)}:{(team.totalTime % 60).toString().padStart(2, '0')}</span>
                                        </div>
                                    )
                                ))}
                            </>
                        ) : (
                            <div className="leaderboard-row highlight flex-center">
                                <span>Finish Syncing...</span>
                            </div>
                        )}
                    </div>
                </motion.div>

                <p style={{ marginTop: '40px', color: '#8b949e' }}>
                    Report to the event coordinators for your final score and rewards.
                </p>
            </div>

            <motion.button 
                className="registration-action-btn"
                style={{ marginTop: '40px', padding: '15px 40px' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.location.reload()}
            >
                RETURN TO SYSTEM HOME
            </motion.button>
        </motion.div>
    );
};

export default GrandFinale;
