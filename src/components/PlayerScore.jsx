import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const PlayerScore = ({ playerId, playerName, color }) => {
  const { scores } = useContext(GameContext);

  return (
    <div className={`p-4 rounded-lg shadow-md ${color}`}>
      <h2 className="font-semibold mb-2">{playerName}</h2>
      <span className="inline-flex min-w-16 justify-center rounded bg-white px-3 py-2 text-xl font-bold">
        {scores[playerId]}
      </span>
    </div>
  );
};

export default PlayerScore;
