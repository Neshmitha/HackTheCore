import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';

const mcqSets = {
    setA: {
        id: 'A',
        setName: "C Pointer & Memory Scramble",
        passkey: "90",
        description: "Arrange the memory allocation and pointer arithmetic in order. Fix the 3 syntax bugs to compile.",
        blocks: [
            { id: 'G', label: 'int *ptr = (int*)malloc(5 * sizeof(int));', correct: 'int *ptr = (int*)malloc(5 * sizeof(int));' },
            { id: 'I', label: 'int sum = 0, i = 0;', correct: 'int sum = 0, i = 0;' },
            { id: 'J', label: 'for(i = 0; i < 5; i++) {', correct: 'for(i = 0; i < 5; i++) {' },
            { id: 'D', label: '*(ptr + i) = (i + 1) * 10;', correct: '*(ptr + i) = (i + 1) * 10;' },
            { id: 'K', label: '}', correct: '}' },
            { id: 'E', label: 'int *temp = ptr;', correct: 'int *temp = ptr;' },
            { id: 'F', label: 'for(i = 0; i < 5; i++) {', correct: 'for(i = 0; i < 5; i++) {' },
            { id: 'C', label: 'if(i % 2 == 0) {', correct: 'if(i % 2 == 0) {' },
            { id: 'A', label: 'sum = sum + temp', correct: 'sum = sum + *temp;' },
            { id: 'L', label: '}', correct: '}' },
            { id: 'B', label: 'temp++;', correct: 'temp++;' },
            { id: 'K2', label: '}', correct: '}' },
            { id: 'H', label: 'printf("%d", sum)', correct: 'printf("%d", sum);' }
        ],
        targetOrder: ['G', 'I', 'J', 'D', 'K', 'E', 'F', 'C', 'A', 'L', 'B', 'K2', 'H']
    },
    setB: {
        id: 'B',
        setName: "Hash Chaining Masterclass",
        passkey: "59",
        description: "Reconstruct Hash logic. Fix the 4 structural and syntax bugs to reveal the passkey.",
        blocks: [
            { id: 'G', label: 'struct Node* table[5] = {NULL};', correct: 'struct Node* table[5] = {NULL};' },
            { id: 'H', label: 'int keys[] = {12, 7, 18, 22, 32};', correct: 'int keys[] = {12, 7, 18, 22, 32};' },
            { id: 'D', label: 'for(i = 0; i < 5; i++) {', correct: 'for(i = 0; i < 5; i++) {' },
            { id: 'C', label: 'int h = keys[i] % 5', correct: 'int h = keys[i] % 5;' },
            { id: 'K', label: 'struct Node* nn = (struct Node*)malloc(sizeof(struct Node));', correct: 'struct Node* nn = (struct Node*)malloc(sizeof(struct Node));' },
            { id: 'I', label: 'nn.key = keys[i];', correct: 'nn->key = keys[i];' },
            { id: 'A', label: 'nn->next = table[h]', correct: 'nn->next = table[h];' },
            { id: 'B', label: 'table[h] = nn;', correct: 'table[h] = nn;' },
            { id: 'J', label: '}', correct: '}' },
            { id: 'E', label: 'int result = table[2]->key + table[2]->next->key;', correct: 'int result = table[2]->key + table[2]->next->key;' },
            { id: 'F', label: 'printf("%d", result + 5)', correct: 'printf("%d", result + 5);' }
        ],
        targetOrder: ['G', 'H', 'D', 'C', 'K', 'I', 'A', 'B', 'J', 'E', 'F']
    }
};

