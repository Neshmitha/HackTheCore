import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const mcqSets = [
    {
        id: 1, 
        finalPasskey: "15",
        setName: "Set 1: Python Logic",
        concept: "Variables and Basic Arithmetic",
        revealedCodeParts: [
            "x = 8",
            "y = 1",
            "z = x + y",
            "my_list = [10, 20, 30, 40, 50, 60]",
            "result = z + len(my_list)\nprint(result)"
        ],
        questions: [
            { q: "In Python, which operator is used for 'Floor Division' (division that discards the remainder)?", options: ["A) /", "B) //", "C) %", "D) **"], correctIndex: 1 },
            { q: "What is the output of print(2 ** 3)?", options: ["A) 6", "B) 5", "C) 8", "D) 9"], correctIndex: 2 },
            { q: "Which of these is a valid variable name in Python?", options: ["A) 2_var", "B) my-var", "C) my_var", "D) class"], correctIndex: 2 },
            { q: "What is the result of 10 % 3?", options: ["A) 3", "B) 1", "C) 0", "D) 3.33"], correctIndex: 1 },
            { q: "Which function is used to get the length of a list or string?", options: ["A) size()", "B) count()", "C) length()", "D) len()"], correctIndex: 3 }
        ]
    },
    {
        id: 2, 
        finalPasskey: "20",
        setName: "Set 2: C Programming Basics",
        concept: "Data Types and Simple Loops",
        revealedCodeParts: [
            "int a = 4;",
            "int b = 11;",
            "int count = 0;",
            "for(int i = 0; i < a; i++) { count += 2; }",
            "printf(\"%d\", count + b + 1);"
        ],
        questions: [
            { q: "Which format specifier is used to print an integer in C?", options: ["A) %f", "B) %c", "C) %d", "D) %s"], correctIndex: 2 },
            { q: "What is the size of an int data type in most 32-bit systems?", options: ["A) 1 Byte", "B) 2 Bytes", "C) 4 Bytes", "D) 8 Bytes"], correctIndex: 2 },
            { q: "How do you start a single-line comment in C?", options: ["A) #", "B) //", "C) /*", "D) --"], correctIndex: 1 },
            { q: "Which of these is the 'Address of' operator in C?", options: ["A) *", "B) &", "C) %", "D) $"], correctIndex: 1 },
            { q: "What is the value of 5 + 2 * 3 in C?", options: ["A) 21", "B) 11", "C) 10", "D) 15"], correctIndex: 1 }
        ]
    },
    {
        id: 3, 
        finalPasskey: "14",
        setName: "Set 3: The C \"Pointer & Logic\" Trap",
        concept: "Increment operators and basic pointer-style logic",
        revealedCodeParts: [
            "int val_q1 = 5;",
            "int val_q3 = 2;",
            "int val_q5 = 1;",
            "int result = (val_q1 * val_q3) + (val_q5 * 4);",
            "printf(\"%d\", result);"
        ],
        questions: [
            { q: "What is the value of x after: int x = 5; int y = x++;?", options: ["A) 6", "B) 5", "C) 4", "D) 7"], correctIndex: 1 },
            { q: "Which of these is the 'Dereference' operator in C?", options: ["A) &", "B) #", "C) *", "D) @"], correctIndex: 2 },
            { q: "In C, what does 5 / 2 evaluate to?", options: ["A) 2.5", "B) 2", "C) 3", "D) 0"], correctIndex: 1 },
            { q: "Which header file is required for malloc()?", options: ["A) stdio.h", "B) conio.h", "C) stdlib.h", "D) math.h"], correctIndex: 2 },
            { q: "What is the size of a char in C?", options: ["A) 1 Byte", "B) 2 Bytes", "C) 4 Bytes", "D) 8 Bytes"], correctIndex: 0 }
        ]
    },
    {
        id: 4, 
        finalPasskey: "42",
        setName: "Set 4: Python \"List & String\" Slice",
        concept: "Negative indexing, slicing, and logical operators",
        revealedCodeParts: [
            "a = 30",
            "b = 12",
            "limit = 4",
            "bonus = 10 if not False else 0",
            "print(a + b)"
        ],
        questions: [
            { q: "In Python, what is the value of list[-1] if list = [10, 20, 30]?", options: ["A) 10", "B) 20", "C) 30", "D) Error"], correctIndex: 2 },
            { q: "What is the output of bool(\"\") in Python?", options: ["A) True", "B) False", "C) None", "D) 0"], correctIndex: 1 },
            { q: "What is the result of 3 * 3 + 3?", options: ["A) 18", "B) 9", "C) 12", "D) 27"], correctIndex: 2 },
            { q: "Which keyword is used to handle exceptions in Python?", options: ["A) catch", "B) except", "C) error", "D) try"], correctIndex: 1 },
            { q: "What does range(5) generate?", options: ["A) 1 to 5", "B) 0 to 4", "C) 0 to 5", "D) 1 to 4"], correctIndex: 1 }
        ]
    }
];

