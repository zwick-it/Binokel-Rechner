import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const PlayerScore = ({ playerId, color, accent }) => {
  const { playerNames, renamePlayer, scores } = useContext(GameContext);

  return (
    <section className={`overflow-hidden rounded border bg-gradient-to-br p-4 shadow-sm ${color}`}>
      <div className={`mb-4 h-1.5 w-16 rounded-full ${accent}`} />
      <input
        className="mb-4 w-full rounded border border-slate-200 bg-white/85 px-3 py-2 font-semibold shadow-inner outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        value={playerNames[playerId]}
        onChange={(event) => renamePlayer(playerId, event.target.value)}
      />
      <div className="flex items-end justify-between gap-3">
        <span className="text-sm font-medium text-slate-500">Gesamt</span>
        <span className="rounded bg-white px-5 py-2 text-3xl font-bold shadow-sm">
          {scores[playerId]}
        </span>
      </div>
    </section>
  );
};

export default PlayerScore;