const Round3 = ({ teamData, onComplete }) => {
    const [challenge, setChallenge] = useState(null);
    const [blocks, setBlocks] = useState([]);
    const [passkeyInput, setPasskeyInput] = useState('');
    const [compilationSuccess, setCompilationSuccess] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');
    const [editingBlock, setEditingBlock] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [timeTaken, setTimeTaken] = useState(0);
    const [showWinnerPopup, setShowWinnerPopup] = useState(false);

    useEffect(() => {
        setStartTime(Date.now());
    }, []);

    useEffect(() => {
        const rollNo = teamData?.members?.[0]?.rollNo || "";
        const selected = /1602-25-/i.test(rollNo) ? mcqSets.setA : mcqSets.setB;
        setChallenge(selected);
        
        // Shuffle blocks
        const shuffled = [...selected.blocks].sort(() => Math.random() - 0.5);
        setBlocks(shuffled);
    }, [teamData]);

    const handleBlockEdit = (block) => {
        setEditingBlock(block.id);
        setEditValue(block.label);
    };

    const saveEdit = () => {
        setBlocks(prev => prev.map(b => b.id === editingBlock ? { ...b, label: editValue } : b));
        setEditingBlock(null);
    };

    const checkSolution = () => {
        const normalize = (str) => str.replace(/\s+/g, '').toUpperCase();
        
        // 1. Create user current code string
        const userCode = normalize(blocks.map(b => b.label).join(''));
        
        // 2. Create the target strings (Allow swapping the first two declaration lines)
        const targetBlocksMap = challenge.blocks.reduce((acc, b) => ({ ...acc, [b.id]: b.correct }), {});
        
        // Target 1: Original Order
        const target1 = normalize(challenge.targetOrder.map(id => targetBlocksMap[id]).join(''));
        
        // Target 2: Swapped first two declarations (G/H or G/I)
        const swappedOrder = [...challenge.targetOrder];
        [swappedOrder[0], swappedOrder[1]] = [swappedOrder[1], swappedOrder[0]];
        const target2 = normalize(swappedOrder.map(id => targetBlocksMap[id]).join(''));

        if (userCode === target1 || userCode === target2) {
            setCompilationSuccess(true);
            setStatusMsg("");
        } else {
            // Smart feedback: Determine if it's a Syntax mistake or a Logic (Order) mistake
            const isSyntaxClean = blocks.every(b => normalize(b.label) === normalize(b.correct));
            if (!isSyntaxClean) {
                setStatusMsg("❌ Syntax Error: Verify stars (*), arrows (->), and semicolons (;).");
            } else {
                setStatusMsg("❌ Logical Error: The block order is incorrect. Trace the flow carefully!");
            }
            setTimeout(() => setStatusMsg(""), 5000);
        }
    };

    const handlePasskeySubmit = () => {
        if (passkeyInput.trim() === challenge.passkey) {
            onComplete();
        } else {
            setStatusMsg("❌ Incorrect Passkey. Re-trace the code logic!");
            setTimeout(() => setStatusMsg(""), 3000);
        }
    };

    if (!challenge) return <div>Loading...</div>;

    return (
        <motion.div
            className="glass-card"
            style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '40px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h2 className="neon-text">FINALE: {challenge.setName} 🧩</h2>
            <p style={{ color: '#aaa', marginBottom: '30px' }}>{challenge.description}</p>

            {!compilationSuccess ? (
                <>
                    <div style={{ marginBottom: '30px' }}>
                        <Reorder.Group axis="y" values={blocks} onReorder={setBlocks} style={{ listStyle: 'none', padding: 0 }}>
                            {blocks.map((block) => (
                                <Reorder.Item 
                                    key={block.id} 
                                    value={block}
                                    style={{
                                        background: '#0d1117',
                                        border: '1px solid #30363d',
                                        padding: '12px 15px',
                                        marginBottom: '10px',
                                        borderRadius: '8px',
                                        cursor: 'grab',
                                        fontFamily: 'Fira Code, monospace',
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '15px'
                                    }}
                                    whileDrag={{ scale: 1.05, boxShadow: '0 0 25px rgba(88, 166, 255, 0.4)' }}
                                >
                                    <span style={{ color: '#8b949e', fontSize: '1.2rem', userSelect: 'none' }}>⠿</span>
                                    <div 
                                        style={{ flex: 1, color: '#e6edf3', cursor: 'pointer', textAlign: 'left' }}
                                        onClick={() => handleBlockEdit(block)}
                                    >
                                        {block.label}
                                    </div>
                                    <button 
                                        onClick={() => handleBlockEdit(block)}
                                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #444', color: '#8b949e', borderRadius: '4px', padding: '4px 10px', fontSize: '0.75rem' }}
                                    >
                                        Edit
                                    </button>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </div>

                    {editingBlock && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '12px', border: '1px solid #58a6ff', marginBottom: '25px' }}
                        >
                            <h4 style={{ margin: '0 0 10px 0', color: '#58a6ff' }}>Edit Line Logic:</h4>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input 
                                    className="modern-input" 
                                    value={editValue} 
                                    onChange={(e) => setEditValue(e.target.value)}
                                    style={{ margin: 0, flex: 1 }}
                                />
                                <button className="registration-action-btn" onClick={saveEdit} style={{ margin: 0, padding: '0 20px' }}>Save</button>
                            </div>
                        </motion.div>
                    )}

                    <div style={{ marginTop: '40px' }}>
                        <button 
                            className="registration-action-btn" 
                            onClick={checkSolution}
                            style={{ 
                                background: '#0d1117', 
                                border: '2px solid #58a6ff',
                                color: '#58a6ff',
                                padding: '15px 60px', 
                                fontSize: '1.3rem', 
                                boxShadow: '0 0 25px rgba(88, 166, 255, 0.3)' 
                            }}
                        >
                            Done ✅
                        </button>
                        {statusMsg && (
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ color: '#f85149', marginTop: '15px', fontWeight: 'bold', fontSize: '1.1rem' }}
                            >
                                {statusMsg}
                            </motion.p>
                        )}
                    </div>
                </>
            ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }}
                        style={{ background: 'rgba(126, 231, 135, 0.1)', border: '2px solid #7ee787', padding: '30px', borderRadius: '15px' }}
                    >
                        <h2 style={{ color: '#7ee787', marginBottom: '15px' }}>🚀 LOGIC COMPILED!</h2>
                        <p style={{ marginBottom: '30px', fontSize: '1.1rem' }}>The logic is sound. Trace the code blocks you arranged to find the <strong>output</strong>.</p>
                        
                        <div style={{ background: '#000', padding: '20px', borderRadius: '10px', marginBottom: '30px', fontFamily: 'monospace', color: '#7ee787', border: '1px solid #30363d', textAlign: 'left' }}>
                            <span style={{ color: '#8b949e' }}>$ ./final_trace</span><br/>
                            <span style={{ color: '#e6edf3' }}>Decryption active...</span><br/>
                            <span style={{ color: '#ffcc00' }}>[!] Verify Output Passkey:</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                            <input 
                                className="modern-input" 
                                style={{ width: '220px', margin: 0, textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}
                                placeholder="Enter Passkey"
                                value={passkeyInput}
                                onChange={(e) => setPasskeyInput(e.target.value)}
                            />
                            <button 
                                className="registration-action-btn" 
                                style={{ margin: 0, background: '#238636' }}
                                onClick={handlePasskeySubmit}
                            >
                                Submit Victory 🏆
                            </button>
                        </div>
                        {statusMsg && <p style={{ color: '#f85149', marginTop: '15px', fontWeight: 'bold' }}>{statusMsg}</p>}
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default Round3;
