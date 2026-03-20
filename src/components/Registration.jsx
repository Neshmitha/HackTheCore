import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Registration = ({ onComplete }) => {
    const [teamName, setTeamName] = useState('');
    const [teamSize, setTeamSize] = useState('');
    const [members, setMembers] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSizeChange = (e) => {
        const size = parseInt(e.target.value) || 0;
        setTeamSize(e.target.value);
        if (size > 0 && size <= 2) {
            const newMembers = Array(size).fill({ name: '', rollNo: '' });
            for (let i = 0; i < Math.min(size, members.length); i++) {
                newMembers[i] = members[i];
            }
            setMembers(newMembers);
        } else {
            setMembers([]);
        }
    };

    const updateMember = (index, field, value) => {
        const newMembers = [...members];
        newMembers[index] = { ...newMembers[index], [field]: value };
        setMembers(newMembers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // All sheet submission is now handled by the parent App component
        onComplete({ 
            teamName, 
            teamSize: parseInt(teamSize), 
            members 
        });
    };

    return (
        <motion.div
            className="glass-card registration-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="neon-text">Team Registration</h2>
            <p>Please enter your team details before beginning the game.</p>

            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label>Team Name:</label>
                    <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                        placeholder="e.g. The Innovators"
                        className="modern-input"
                    />
                </div>

                <div className="form-group">
                    <label>Team Size:</label>
                    <input
                        type="number"
                        value={teamSize}
                        onChange={handleSizeChange}
                        min="1" max="2"
                        required
                        placeholder="Enter number of members"
                        className="modern-input"
                    />
                </div>

                <div className="members-grid">
                    {members.map((member, index) => (
                        <motion.div
                            key={index}
                            className="registration-member-card"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h4>Member {index + 1}</h4>
                            <div className="member-inputs">
                                <input
                                    type="text"
                                    value={member.name}
                                    onChange={(e) => updateMember(index, 'name', e.target.value)}
                                    placeholder="Name"
                                    required
                                    className="modern-input"
                                />
                                <input
                                    type="text"
                                    value={member.rollNo}
                                    onChange={(e) => updateMember(index, 'rollNo', e.target.value)}
                                    placeholder="Roll Number"
                                    required
                                    className="modern-input"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {members.length > 0 && (
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`registration-action-btn ${isSubmitting ? 'loading' : ''}`}
                        style={{ marginTop: '20px', width: '100%' }}
                    >
                        {isSubmitting ? 'Saving...' : 'Submit & Go to Game'}
                    </button>
                )}
            </form>
        </motion.div>
    );
};

export default Registration;
