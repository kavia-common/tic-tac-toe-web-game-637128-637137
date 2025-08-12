import React from 'react';

const Board = ({ squares, onClick, winningLine }) => {
  const renderSquare = (i) => {
    const isWinning = winningLine && winningLine.includes(i);
    const squareClass = `square${isWinning ? ' winner' : ''}${squares[i] ? ' highlighted' : ''}`;
    
    return (
      <button
        className={squareClass}
        onClick={() => onClick(i)}
        disabled={squares[i] || winningLine}
      >
        {squares[i]}
      </button>
    );
  };

  return (
    <div className="board">
      {Array(9).fill(null).map((_, i) => renderSquare(i))}
    </div>
  );
};

export default Board;
