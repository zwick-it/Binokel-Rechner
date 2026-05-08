import React, { createContext, useState } from 'react';

export const GameContext = createContext();

const initialScores = {
  player1: 0,
  player2: 0,
  player3: 0,
};

export const GameProvider = ({ children }) => {
  const [scores, setScores] = useState(initialScores);
  const [history, setHistory] = useState([]);

  const addRound = (roundScores) => {
    setScores((currentScores) => {
      const nextScores = {
        player1: currentScores.player1 + roundScores.player1,
        player2: currentScores.player2 + roundScores.player2,
        player3: currentScores.player3 + roundScores.player3,
      };

      setHistory((currentHistory) => [
        ...currentHistory,
        {
          round: currentHistory.length + 1,
          roundScores,
          totals: nextScores,
        },
      ]);

      return nextScores;
    });
  };

  const resetGame = () => {
    setScores(initialScores);
    setHistory([]);
  };

  return (
    <GameContext.Provider value={{ scores, history, addRound, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
