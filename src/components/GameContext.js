import React, { createContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [scores, setScores] = useState({
    player1: 0,
    player2: 0,
    player3: 0,
  });
  const [history, setHistory] = useState([]);

  const updateScores = (newScores) => {
    setScores(newScores);
    setHistory([...history, newScores]);
  };

  return (
    <GameContext.Provider value={{ scores, history, updateScores }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
