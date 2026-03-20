import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const crosswords = [
    {
        id: 1, embedUrl: "https://crosswordlabs.com/embed/puzzle-1-6082", cols: 14, rows: 9, passkey: "COMPILER", jumbled: "MOCPELRI", jumbledHint: "The software that translates your C code into machine language.",
        words: [
            { num: 2, dir: 'across', word: 'SYNTAX', r: 1, c: 9, clue: 'The formal rules of a programming language' },
            { num: 3, dir: 'across', word: 'FLOAT', r: 2, c: 5, clue: 'Data type for numbers with decimal points' },
            { num: 4, dir: 'across', word: 'MAIN', r: 4, c: 7, clue: 'The starting function in every C program' },
            { num: 6, dir: 'across', word: 'INT', r: 7, c: 5, clue: 'Data type used for whole numbers in C' },
            { num: 7, dir: 'across', word: 'COLON', r: 8, c: 1, clue: 'Symbol at the end of a Python if-statement' },
            { num: 1, dir: 'down', word: 'COMMENT', r: 1, c: 7, clue: 'Code lines ignored by the computer' },
            { num: 2, dir: 'down', word: 'STRING', r: 1, c: 9, clue: 'Text wrapped in quotes in Python' },
            { num: 5, dir: 'down', word: 'PRINT', r: 5, c: 5, clue: 'Command to display output in Python and C' }
        ]
    },
    {
        id: 2, embedUrl: "https://crosswordlabs.com/embed/puzzle-2-1927", cols: 10, rows: 12, passkey: "BROWSER", jumbled: "WROBSRE", jumbledHint: "The tool you use to navigate the web and search for answers.",
        words: [
            { num: 3, dir: 'across', word: 'INDENT', r: 6, c: 5, clue: 'Python uses this to define code blocks' },
            { num: 4, dir: 'across', word: 'BOOLEAN', r: 8, c: 1, clue: 'A data type that is either True or False' },
            { num: 6, dir: 'across', word: 'ELSE', r: 10, c: 1, clue: "Runs when the 'if' condition is false" },
            { num: 7, dir: 'across', word: 'AND', r: 11, c: 6, clue: 'Logical operator requiring both sides to be true' },
            { num: 1, dir: 'down', word: 'RETURN', r: 1, c: 9, clue: 'Keyword to send a value back from a function' },
            { num: 2, dir: 'down', word: 'WHILE', r: 4, c: 5, clue: 'A loop that runs as long as a condition is met' },
            { num: 4, dir: 'down', word: 'BREAK', r: 8, c: 1, clue: 'Keyword used to jump out of a loop' },
            { num: 5, dir: 'down', word: 'ARRAY', r: 8, c: 6, clue: 'A collection of same-type elements in C' }
        ]
    },
    {
        id: 3, embedUrl: "https://crosswordlabs.com/embed/puzzle-3-1188", cols: 12, rows: 12, passkey: "ROUTER", jumbled: "TERUOR", jumbledHint: "The hardware that directs internet traffic to your device.",
        words: [
            { num: 2, dir: 'across', word: 'COMPILER', r: 2, c: 3, clue: 'Translates C code into machine language' },
            { num: 5, dir: 'across', word: 'POINTER', r: 6, c: 2, clue: 'A C variable that stores a memory address' },
            { num: 7, dir: 'across', word: 'MODULO', r: 8, c: 7, clue: 'The % operator that finds the remainder' },
            { num: 8, dir: 'across', word: 'HEADER', r: 10, c: 1, clue: 'The .h files used at the top of C code' },
            { num: 1, dir: 'down', word: 'SOURCE', r: 1, c: 5, clue: 'The human-readable code written by a programmer' },
            { num: 3, dir: 'down', word: 'BUFFER', r: 4, c: 1, clue: 'Temporary storage used during data transfer' },
            { num: 4, dir: 'down', word: 'BINARY', r: 5, c: 4, clue: 'The base-2 language of 0s and 1s' },
            { num: 6, dir: 'down', word: 'RAM', r: 6, c: 7, clue: 'Volatile memory where active programs live' }
        ]
    },

    {
        id: 4, embedUrl: "https://crosswordlabs.com/embed/puzzle-4-1217", cols: 10, rows: 10, passkey: "PROMPT", jumbled: "PMRTPO", jumbledHint: "The blinking line or text that waits for your command in a terminal.",
        words: []
    },
    {
        id: 5, embedUrl: "https://crosswordlabs.com/embed/puzzle-5-195", cols: 10, rows: 10, passkey: "KEYBOARD", jumbled: "YKEBROAD", jumbledHint: "Your primary hardware for 'inputting' code, line by line.",
        words: [
            { num: 3, dir: 'across', word: 'DEBUG', r: 3, c: 2, clue: 'The process of finding and fixing code errors' },
            { num: 5, dir: 'across', word: 'SEMICOLON', r: 5, c: 2, clue: 'The required ending for most C code lines' },
            { num: 7, dir: 'across', word: 'OUTPUT', r: 7, c: 2, clue: 'The final result produced by a program' },
            { num: 8, dir: 'across', word: 'VARIABLE', r: 9, c: 1, clue: 'A named container used to store data' },
            { num: 1, dir: 'down', word: 'KEYWORD', r: 1, c: 9, clue: "A reserved word like 'for' or 'while'" },
            { num: 2, dir: 'down', word: 'OBJECT', r: 2, c: 5, clue: 'In Python, almost everything is considered an ___' },
            { num: 4, dir: 'down', word: 'CONSTANT', r: 4, c: 8, clue: 'A value that cannot be changed during execution' },
            { num: 6, dir: 'down', word: 'RUNTIME', r: 6, c: 3, clue: 'An error that occurs while the program is running' }
        ]
    },
    {
        id: 6, embedUrl: "https://crosswordlabs.com/embed/puzzle-6-656", cols: 16, rows: 9, passkey: "SOFTWARE", jumbled: "WFTAOSRE", jumbledHint: "The intangible programs and data that tell the hardware what to do.",
        words: [
            { num: 4, dir: 'across', word: 'COOKIE', r: 2, c: 6, clue: 'A small piece of data stored by a browser' },
            { num: 7, dir: 'across', word: 'FIREWALL', r: 4, c: 1, clue: 'A security barrier for network traffic' },
            { num: 8, dir: 'across', word: 'PRIVATE', r: 5, c: 10, clue: 'OOP keyword to hide data from other classes' },
            { num: 9, dir: 'across', word: 'LINUX', r: 7, c: 10, clue: 'The open-source OS with a penguin mascot' },
            { num: 1, dir: 'down', word: 'BOOLEAN', r: 1, c: 7, clue: 'A data type that is only True or False' },
            { num: 2, dir: 'down', word: 'RECURSION', r: 1, c: 11, clue: 'A function that calls itself' },
            { num: 3, dir: 'down', word: 'MOUSE', r: 1, c: 16, clue: 'A handheld device used to control the cursor' },
            { num: 5, dir: 'down', word: 'GIGABYTE', r: 3, c: 2, clue: 'One thousand and twenty-four Megabytes' },
            { num: 6, dir: 'down', word: 'JAVA', r: 3, c: 13, clue: 'Language known for "Write Once, Run Anywhere"' }
        ]
    },
    {
        id: 7, embedUrl: "https://crosswordlabs.com/embed/puzzle-6-656", cols: 15, rows: 15, passkey: "FIREWALL", jumbled: "LIAWFERL", jumbledHint: "A digital barrier that protects a network from unauthorized access.",
        words: [
            { num: 4, dir: 'across', word: 'PYTHON', r: 7, c: 5, clue: 'The language named after a comedy troupe' },
            { num: 5, dir: 'across', word: 'KERNEL', r: 9, c: 9, clue: 'The core heart of an Operating System' },
            { num: 7, dir: 'across', word: 'STRING', r: 9, c: 2, clue: 'A sequence of characters in programming' },
            { num: 8, dir: 'across', word: 'CACHE', r: 11, c: 1, clue: 'Small, ultra-fast memory inside the CPU' },
            { num: 9, dir: 'across', word: 'ROUTER', r: 11, c: 7, clue: 'A device that directs internet' },
            { num: 1, dir: 'down', word: 'DEADLOCK', r: 2, c: 9, clue: 'A situation where two processes wait forever' },
            { num: 2, dir: 'down', word: 'INTEGER', r: 5, c: 7, clue: 'A variable type used for whole numbers' },
            { num: 3, dir: 'down', word: 'MONITOR', r: 7, c: 12, clue: 'The screen used to display output' },
            { num: 6, dir: 'down', word: 'PIXEL', r: 8, c: 5, clue: 'The smallest unit of a digital image' }
        ]
    },
    {
        id: 8, embedUrl: "https://crosswordlabs.com/embed/puzzle-8-405", cols: 12, rows: 11, passkey: "FRONTEND", jumbled: "TDNREONF", jumbledHint: "Everything a user sees and interacts with on a website's surface.",
        words: [
            { num: 3, dir: 'across', word: 'POINTER', r: 4, c: 1, clue: 'A variable that holds a memory address' },
            { num: 4, dir: 'across', word: 'GITHUB', r: 6, c: 2, clue: 'A popular platform for hosting code projects' },
            { num: 8, dir: 'across', word: 'CONSTANT', r: 8, c: 5, clue: 'A value that cannot change during execution' },
            { num: 9, dir: 'across', word: 'ARRAY', r: 11, c: 3, clue: 'A collection of items stored at fixed indexes' },
            { num: 1, dir: 'down', word: 'WIFI', r: 1, c: 3, clue: 'Wireless technology for internet access' },
            { num: 2, dir: 'down', word: 'DEBUG', r: 3, c: 6, clue: 'The act of finding and fixing code errors' },
            { num: 5, dir: 'down', word: 'BINARY', r: 6, c: 7, clue: 'The base-2 system used by computers' },
            { num: 6, dir: 'down', word: 'STACK', r: 6, c: 10, clue: 'A LIFO data structure like a pile of plates' },
            { num: 7, dir: 'down', word: 'HTML', r: 7, c: 12, clue: 'The language used to structure web pages' }
        ]
    },
    {
        id: 9, embedUrl: "https://crosswordlabs.com/embed/puzzle-8-405", cols: 10, rows: 12, passkey: "SYMBOLS", jumbled: "SLOMBYS", jumbledHint: "Characters like {, (, and & that hold special meaning in code.",
        words: [
            { num: 2, dir: 'across', word: 'CLASS', r: 2, c: 6, clue: 'A blueprint for creating objects in OOP' },
            { num: 4, dir: 'across', word: 'BACKUP', r: 5, c: 2, clue: 'A copy of data made to prevent loss' },
            { num: 7, dir: 'across', word: 'MODULO', r: 8, c: 5, clue: 'The operator that finds the division remainder' },
            { num: 8, dir: 'across', word: 'THREAD', r: 10, c: 1, clue: 'The smallest unit of a programmed process' },
            { num: 9, dir: 'across', word: 'QUERY', r: 12, c: 1, clue: 'A command used to get data' },
            { num: 1, dir: 'down', word: 'USB', r: 1, c: 9, clue: 'Universal port for connecting peripherals' },
            { num: 3, dir: 'down', word: 'LOOP', r: 2, c: 7, clue: 'A structure that repeats code multiple times' },
            { num: 5, dir: 'down', word: 'UPLOAD', r: 5, c: 6, clue: 'Sending data from a local to a remote system' },
            { num: 6, dir: 'down', word: 'SERVER', r: 8, c: 3, clue: 'A computer that provides data to clients' }
        ]
    },
    {
        id: 10, embedUrl: "https://crosswordlabs.com/embed/puzzle-8-405", cols: 12, rows: 10, passkey: "GRAPHICS", jumbled: "PHICAGRS", jumbledHint: "The visual processing power used for gaming and rendering UI.",
        words: [
            { num: 5, dir: 'across', word: 'COMPILER', r: 4, c: 2, clue: 'Software that turns source code into machine code' },
            { num: 7, dir: 'across', word: 'BIT', r: 5, c: 11, clue: 'The most basic unit of data (0 or 1)' },
            { num: 8, dir: 'across', word: 'ENCRYPT', r: 7, c: 6, clue: 'To scramble data so only authorized users read it' },
            { num: 9, dir: 'across', word: 'CLOUD', r: 10, c: 11, clue: 'Storing data on remote internet servers' },
            { num: 1, dir: 'down', word: 'PRIMARY', r: 1, c: 4, clue: 'The unique key in a database table' },
            { num: 2, dir: 'down', word: 'HACKER', r: 2, c: 2, clue: 'Someone who finds weaknesses in a system' },
            { num: 3, dir: 'down', word: 'VOID', r: 2, c: 6, clue: 'A function return type that returns nothing' },
            { num: 4, dir: 'down', word: 'SEARCH', r: 3, c: 8, clue: 'The process of finding an item in a list' },
            { num: 6, dir: 'down', word: 'VIRTUAL', r: 4, c: 12, clue: 'A C++ keyword for polymorphic functions' }
        ]
    }
];

