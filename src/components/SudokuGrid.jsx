import { useState, useEffect } from 'react';
import SudokuCell from './SudokuCell';
import './SudokuGrid.css';

const SudokuGrid = ({ board, fixedCells, onCellChange }) => {
  const [selectedCell, setSelectedCell] = useState(null);

  const handleCellSelect = (row, col) => {
    setSelectedCell({ row, col });
  };

  const isHighlighted = (row, col) => {
    if (!selectedCell) return false;
    return selectedCell.row === row ||
           selectedCell.col === col ||
           (Math.floor(selectedCell.row / 3) === Math.floor(row / 3) &&
            Math.floor(selectedCell.col / 3) === Math.floor(col / 3));
  };

  const getCellValue = (row, col) => {
    if (!board || !board[row]) return 0;
    return board[row][col] || 0;
  };

  return (
    <div className="sudoku-grid">
      {Array(9).fill(null).map((_, row) => (
        <div key={row} className="sudoku-row">
          {Array(9).fill(null).map((_, col) => {
            const isFixed = fixedCells?.[row]?.[col] || false;
            const isSelected = selectedCell?.row === row && selectedCell?.col === col;
            const highlighted = isHighlighted(row, col);

            return (
              <div
                key={`${row}-${col}`}
                className={`cell-wrapper ${col % 3 === 2 && col !== 8 ? 'border-right' : ''} ${row % 3 === 2 && row !== 8 ? 'border-bottom' : ''}`}
              >
                <SudokuCell
                  value={getCellValue(row, col)}
                  isFixed={isFixed}
                  isSelected={isSelected}
                  isHighlighted={highlighted}
                  onSelect={() => handleCellSelect(row, col)}
                  onValueChange={(val) => onCellChange(row, col, val)}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
