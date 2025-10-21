import { useState } from 'react'
import Home from './components/Home'
import SudokuGrid from './components/SudokuGrid'
import Controls from './components/Controls'
import { generatePuzzle, isValidMove, isPuzzleComplete, copyBoard } from './utils/sudoku'
import './App.css'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [board, setBoard] = useState(null)
  const [solution, setSolution] = useState(null)
  const [fixedCells, setFixedCells] = useState(null)
  const [selectedCell, setSelectedCell] = useState(null)
  const [difficulty, setDifficulty] = useState('medium')
  const [gameWon, setGameWon] = useState(false)

  const startNewGame = (diff) => {
    const { puzzle, solution: sol } = generatePuzzle(diff)
    setBoard(copyBoard(puzzle))
    setSolution(sol)
    setGameWon(false)
    setDifficulty(diff)
    setGameStarted(true)

    // Mark fixed cells
    const fixed = puzzle.map(row => row.map(cell => cell !== 0))
    setFixedCells(fixed)
  }

  const returnToHome = () => {
    setGameStarted(false)
    setBoard(null)
    setSelectedCell(null)
    setGameWon(false)
  }

  const handleNumberSelect = (num) => {
    if (!selectedCell || !board) return

    const { row, col } = selectedCell

    // Don't allow changing fixed cells
    if (fixedCells[row][col]) return

    // Validate the move
    const newBoard = copyBoard(board)
    newBoard[row][col] = num

    if (isValidMove(newBoard, row, col, num) || num === 0) {
      setBoard(newBoard)

      // Check if puzzle is complete
      if (isPuzzleComplete(newBoard, solution)) {
        setGameWon(true)
        setTimeout(() => {
          alert('Congratulations! You solved the puzzle!')
        }, 100)
      }
    }
  }

  const handleCellChange = (row, col, value) => {
    setSelectedCell({ row, col })
  }

  const handleClear = () => {
    if (!selectedCell || !board) return

    const { row, col } = selectedCell
    if (fixedCells[row][col]) return

    const newBoard = copyBoard(board)
    newBoard[row][col] = 0
    setBoard(newBoard)
  }

  const handleHint = () => {
    if (!selectedCell || !board || !solution) return

    const { row, col } = selectedCell
    if (fixedCells[row][col]) return

    const newBoard = copyBoard(board)
    newBoard[row][col] = solution[row][col]
    setBoard(newBoard)
  }

  const handleDifficultyChange = (newDiff) => {
    setDifficulty(newDiff)
  }

  const handleNewGame = () => {
    returnToHome()
  }

  // Mock saved game data - will be replaced with localStorage/database later
  const savedGame = null; // Set to null for now, can be: { difficulty: 'medium', progress: 45 }

  if (!gameStarted) {
    return <Home onStartGame={startNewGame} savedGame={savedGame} />
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <button className="back-button" onClick={returnToHome}>
            ← Back
          </button>
          <h1 className="app-title">Sudoku</h1>
          <div className="difficulty-badge">{difficulty}</div>
        </div>
        {gameWon && <div className="win-message">Puzzle Complete!</div>}
      </header>

      <div className="game-container">
        <SudokuGrid
          board={board}
          fixedCells={fixedCells}
          onCellChange={handleCellChange}
        />

        <Controls
          onNumberSelect={handleNumberSelect}
          onNewGame={handleNewGame}
          onClear={handleClear}
          onHint={handleHint}
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
        />
      </div>
    </div>
  )
}

export default App