const Crossword = ({ teamData, onComplete }) => {
    const [puzzle, setPuzzle] = useState(null);
    const [cells, setCells] = useState({});
    const [anagramInputs, setAnagramInputs] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [isCrosswordComplete, setIsCrosswordComplete] = useState(false);
    const [isAnagramCorrect, setIsAnagramCorrect] = useState(false);
    const [verificationInput, setVerificationInput] = useState('');
    const [showAnagram, setShowAnagram] = useState(false);
    const inputRefs = useRef({});
    const anagramRefs = useRef([]);

    const getPool = () => {
        let pool = crosswords;
        if (teamData && teamData.members && teamData.members.length > 0) {
            const rollNo = teamData.members[0].rollNo || "";
            // regex for 1602-25-xxx-xxx or similar
            const is25 = /1602-25-/i.test(rollNo);

            if (is25) {
                pool = crosswords.filter(p => p.id >= 1 && p.id <= 5);
            } else {
                pool = crosswords.filter(p => p.id > 5);
            }
        }
        return pool;
    };

    useEffect(() => {
        const pool = getPool();
        const selectedPuzzle = pool[Math.floor(Math.random() * pool.length)];

        if (!selectedPuzzle) return;

        // Build initial grid state based on mapping
        const map = {};
        selectedPuzzle.words.forEach(w => {
            for (let i = 0; i < w.word.length; i++) {
                const r = w.dir === 'down' ? w.r + i : w.r;
                const c = w.dir === 'across' ? w.c + i : w.c;
                const key = `${r}_${c}`;
                if (!map[key]) {
                    map[key] = { letter: w.word[i], num: null, value: '', correct: null };
                }
                if (i === 0 && !map[key].num) map[key].num = w.num;
            }
        });

        setPuzzle(selectedPuzzle);
        setCells(map);
        setIsCrosswordComplete(false);
        setIsAnagramCorrect(false);
        setAnagramInputs(Array(selectedPuzzle.passkey.length).fill(''));
        setVerificationInput('');
        setShowAnagram(false);
        setErrorMsg('');
    }, [teamData]);

    const handleChange = (r, c, e) => {
        const val = e.target.value.toUpperCase();
        const key = `${r}_${c}`;

        setCells(prev => ({
            ...prev,
            [key]: { ...prev[key], value: val }
        }));
        if (val && inputRefs.current[key]) {
            const nextKey = findNextKey(r, c);
            if (nextKey && inputRefs.current[nextKey]) {
                inputRefs.current[nextKey].focus();
            }
        }
    };

    const findNextKey = (r, c) => {
        const nextAcross = `${r}_${c + 1}`;
        if (cells[nextAcross]) return nextAcross;
        const nextDown = `${r + 1}_${c}`;
        if (cells[nextDown]) return nextDown;
        return null;
    };

    const handleKeyDown = (r, c, e) => {
        if (e.key === 'Backspace' && !cells[`${r}_${c}`].value) {
            let prevR = r; let prevC = c - 1;
            if (inputRefs.current[`${prevR}_${prevC}`]) {
                inputRefs.current[`${prevR}_${prevC}`].focus();
            } else {
                prevR = r - 1; prevC = c;
                if (inputRefs.current[`${prevR}_${prevC}`]) {
                    inputRefs.current[`${prevR}_${prevC}`].focus();
                }
            }
        }
    };

    const handleCheck = () => {
        let allCorrect = true;
        let anyEmpty = false;
        const newCells = { ...cells };

        Object.keys(newCells).forEach(key => {
            const cell = newCells[key];
            if (cell.value === '') {
                anyEmpty = true;
            } else if (cell.value !== cell.letter) {
                allCorrect = false;
            }
        });

        if (anyEmpty) {
            setErrorMsg("Please fill all boxes to check.");
        } else if (allCorrect) {
            setErrorMsg("");
            setIsCrosswordComplete(true);
            setShowAnagram(true);
        } else {
            setErrorMsg("Some letters are incorrect. Keep trying!");
        }
    };

    const handleAnagramChange = (index, val) => {
        const newVal = val.toUpperCase().slice(-1);
        const newInputs = [...anagramInputs];
        newInputs[index] = newVal;
        setAnagramInputs(newInputs);

        if (newVal && index < puzzle.passkey.length - 1) {
            anagramRefs.current[index + 1].focus();
        }
    };

    const handleAnagramKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !anagramInputs[index] && index > 0) {
            anagramRefs.current[index - 1].focus();
        }
    };

    const handleAnagramSubmit = () => {
        const answer = anagramInputs.join('').toUpperCase().trim();
        if (answer === puzzle.passkey.toUpperCase()) {
            setIsAnagramCorrect(true);
            setErrorMsg("");
        } else {
            setErrorMsg("Incorrect unscrambled word. Try again!");
        }
    };

    const handleLetterClick = (letter) => {
        const firstEmptyIndex = anagramInputs.findIndex(v => v === '');
        if (firstEmptyIndex !== -1) {
            const newInputs = [...anagramInputs];
            newInputs[firstEmptyIndex] = letter.toUpperCase();
            setAnagramInputs(newInputs);

            // Auto-focus next input
            if (firstEmptyIndex < puzzle.passkey.length - 1) {
                anagramRefs.current[firstEmptyIndex + 1]?.focus();
            }
        }
    };

    if (!puzzle) return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Loading Puzzle...</div>;

    const renderGrid = () => {
        const grid = [];
        for (let r = 1; r <= puzzle.rows; r++) {
            for (let c = 1; c <= puzzle.cols; c++) {
                const key = `${r}_${c}`;
                const cell = cells[key];
                const isBlack = puzzle.blacks && puzzle.blacks.some(b => b.r === r && b.c === c);

                // NEW: Calculate if this cell belongs to the Passkey word
                const passkeyWordObj = puzzle.words.find(w => w.word === puzzle.passkey);
                let isPasskeyCell = false;
                if (passkeyWordObj) {
                    const { r: startR, c: startC, word, dir } = passkeyWordObj;
                    for (let i = 0; i < word.length; i++) {
                        const targetR = dir === 'down' ? startR + i : startR;
                        const targetC = dir === 'across' ? startC + i : startC;
                        if (r === targetR && c === targetC) {
                            isPasskeyCell = true;
                            break;
                        }
                    }
                }

                if (cell) {
                    grid.push(
                        <div key={key} className="cw-cell" style={{ gridRow: r, gridColumn: c }}>
                            {cell.num && <span className="cw-num">{cell.num}</span>}
                            <input
                                ref={el => inputRefs.current[key] = el}
                                type="text"
                                maxLength={1}
                                className="cw-input"
                                value={cell.value}
                                onChange={(e) => handleChange(r, c, e)}
                                onKeyDown={(e) => handleKeyDown(r, c, e)}
                                style={{
                                    backgroundColor: (isCrosswordComplete && isPasskeyCell) ? '#ffcc00' : '',
                                    color: (isCrosswordComplete && isPasskeyCell) ? '#000' : '',
                                    fontWeight: (isCrosswordComplete && isPasskeyCell) ? 'bold' : 'normal',
                                    transition: 'background-color 1s ease-in-out'
                                }}
                            />
                        </div>
                    );
                } else if (isBlack) {
                    grid.push(
                        <div key={`black-${r}-${c}`} style={{ gridRow: r, gridColumn: c, backgroundColor: '#111', border: '1px solid #333' }}></div>
                    );
                }
            }
        }
        return grid;
    };

    return (
        <motion.div
            key={puzzle.id}
            className="glass-card registration-card"
            style={{ borderTop: '5px solid #00e5ff', maxWidth: '900px', width: '95%' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >

            <h2 className="neon-text">Round 1: Code-word Puzzle</h2>
            <p style={{ marginBottom: '20px' }}>Solve the crossword to unlock the final unscramble challenge!</p>

            {!isCrosswordComplete ? (
                <>
                    {puzzle.embedUrl ? (
                        <div style={{ textAlign: 'center', width: '100%', minHeight: '550px', position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                                <button
                                    className="registration-action-btn"
                                    style={{ padding: '8px 15px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', borderStyle: 'dashed', borderColor: '#00e5ff', color: '#00e5ff' }}
                                    onClick={() => window.open(puzzle.embedUrl, '_blank')}
                                >
                                    <span>↗️</span> Maximize Puzzle
                                </button>
                            </div>
                            <iframe
                                width="100%"
                                height="500"
                                style={{ 
                                    border: '3px solid #00e5ff', 
                                    background: '#fff', 
                                    borderRadius: '12px', 
                                    marginBottom: '15px',
                                    display: 'block',
                                    boxShadow: '0 0 20px rgba(0, 229, 255, 0.2)' 
                                }}
                                src={puzzle.embedUrl}
                                title="Crossword Puzzle"
                            />
                            <p style={{ fontSize: '0.8rem', color: '#8b949e' }}>
                                ⚠️ If the puzzle doesn't load, <a href={puzzle.embedUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#00e5ff', textDecoration: 'underline' }}>click here to open it in a new tab</a>.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="cw-grid" style={{ gridTemplateColumns: `repeat(${puzzle.cols}, 40px)`, gridTemplateRows: `repeat(${puzzle.rows}, 40px)`, margin: '0 auto' }}>
                                {renderGrid()}
                            </div>
                            <div className="cw-clues">
                                <div>
                                    <strong>Across</strong>
                                    <ul>
                                        {puzzle.words.filter(w => w.dir === 'across').map(w => (
                                            <li key={`a-${w.num}`}><strong>{w.num}.</strong> {w.clue}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <strong>Down</strong>
                                    <ul>
                                        {puzzle.words.filter(w => w.dir === 'down').map(w => (
                                            <li key={`d-${w.num}`}><strong>{w.num}.</strong> {w.clue}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}

                    <div style={{ textAlign: 'center', marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                        <button
                            className="registration-action-btn"
                            style={{ background: '#0b0f19', borderColor: '#00e5ff', color: '#00e5ff', padding: '15px 50px', fontSize: '1.3rem', boxShadow: '0 0 20px rgba(0, 229, 255, 0.2)' }}
                            onClick={puzzle.embedUrl ? () => { setIsCrosswordComplete(true); setShowAnagram(true); } : handleCheck}
                        >
                            Done
                        </button>
                    </div>
                    {errorMsg && <div className="neon-text" style={{ color: '#f44336', marginTop: '10px' }}>{errorMsg}</div>}
                </>
            ) : !isAnagramCorrect ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
                    <div style={{ border: '2px dashed #00e5ff', padding: '30px', borderRadius: '15px', background: 'rgba(0, 229, 255, 0.05)', marginBottom: '20px' }}>
                        <h3 style={{ color: '#00e5ff', fontSize: '1.8rem', margin: '0 0 15px 0' }}>FINAL CHALLENGE (PUZZLE {puzzle.id})</h3>
                        <p style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '20px' }}>Unscramble this word to get the Round 2 Passkey:</p>

                        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                {puzzle.jumbled.split('').map((char, charIdx) => (
                                    <motion.div
                                        key={`jumbled-${charIdx}`}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        onClick={() => handleLetterClick(char)}
                                        style={{
                                            width: '50px',
                                            height: '60px',
                                            background: 'rgba(0, 229, 255, 0.1)',
                                            border: '2px solid #00e5ff',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.8rem',
                                            fontWeight: 'bold',
                                            color: '#00e5ff',
                                            boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {char}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '15px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
                            <p style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontStyle: 'italic', background: 'rgba(0, 229, 255, 0.05)', padding: '10px', borderRadius: '8px', borderLeft: '4px solid #00e5ff' }}>
                                💡 Hint: {puzzle.jumbledHint}
                            </p>
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <p style={{ marginBottom: '15px', color: '#aaa' }}>Fill in the blanks:</p>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            {anagramInputs.map((val, i) => (
                                <input
                                    key={`anagram-${i}`}
                                    ref={el => anagramRefs.current[i] = el}
                                    type="text"
                                    maxLength={1}
                                    value={val}
                                    onChange={(e) => handleAnagramChange(i, e.target.value)}
                                    onKeyDown={(e) => handleAnagramKeyDown(i, e)}
                                    style={{
                                        width: '45px',
                                        height: '55px',
                                        textAlign: 'center',
                                        fontSize: '1.8rem',
                                        background: '#0b0f19',
                                        border: '2px solid rgba(0, 229, 255, 0.3)',
                                        borderRadius: '8px',
                                        color: '#00e5ff',
                                        outline: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#00e5ff'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(0, 229, 255, 0.3)'}
                                />
                            ))}
                        </div>
                    </div>

                    <button className="registration-action-btn" onClick={handleAnagramSubmit}>Validate Passkey 🚀</button>
                    {errorMsg && <div style={{ color: '#f44336', marginTop: '15px', fontWeight: 'bold' }}>{errorMsg}</div>}
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🏆</div>
                    <h2 style={{ color: '#00e5ff', fontSize: '2.2rem' }}>Congratulations!</h2>
                    <p style={{ fontSize: '1.2rem', color: '#fff' }}>You have successfully unscrambled the word!</p>

                    <div style={{ margin: '30px auto', padding: '20px', background: 'rgba(0, 229, 255, 0.05)', border: '2px solid #00e5ff', borderRadius: '12px', maxWidth: '400px' }}>
                        <p style={{ margin: '0 0 10px 0', color: '#00e5ff', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Access Granted</p>
                        <p style={{ margin: 0, fontSize: '1.1rem' }}>The passkey for Round 2 is:</p>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#00e5ff', margin: '10px 0', letterSpacing: '5px' }}>
                            {puzzle.passkey}
                        </div>
                    </div>

                    <button className="registration-action-btn" style={{ fontSize: '1.2rem', padding: '15px 40px' }} onClick={() => onComplete(puzzle.passkey)}>
                        Proceed to Round 2 👉
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Crossword;
