import React, { createContext, useEffect, useState } from 'react';

export const GameContext = createContext();

export const playerIds = ['player1', 'player2', 'player3'];

const initialScores = {
  player1: 0,
  player2: 0,
  player3: 0,
};

const initialPlayerNames = {
  player1: 'Spieler 1',
  player2: 'Spieler 2',
  player3: 'Spieler 3',
};

const storageKey = 'binokel-rechner-state-v1';

const getInitialState = () => {
  try {
    const savedState = window.localStorage.getItem(storageKey);

    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.warn('Spielstand konnte nicht geladen werden.', error);
  }

  return {
    scores: initialScores,
    history: [],
    playerNames: initialPlayerNames,
  };
};

export const GameProvider = ({ children }) => {
  const [scores, setScores] = useState(() => getInitialState().scores);
  const [history, setHistory] = useState(() => getInitialState().history);
  const [playerNames, setPlayerNames] = useState(() => getInitialState().playerNames);

  useEffect(() => {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ scores, history, playerNames })
    );
  }, [scores, history, playerNames]);

  const renamePlayer = (playerId, name) => {
    setPlayerNames((currentNames) => ({
      ...currentNames,
      [playerId]: name,
    }));
  };

  const addRound = (round) => {
    setScores((currentScores) => {
      const nextScores = {
        player1: currentScores.player1 + round.results.player1,
        player2: currentScores.player2 + round.results.player2,
        player3: currentScores.player3 + round.results.player3,
      };

      setHistory((currentHistory) => [
        ...currentHistory,
        {
          round: currentHistory.length + 1,
          ...round,
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

  const undoLastRound = () => {
    setHistory((currentHistory) => {
      if (currentHistory.length === 0) {
        return currentHistory;
      }

      const nextHistory = currentHistory.slice(0, -1);
      const nextScores = nextHistory.length > 0
        ? nextHistory[nextHistory.length - 1].totals
        : initialScores;

      setScores(nextScores);
      return nextHistory;
    });
  };

  const setManualScores = (nextScores) => {
    setScores(nextScores);
  };

  return (
    <GameContext.Provider
      value={{
        scores,
        history,
        playerNames,
        addRound,
        renamePlayer,
        resetGame,
        setManualScores,
        undoLastRound,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
