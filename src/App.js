import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [player, setPlayer] = useState('X');
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] === '' && !winner) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);

      const newPlayer = player === 'X' ? 'O' : 'X';
      setPlayer(newPlayer);

      checkWinner(newBoard);
    }
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        updateScore(board[a]);
        return;
      }
    }

    if (!board.includes('')) {
      setWinner('draw');
    }
  };

  const updateScore = (player) => {
    setScore(prevScore => ({
      ...prevScore,
      [player]: prevScore[player] + 1
    }));
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(''));
    setPlayer('X');
    setWinner(null);
  };

  return (
    <div className="app">
      <h1>Jeu de Morpion</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div className="message">
          {winner === 'draw' ? (
            <p>Match nul !</p>
          ) : (
            <p>Le joueur <span>{winner}</span> a gagné !</p>
          )}
          <button onClick={resetBoard}>Rejouer</button>
        </div>
      )}
      <div className="score">
        <p>Score:</p>
        <p>Joueur X: {score.X}</p>
        <p>Joueur O: {score.O}</p>
      </div>
    </div>
  );
};

export default App;
