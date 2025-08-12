import React, { useState } from 'react';
import Board from './Board';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const current = history[stepNumber];
  const winnerInfo = calculateWinner(current);
  const winner = winnerInfo?.winner;
  const isDraw = !winner && current.every(square => square !== null);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const currentSquares = [...current];

    if (calculateWinner(currentSquares) || currentSquares[i]) {
      return;
    }

    currentSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, currentSquares]);
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);

    const result = calculateWinner(currentSquares);
    if (result) {
      setScores(prev => ({
        ...prev,
        [result.winner]: prev[result.winner] + 1
      }));
    }
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
    resetGame();
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Game is a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-header">
        <h1>Tic Tac Toe</h1>
        <div className="score-board">
          <div className="score-item">Player X: {scores.X}</div>
          <div className="score-item">Player O: {scores.O}</div>
        </div>
      </div>

      <Board
        squares={current}
        onClick={handleClick}
        winningLine={winnerInfo?.line}
      />

      <div className="game-status">{status}</div>

      <div className="game-controls">
        <button className="button" onClick={resetGame}>
          New Game
        </button>
        <button className="button secondary" onClick={resetScores}>
          Reset Scores
        </button>
      </div>
    </div>
  );
};

export default Game;
