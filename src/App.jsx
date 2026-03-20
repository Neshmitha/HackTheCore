import { useState } from 'react';
import Landing from './components/Landing';
import Registration from './components/Registration';
import Crossword from './components/Crossword';
import Mcq from './components/Mcq';
import Round3 from './components/Round3';
import GrandFinale from './components/GrandFinale';
import './index.css';
import { GOOGLE_SHEET_URL } from './config';

function App() {
  const [currentRound, setCurrentRound] = useState('landing');
  const [teamData, setTeamData] = useState(null);
  const [round1Passkey, setRound1Passkey] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);

  const sendUpdate = async (payload) => {
    if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL === "PASTE_YOUR_SCRIPT_URL_HERE") return;
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload)
      });
    } catch (err) { console.error("Sheet Error:", err); }
  };

  const handleStartGame = () => setCurrentRound('registration');

  const handleRegistrationComplete = async (data) => {
    setTeamData(data);
    setStartTime(Date.now());
    setCurrentRound('round1');

    await sendUpdate({ 
      action: 'register', 
      teamName: data.teamName,
      member1: data.members[0] ? `${data.members[0].name} (${data.members[0].rollNo})` : 'N/A',
      member2: data.members[1] ? `${data.members[1].name} (${data.members[1].rollNo})` : 'N/A'
    });
  };

  const handleRound1Complete = async (passkey) => {
    setRound1Passkey(passkey);
    setCurrentRound('round2');
    await sendUpdate({ action: 'updateRound', teamName: teamData.teamName, round: 'round1' });
  };

  const handleRound2Complete = async () => {
    setCurrentRound('round3');
    await sendUpdate({ action: 'updateRound', teamName: teamData.teamName, round: 'round2' });
  };
  
  const handleRound3Complete = async () => {
    const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);
    setTotalTime(durationInSeconds);
    setCurrentRound('finale');

    // Mark Round 3 as complete and save final time
    await sendUpdate({ action: 'updateRound', teamName: teamData.teamName, round: 'round3' });
    await sendUpdate({ action: 'finish', teamName: teamData.teamName, totalTime: durationInSeconds });
  };
  const handleGameComplete = () => setCurrentRound('completed');

  return (
    <div className="app-container">
      {currentRound === 'landing' && <Landing onStart={handleStartGame} />}

      {currentRound === 'registration' && (
        <Registration onComplete={handleRegistrationComplete} />
      )}

      {currentRound === 'round1' && (
        <Crossword teamData={teamData} onComplete={handleRound1Complete} />
      )}

      {currentRound === 'round2' && (
        <Mcq teamData={teamData} round1Passkey={round1Passkey} onComplete={handleRound2Complete} />
      )}

      {currentRound === 'round3' && (
        <Round3 teamData={teamData} onComplete={handleRound3Complete} />
      )}

      {currentRound === 'finale' && (
        <GrandFinale teamData={teamData} totalTime={totalTime} onComplete={handleGameComplete} />
      )}

      {currentRound === 'completed' && (
        <div className="glass-card flex-center full-screen">
          <h1 className="neon-text">🎉 Game Completed! 🎉</h1>
          <p>Final Time: <strong>{Math.floor(totalTime/60)}m {totalTime%60}s</strong></p>
          <p>Thank you for playing. Check the leaderboard!</p>
        </div>
      )}
    </div>
  );
}

export default App;
