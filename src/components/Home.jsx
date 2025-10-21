import { useState } from 'react';
import './Home.css';

const Home = ({ onStartGame, savedGame }) => {
  const [showNewGameModal, setShowNewGameModal] = useState(false);

  // Mock user data - will be replaced with real auth later
  const user = {
    name: 'Player',
    gamesPlayed: 24,
    gamesCompleted: 18
  };

  // Mock best times - will be stored in localStorage/database later
  const bestTimes = [
    { difficulty: 'Easy', time: '3:42', date: 'Oct 15, 2025' },
    { difficulty: 'Medium', time: '7:18', date: 'Oct 18, 2025' },
    { difficulty: 'Hard', time: '12:35', date: 'Oct 20, 2025' },
    { difficulty: 'Expert', time: '--:--', date: 'Not completed' }
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy', description: '30 filled cells' },
    { id: 'medium', name: 'Medium', description: '40 filled cells' },
    { id: 'hard', name: 'Hard', description: '50 filled cells' },
    { id: 'expert', name: 'Expert', description: '60 filled cells' }
  ];

  const handleStartGame = (difficulty) => {
    setShowNewGameModal(false);
    onStartGame(difficulty);
  };

  return (
    <div className="home">
      <div className="home-container">
        {/* Account Section */}
        <div className="account-section">
          <div className="user-avatar">
            <div className="avatar-circle">{user.name[0]}</div>
          </div>
          <div className="user-info">
            <h2 className="user-name">{user.name}</h2>
            <div className="user-stats">
              <span>{user.gamesPlayed} games played</span>
              <span className="stat-divider">•</span>
              <span>{user.gamesCompleted} completed</span>
            </div>
          </div>
        </div>

        {/* Saved Game Section */}
        {savedGame && (
          <div className="saved-game-section">
            <h3 className="section-title">Continue Playing</h3>
            <div className="saved-game-card">
              <div className="saved-game-info">
                <div className="saved-game-difficulty">{savedGame.difficulty}</div>
                <div className="saved-game-progress">{savedGame.progress}% complete</div>
              </div>
              <button className="continue-button" onClick={() => onStartGame(savedGame.difficulty, true)}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Best Times Section */}
        <div className="best-times-section">
          <h3 className="section-title">Best Times</h3>
          <div className="times-list">
            {bestTimes.map((record, index) => (
              <div key={index} className="time-record">
                <div className="record-left">
                  <span className="record-difficulty">{record.difficulty}</span>
                  <span className="record-date">{record.date}</span>
                </div>
                <div className="record-time">{record.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* New Game Button */}
        <button className="new-game-button" onClick={() => setShowNewGameModal(true)}>
          Start New Game
        </button>

        {/* New Game Modal */}
        {showNewGameModal && (
          <div className="modal-overlay" onClick={() => setShowNewGameModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-title">Choose Difficulty</h2>
              <div className="modal-difficulties">
                {difficulties.map(diff => (
                  <button
                    key={diff.id}
                    className="modal-difficulty-card"
                    onClick={() => handleStartGame(diff.id)}
                  >
                    <div className="modal-difficulty-name">{diff.name}</div>
                    <div className="modal-difficulty-description">{diff.description}</div>
                  </button>
                ))}
              </div>
              <button className="modal-close" onClick={() => setShowNewGameModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
