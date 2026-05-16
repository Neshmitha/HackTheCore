import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, database } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set, push, onValue } from 'firebase/database';

const appsScriptCode = `// 📊 Multi-Round Leaderboard Script

function doPost(e) {
  if (typeof e === 'undefined') {
    return ContentService.createTextOutput(JSON.stringify({status: 'error'})).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    const postData = JSON.parse(e.postData.contents);
    const action = postData.action;

    if (action === 'register') return handleRegistration(postData.data);
    if (action === 'updateStatus') return handleStatusUpdate(postData.data);
    if (action === 'finish') return handleFinish(postData.data);

    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'Unknown action'})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleRegistration(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const timestamp = new Date();
  let details = data.members.map(m => \`\${m.name} (\${m.rollNo})\`).join(', ');
  const row = [timestamp, data.teamName, details, "STARTED", "LOCKED", "LOCKED", 999999, "N/A"];
  sheet.appendRow(row);
  return ContentService.createTextOutput(JSON.stringify({success: true, message: 'Registration Recorded'})).setMimeType(ContentService.MimeType.JSON);
}

function handleStatusUpdate(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const rows = sheet.getDataRange().getValues();
  const teamName = data.teamName;
  const round = data.round;
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][1] === teamName) {
      let colIndex = 4;
      if (round === 'round2') colIndex = 5;
      
      sheet.getRange(i + 1, colIndex).setValue("COMPLETED ✅");
      return ContentService.createTextOutput(JSON.stringify({success: true})).setMimeType(ContentService.MimeType.JSON);
    }
  }
  return ContentService.createTextOutput(JSON.stringify({success: false, message: 'Team not found'})).setMimeType(ContentService.MimeType.JSON);
}

function handleFinish(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const rows = sheet.getDataRange().getValues();
  const teamName = data.teamName;
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][1] === teamName) {
      sheet.getRange(i + 1, 6).setValue("COMPLETED ✅"); 
      sheet.getRange(i + 1, 7).setValue(data.totalSeconds);
      sheet.getRange(i + 1, 8).setValue(data.formattedTime);
      
      const dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, 8);
      dataRange.sort({column: 7, ascending: true});
      
      return ContentService.createTextOutput(JSON.stringify({success: true})).setMimeType(ContentService.MimeType.JSON);
    }
  }
  return ContentService.createTextOutput(JSON.stringify({success: false})).setMimeType(ContentService.MimeType.JSON);
}`;

