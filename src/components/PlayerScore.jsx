import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const PlayerScore = ({ playerId, playerName, color }) => {
  const { scores } = useContext(GameContext);

  return (
    <div className={`p-4 rounded-lg shadow-md ${color}`}>
      <input
        type="text"
        className="form-control mb-2"
        placeholder={playerName}
        value={playerName}
        onChange={(e) => console.log(e.target.value)} // Hier später State updaten
      />
      <span className="badge bg-white text-lg">{scores[playerId]}</span>
    </div>
  );
};

export default PlayerScore;