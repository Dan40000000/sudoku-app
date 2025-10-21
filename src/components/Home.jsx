import './Home.css';

const Home = ({ onStartGame }) => {
  const difficulties = [
    { id: 'easy', name: 'Easy', description: '30 filled cells' },
    { id: 'medium', name: 'Medium', description: '40 filled cells' },
    { id: 'hard', name: 'Hard', description: '50 filled cells' },
    { id: 'expert', name: 'Expert', description: '60 filled cells' }
  ];

  return (
    <div className="home">
      <div className="home-container">
        <div className="home-header">
          <h1 className="home-title">Sudoku</h1>
          <p className="home-subtitle">Choose your difficulty level</p>
        </div>

        <div className="difficulty-grid">
          {difficulties.map(diff => (
            <button
              key={diff.id}
              className="difficulty-card"
              onClick={() => onStartGame(diff.id)}
            >
              <div className="difficulty-name">{diff.name}</div>
              <div className="difficulty-description">{diff.description}</div>
            </button>
          ))}
        </div>

        <div className="home-footer">
          <p>Select a difficulty to begin playing</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