const Mcq = ({ teamData, round1Passkey, onComplete }) => {
    const [mcqSet, setMcqSet] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [passkeyInput, setPasskeyInput] = useState('');
    const [entryPasskeyInput, setEntryPasskeyInput] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [attempts, setAttempts] = useState({});
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let pool = [];
        const rollNo = teamData?.members?.[0]?.rollNo || "";
        const is25 = /1602-25-/i.test(rollNo);
        
        if (is25) {
            pool = [mcqSets[0], mcqSets[1]]; // Set 1 & 2
        } else {
            pool = [mcqSets[2], mcqSets[3]]; // Set 3 & 4
        }
        
        const selectedSet = pool[Math.floor(Math.random() * pool.length)];
        setMcqSet(selectedSet);
        setAnswers(new Array(selectedSet.questions.length).fill(null));
        setAttempts({});
        setPasskeyInput('');
        setErrorMsg('');
    }, [teamData]);

    const handleOptionClick = (qIndex, optIndex) => {
        if (answers[qIndex] !== null) return;

        const currentAttempts = (attempts[qIndex] || 0) + 1;
        setAttempts(prev => ({ ...prev, [qIndex]: currentAttempts }));

        if (mcqSet.questions[qIndex].correctIndex === optIndex) {
            const newAns = [...answers];
            newAns[qIndex] = true;
            setAnswers(newAns);
            
            // Check if all answered correctly
            if (newAns.every(ans => ans === true)) {
                setIsComplete(true);
            }
        } else {
            const el = document.getElementById(`opt-${qIndex}-${optIndex}`);
            el.classList.add('incorrect');
            setTimeout(() => el.classList.remove('incorrect'), 1000);

            if (currentAttempts >= 2) {
                const newAns = [...answers];
                newAns[qIndex] = false; // Failed after 2 tries
                setAnswers(newAns);
                setErrorMsg("MISSION FAILED: Question Locked! No more attempts allowed.");
            }
        }
    };

    const handleEntrySubmit = () => {
        if (entryPasskeyInput.trim().toUpperCase() === round1Passkey.trim().toUpperCase()) {
            setIsUnlocked(true);
            setErrorMsg("");
        } else {
            setErrorMsg("Incorrect Entry Passkey. Please use the word you unscrambled!");
        }
    };

    const handlePasskeySubmit = () => {
        if (passkeyInput.trim().toUpperCase() === mcqSet.finalPasskey.trim().toUpperCase()) {
            onComplete();
        } else {
            setErrorMsg("Incorrect passkey. Please solve the code correctly!");
        }
    };

    if (!mcqSet) return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Loading...</div>;

    if (!isUnlocked) {
        return (
            <motion.div 
                className="glass-card flex-center" 
                style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center' }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <h2 className="neon-text">Round 2 Locked 🔒</h2>
                <p style={{ marginBottom: '20px' }}>To start the MCQs, please enter the Entry Passkey (the word you unscrambled in Round 1):</p>
                <input 
                    type="text" 
                    className="modern-input" 
                    placeholder="Enter Unscrambled Word"
                    value={entryPasskeyInput}
                    onChange={(e) => setEntryPasskeyInput(e.target.value)}
                    style={{ marginBottom: '20px', textAlign: 'center' }}
                />
                <button className="registration-action-btn" onClick={handleEntrySubmit}>Unlock Round 2 🔓</button>
                {errorMsg && <p style={{ color: '#f44336', marginTop: '10px' }}>{errorMsg}</p>}
            </motion.div>
        );
    }

    const allAnswered = answers.every(ans => ans === true);

    return (
        <motion.div
            className="glass-card"
            style={{ maxWidth: '1100px', margin: '0 auto', padding: '30px' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="neon-text" style={{ textAlign: 'center', marginBottom: '30px' }}>Round 2: {mcqSet.setName}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', alignItems: 'start' }}>
                {/* LEFT SIDE: QUESTIONS */}
                <div className="mcq-scroll" style={{ maxHeight: '700px', overflowY: 'auto', paddingRight: '15px' }}>
                    <p style={{ color: '#aaa', fontSize: '1rem', marginBottom: '25px', padding: '10px', background: 'rgba(0, 229, 255, 0.05)', borderRadius: '8px', borderLeft: '4px solid #00e5ff' }}>
                        💡 <strong>Strategy:</strong> Answer each question correctly to reveal a line of "Broken Code" on the right. Solve the code to find the passkey!
                    </p>
                    {mcqSet.questions.map((q, qIndex) => (
                        <div key={qIndex} className="mcq-card" style={{ marginBottom: '30px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: answers[qIndex] === false ? '2px solid #f44336' : '1px solid rgba(255,255,255,0.1)' }}>
                            <h4 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', color: answers[qIndex] === false ? '#f44336' : '#00e5ff', fontFamily: 'Rajdhani, sans-serif' }}>{qIndex + 1}. {q.q}</h4>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontFamily: 'Rajdhani, sans-serif' }}>
                                {q.options.map((opt, optIndex) => {
                                    const isCorrect = answers[qIndex] === true && q.correctIndex === optIndex;
                                    const isLocked = answers[qIndex] !== null;
                                    const isFailed = answers[qIndex] === false;
                                    
                                    return (
                                        <div
                                            key={optIndex}
                                            id={`opt-${qIndex}-${optIndex}`}
                                            className={`mcq-option ${isCorrect ? 'correct' : ''} ${isLocked ? 'locked' : ''} ${isFailed ? 'failed' : ''}`}
                                            style={{
                                                padding: '12px',
                                                background: isCorrect ? 'rgba(0, 229, 255, 0.2)' : isFailed ? 'rgba(244, 67, 54, 0.1)' : 'rgba(255,255,255,0.05)',
                                                borderRadius: '8px',
                                                cursor: isLocked ? 'default' : 'pointer',
                                                border: isCorrect ? '1px solid #00e5ff' : isFailed ? '1px solid #f44336' : '1px solid rgba(255,255,255,0.1)',
                                                color: isCorrect ? '#00e5ff' : isFailed ? '#f44336' : '#fff',
                                                fontSize: '1.1rem',
                                                fontWeight: '600',
                                                transition: 'all 0.2s ease',
                                                opacity: isLocked && !isCorrect && !isFailed ? 0.5 : 1
                                            }}
                                            onClick={() => handleOptionClick(qIndex, optIndex)}
                                        >
                                            {opt}
                                        </div>
                                    );
                                })}
                            </div>
                            {answers[qIndex] === false && (
                                <p style={{ color: '#f44336', fontSize: '0.85rem', marginTop: '10px', fontStyle: 'italic' }}>⚠️ Locked: 2 incorrect attempts. No more tries allowed.</p>
                            )}
                        </div>
                    ))}
                    {/* Removed Reset Button as per user request: "once lost they lost" */}
                </div>

                {/* RIGHT SIDE: PROGRESSIVE CODE REVEAL */}
                <div style={{ background: '#0d1117', borderRadius: '15px', padding: '25px', border: '1px solid #30363d', position: 'sticky', top: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #30363d', paddingBottom: '10px' }}>
                        <span style={{ color: '#58a6ff', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00e5ff' }}></span>
                            REVEALED_LOGIC.{mcqSet.setName.toLowerCase().includes('python') ? 'py' : 'c'}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#8b949e' }}>Read-Only</span>
                    </div>

                    <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '1rem', lineHeight: '1.6' }}>
                        {mcqSet.revealedCodeParts.map((line, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: answers[idx] ? 1 : 0.15, x: 0 }}
                                style={{ 
                                    padding: '6px 10px',
                                    marginBottom: '4px',
                                    borderRadius: '4px',
                                    background: answers[idx] ? 'rgba(0, 229, 255, 0.05)' : 'transparent',
                                    color: answers[idx] ? '#00e5ff' : '#444',
                                    display: 'flex',
                                    gap: '15px',
                                    borderLeft: answers[idx] ? '3px solid #00e5ff' : '3px solid transparent'
                                }}
                            >
                                <span style={{ color: '#8b949e', minWidth: '20px', userSelect: 'none' }}>{idx + 1}</span>
                                <span style={{ whiteSpace: 'pre-wrap' }}>
                                    {answers[idx] ? line : ""}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {allAnswered && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ marginTop: '30px', background: 'rgba(0, 229, 255, 0.05)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(0, 229, 255, 0.3)' }}
                        >
                            <h4 style={{ color: '#00e5ff', margin: '0 0 15px 0', fontSize: '1rem' }}>🔓 Code Decrypted!</h4>
                            <p style={{ fontSize: '0.85rem', color: '#ccc', marginBottom: '15px' }}>Solve the revealed code logic above and enter the final Passkey:</p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input 
                                    type="text" 
                                    className="modern-input" 
                                    placeholder="Final Output"
                                    value={passkeyInput}
                                    onChange={(e) => setPasskeyInput(e.target.value)}
                                    style={{ margin: 0, flex: 1, textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}
                                />
                                <button className="registration-action-btn" style={{ margin: 0, padding: '0 25px' }} onClick={handlePasskeySubmit}>Unlock Round 3</button>
                            </div>
                            {errorMsg && <p style={{ color: '#f85149', marginTop: '10px', fontSize: '0.9rem', fontWeight: 'bold' }}>{errorMsg}</p>}
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Mcq;
