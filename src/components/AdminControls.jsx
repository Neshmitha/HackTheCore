import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { auth, database } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

const AdminControls = ({ isOpen, onClose, isLocked }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setUsername('');
            setPassword('');
            setError('');
            setIsAuthenticated(false);
        }
    }, [isOpen]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            // Append the domain so the user just types their username
            const email = `${username}@hackthecore.com`;
            await signInWithEmailAndPassword(auth, email, password);
            setIsAuthenticated(true);
        } catch (err) {
            console.error("Login Error:", err);
            setError('Invalid credentials');
        }
        setIsLoading(false);
    };

    const handleToggleLock = async () => {
        try {
            const lockRef = ref(database, 'gameSettings/adminControls/isLocked');
            await set(lockRef, !isLocked);
        } catch (err) {
            console.error("Error toggling lock:", err);
            alert("Failed to update lock state. Make sure you are authenticated.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="admin-modal-overlay">
            <motion.div 
                className="admin-modal glass-card"
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
            >
                <button className="close-btn" onClick={onClose}>×</button>
                <h2 className="neon-text">Admin Controls</h2>

                {!isAuthenticated ? (
                    <form onSubmit={handleLogin} className="admin-login-form">
                        <div className="form-group">
                            <label>Username</label>
                            <input 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                                className="admin-input"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                className="admin-input"
                                disabled={isLoading}
                            />
                        </div>
                        {error && <p className="error-text" style={{margin: '10px 0'}}>{error}</p>}
                        <button 
                            type="submit" 
                            className="glow-btn small-btn" 
                            style={{marginTop: '20px', width: '100%'}}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                ) : (
                    <div className="admin-dashboard">
                        <p style={{marginBottom: '15px'}}>Welcome, Admin!</p>
                        <p style={{marginBottom: '20px'}}>
                            Game Status: <strong className={isLocked ? "error-text" : "success-text"}>{isLocked ? "LOCKED" : "UNLOCKED"}</strong>
                        </p>
                        <button 
                            className="glow-btn small-btn"
                            onClick={handleToggleLock}
                            style={{width: '100%', background: isLocked ? 'rgba(0, 229, 255, 0.2)' : 'rgba(255, 50, 50, 0.2)'}}
                        >
                            {isLocked ? 'Unlock Game' : 'Lock Game'}
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default AdminControls;
