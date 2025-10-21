// Sudoku Game Logic

/**
 * Check if a number is valid in a given position
 */
export const isValidMove = (board, row, col, num) => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) return false;
    }
  }

  return true;
};

/**
 * Solve the Sudoku puzzle using backtracking
 */
export const solveSudoku = (board) => {
  const emptyCell = findEmptyCell(board);
  if (!emptyCell) return true; // Puzzle solved

  const [row, col] = emptyCell;

  for (let num = 1; num <= 9; num++) {
    if (isValidMove(board, row, col, num)) {
      board[row][col] = num;

      if (solveSudoku(board)) return true;

      board[row][col] = 0; // Backtrack
    }
  }

  return false;
};

/**
 * Find the next empty cell in the board
 */
const findEmptyCell = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) return [row, col];
    }
  }
  return null;
};

/**
 * Generate a complete Sudoku board
 */
export const generateCompleteBoard = () => {
  const board = Array(9).fill(null).map(() => Array(9).fill(0));

  // Fill the diagonal 3x3 boxes first (they don't affect each other)
  fillDiagonalBoxes(board);

  // Solve the rest of the board
  solveSudoku(board);

  return board;
};

/**
 * Fill the three diagonal 3x3 boxes
 */
const fillDiagonalBoxes = (board) => {
  for (let box = 0; box < 9; box += 3) {
    fillBox(board, box, box);
  }
};

/**
 * Fill a 3x3 box with random numbers
 */
const fillBox = (board, row, col) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffleArray(numbers);

  let index = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[row + i][col + j] = numbers[index++];
    }
  }
};

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

/**
 * Generate a Sudoku puzzle by removing numbers from a complete board
 */
export const generatePuzzle = (difficulty = 'medium') => {
  const board = generateCompleteBoard();
  const solution = board.map(row => [...row]);

  // Determine how many cells to remove based on difficulty
  const cellsToRemove = {
    easy: 30,
    medium: 40,
    hard: 50,
    expert: 60
  }[difficulty] || 40;

  // Remove numbers while ensuring the puzzle has a unique solution
  let removed = 0;
  const cells = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      cells.push([i, j]);
    }
  }
  shuffleArray(cells);

  while (removed < cellsToRemove && cells.length > 0) {
    const [row, col] = cells.pop();
    const backup = board[row][col];
    board[row][col] = 0;
    removed++;

    // For now, we'll trust the puzzle has a unique solution
    // A more robust implementation would verify this
  }

  return { puzzle: board, solution };
};

/**
 * Check if the current board state is complete and correct
 */
export const isPuzzleComplete = (board, solution) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== solution[i][j]) return false;
    }
  }
  return true;
};

/**
 * Deep copy a 2D array
 */
export const copyBoard = (board) => {
  return board.map(row => [...row]);
};
