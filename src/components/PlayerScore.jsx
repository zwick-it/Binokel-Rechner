import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const PlayerScore = ({ playerId, color }) => {
  const { playerNames, renamePlayer, scores } = useContext(GameContext);

  return (
    <section className={`rounded border p-4 shadow-sm ${color}`}>
      <input
        className="mb-3 w-full rounded border border-white/70 bg-white/80 px-3 py-2 font-semibold"
        value={playerNames[playerId]}
        onChange={(event) => renamePlayer(playerId, event.target.value)}
      />
      <span className="inline-flex min-w-20 justify-center rounded bg-white px-4 py-2 text-2xl font-bold">
        {scores[playerId]}
      </span>
    </section>
  );
};

export default PlayerScore;
