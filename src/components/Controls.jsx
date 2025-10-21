import './Controls.css';

const Controls = ({ onNumberSelect, onNewGame, onClear, onHint, difficulty, onDifficultyChange }) => {
  const difficulties = ['easy', 'medium', 'hard', 'expert'];

  return (
    <div className="controls">
      <div className="difficulty-selector">
        <label>Difficulty: </label>
        <select value={difficulty} onChange={(e) => onDifficultyChange(e.target.value)}>
          {difficulties.map(diff => (
            <option key={diff} value={diff}>
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="number-buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            className="number-button"
            onClick={() => onNumberSelect(num)}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="action-buttons">
        <button className="action-button new-game" onClick={onNewGame}>
          New Game
        </button>
        <button className="action-button clear" onClick={onClear}>
          Clear
        </button>
        <button className="action-button hint" onClick={onHint}>
          Hint
        </button>
      </div>
    </div>
  );
};

export default Controls;
