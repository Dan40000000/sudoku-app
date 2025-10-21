import { useState, useEffect } from 'react'
import SudokuGrid from './components/SudokuGrid'
import Controls from './components/Controls'
import { generatePuzzle, isValidMove, isPuzzleComplete, copyBoard } from './utils/sudoku'
import './App.css'

function App() {
  const [board, setBoard] = useState(null)
  const [solution, setSolution] = useState(null)
  const [fixedCells, setFixedCells] = useState(null)
  const [selectedCell, setSelectedCell] = useState(null)
  const [difficulty, setDifficulty] = useState('medium')
  const [gameWon, setGameWon] = useState(false)

  // Initialize game on mount
  useEffect(() => {
    startNewGame(difficulty)
  }, [])

  const startNewGame = (diff) => {
    const { puzzle, solution: sol } = generatePuzzle(diff)
    setBoard(copyBoard(puzzle))
    setSolution(sol)
    setGameWon(false)

    // Mark fixed cells
    const fixed = puzzle.map(row => row.map(cell => cell !== 0))
    setFixedCells(fixed)
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
    startNewGame(difficulty)
  }

  if (!board) {
    return <div className="loading">Loading game...</div>
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sudoku</h1>
        {gameWon && <div className="win-message">You Won!</div>}
      </header>

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
  )
}

export default App