const AdminControls = ({ isOpen, onClose, isLocked }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [activeTab, setActiveTab] = useState('state');
    const [newLink, setNewLink] = useState('');
    const [newViewLink, setNewViewLink] = useState(''); // NEW STATE
    const [activeSheetUrl, setActiveSheetUrl] = useState('');
    const [activeViewUrl, setActiveViewUrl] = useState(''); // NEW STATE
    const [sheetHistory, setSheetHistory] = useState([]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setUsername('');
            setPassword('');
            setError('');
            setIsAuthenticated(false);
            setActiveTab('state');
        }
    }, [isOpen]);

    useEffect(() => {
        if (isAuthenticated) {
            const sheetRef = ref(database, 'gameSettings/adminControls/activeSheetUrl');
            const viewRef = ref(database, 'gameSettings/adminControls/activeViewUrl');
            const historyRef = ref(database, 'gameSettings/adminControls/sheetHistory');
            
            const unsubSheet = onValue(sheetRef, snap => setActiveSheetUrl(snap.val() || ''));
            const unsubView = onValue(viewRef, snap => setActiveViewUrl(snap.val() || ''));
            const unsubHistory = onValue(historyRef, snap => {
                const data = snap.val();
                if (data) {
                    const arr = Object.values(data).sort((a, b) => b.timestamp - a.timestamp);
                    setSheetHistory(arr);
                }
            });

            return () => { unsubSheet(); unsubView(); unsubHistory(); };
        }
    }, [isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
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
            alert("Failed to update lock state.");
        }
    };

    const handleUpdateSheet = async (e) => {
        e.preventDefault();
        if (!newLink.trim()) return;

        try {
            const urlRef = ref(database, 'gameSettings/adminControls/activeSheetUrl');
            await set(urlRef, newLink.trim());

            if (newViewLink.trim()) {
                const viewRef = ref(database, 'gameSettings/adminControls/activeViewUrl');
                await set(viewRef, newViewLink.trim());
            }

            const historyRef = ref(database, 'gameSettings/adminControls/sheetHistory');
            const newHistoryRef = push(historyRef);
            await set(newHistoryRef, {
                url: newLink.trim(),
                viewUrl: newViewLink.trim() || '',
                timestamp: Date.now()
            });

            setNewLink('');
            setNewViewLink('');
            alert('Active Google Sheet setup updated globally!');
        } catch (err) {
            console.error("Error updating sheet:", err);
            alert("Failed to update sheet setup.");
        }
    };

    const handleCopyScript = () => {
        navigator.clipboard.writeText(appsScriptCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="admin-modal-overlay">
            <motion.div 
                className={`admin-modal glass-card ${isAuthenticated ? 'admin-dashboard-modal' : ''}`}
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
            >
                <button className="close-btn" onClick={onClose}>×</button>
                <h2 className="neon-text">Admin {isAuthenticated ? 'Dashboard' : 'Login'}</h2>

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
                    <div className="dashboard-container">
                        <div className="dashboard-sidebar">
                            <button className={`tab-btn ${activeTab === 'state' ? 'active' : ''}`} onClick={() => setActiveTab('state')}>Game State</button>
                            <button className={`tab-btn ${activeTab === 'links' ? 'active' : ''}`} onClick={() => setActiveTab('links')}>Sheet Links</button>
                            <button className={`tab-btn ${activeTab === 'script' ? 'active' : ''}`} onClick={() => setActiveTab('script')}>Setup Script</button>
                        </div>
                        
                        <div className="dashboard-content">
                            {activeTab === 'state' && (
                                <div className="tab-pane">
                                    <h3>Global Lock Control</h3>
                                    <p style={{marginBottom: '20px', color: '#a8b2d1'}}>
                                        Locking the game will instantly prevent new users from starting across all devices.
                                    </p>
                                    <div className="state-status">
                                        Current Status: <strong className={isLocked ? "error-text" : "success-text"}>{isLocked ? "LOCKED" : "UNLOCKED"}</strong>
                                    </div>
                                    <button 
                                        className="glow-btn small-btn"
                                        onClick={handleToggleLock}
                                        style={{width: '100%', maxWidth: '300px', background: isLocked ? 'rgba(0, 229, 255, 0.2)' : 'rgba(255, 50, 50, 0.2)'}}
                                    >
                                        {isLocked ? 'Unlock Game Everywhere' : 'Lock Game Everywhere'}
                                    </button>
                                </div>
                            )}

                            {activeTab === 'links' && (
                                <div className="tab-pane">
                                    <h3>Google Sheet Management</h3>
                                    <form onSubmit={handleUpdateSheet} className="link-form" style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                                        <div>
                                            <label>1. Apps Script Web App URL (For Database):</label>
                                            <input 
                                                type="url" 
                                                value={newLink} 
                                                onChange={(e) => setNewLink(e.target.value)} 
                                                placeholder="https://script.google.com/macros/s/..." 
                                                className="admin-input"
                                                required 
                                            />
                                        </div>
                                        <div>
                                            <label>2. Direct Google Sheet Link (Optional, to open leaderboard):</label>
                                            <input 
                                                type="url" 
                                                value={newViewLink} 
                                                onChange={(e) => setNewViewLink(e.target.value)} 
                                                placeholder="https://docs.google.com/spreadsheets/d/..." 
                                                className="admin-input"
                                            />
                                        </div>
                                        <button type="submit" className="action-btn" style={{padding: '10px', marginTop: '5px'}}>Update Links</button>
                                    </form>

                                    <div className="active-link-display">
                                        <h4>Current Active Setup:</h4>
                                        <p className="url-text" style={{marginTop: '10px'}}><strong>Data URL:</strong><br/>{activeSheetUrl || "No active sheet set!"}</p>
                                        
                                        {activeViewUrl ? (
                                            <div style={{marginTop: '15px'}}>
                                                <a href={activeViewUrl} target="_blank" rel="noreferrer" className="glow-btn small-btn" style={{display: 'inline-block', textDecoration: 'none'}}>
                                                    Open Google Sheet
                                                </a>
                                            </div>
                                        ) : (
                                            <p className="url-text" style={{marginTop: '10px'}}><strong>View URL:</strong> Not set</p>
                                        )}
                                    </div>

                                    <div className="history-section">
                                        <h4>Previously Used Links ({sheetHistory.length})</h4>
                                        <div className="history-list">
                                            {sheetHistory.map((item, idx) => (
                                                <div key={idx} className="history-item">
                                                    <span className="history-date">{new Date(item.timestamp).toLocaleString()}</span>
                                                    <span className="history-url"><strong>Data:</strong> {item.url}</span>
                                                    {item.viewUrl && <span className="history-url" style={{marginTop: '4px'}}><strong>View:</strong> <a href={item.viewUrl} target="_blank" rel="noreferrer" style={{color: '#66ccff'}}>Open Sheet</a></span>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'script' && (
                                <div className="tab-pane">
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                                        <h3>Leaderboard Setup Script</h3>
                                        <button onClick={handleCopyScript} className="action-btn" style={{padding: '8px 15px', fontSize: '0.9rem'}}>
                                            {copied ? 'Copied! ✅' : 'Copy Code 📋'}
                                        </button>
                                    </div>
                                    <p style={{fontSize: '0.9rem', color: '#a8b2d1', marginBottom: '10px'}}>
                                        Paste this directly into the Apps Script editor for your new Google Sheet, deploy as a Web App (Anyone), and paste the resulting URL in the "Sheet Links" tab.
                                    </p>
                                    <pre className="script-container">
                                        <code>{appsScriptCode}</code>
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default AdminControls;
