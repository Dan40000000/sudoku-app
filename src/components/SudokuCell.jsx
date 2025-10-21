import { useState } from 'react';
import './SudokuCell.css';

const SudokuCell = ({ value, isFixed, isSelected, isHighlighted, onSelect, onValueChange }) => {
  const [notes, setNotes] = useState([]);

  const handleClick = () => {
    onSelect();
  };

  const getCellClassName = () => {
    const classes = ['sudoku-cell'];
    if (isFixed) classes.push('fixed');
    if (isSelected) classes.push('selected');
    if (isHighlighted) classes.push('highlighted');
    if (value === 0 || value === null) classes.push('empty');
    return classes.join(' ');
  };

  return (
    <div className={getCellClassName()} onClick={handleClick}>
      {value !== 0 && value !== null ? value : ''}
    </div>
  );
};

export default SudokuCell;
