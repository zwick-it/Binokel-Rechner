import React, { useContext } from 'react';
import { GameContext, playerIds } from '../context/GameContext';

const HistoryModal = () => {
  const { history, playerNames } = useContext(GameContext);

  return (
    <section className="mt-5 rounded border border-slate-300 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Spielverlauf</p>
          <h2 className="text-2xl font-bold">Historie</h2>
        </div>
        {history.length > 0 ? (
          <span className="rounded bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
            {history.length} Runden
          </span>
        ) : null}
      </div>
      {history.length === 0 ? (
        <p className="rounded border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-slate-600">
          Noch keine Runden eingetragen.
        </p>
      ) : (
      <div className="overflow-x-auto rounded border border-slate-200">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b bg-slate-100 text-slate-600">
              <th className="px-3 py-3">Runde</th>
              <th className="px-3 py-3">Spieler</th>
              <th className="px-3 py-3">Reizwert</th>
              {playerIds.map((playerId) => (
                <th className="px-3 py-3" key={playerId}>{playerNames[playerId]}</th>
              ))}
              <th className="px-3 py-3">Gesamt</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr className="border-b last:border-b-0" key={entry.round}>
                <td className="px-3 py-3 font-semibold">{entry.round}</td>
                <td className="px-3 py-3">{entry.bidderId ? playerNames[entry.bidderId] : '-'}</td>
                <td className="px-3 py-3">{entry.highestBid}</td>
                {playerIds.map((playerId) => (
                  <td className="px-3 py-3 font-medium" key={playerId}>{entry.results[playerId]}</td>
                ))}
                <td className="px-3 py-3 text-slate-600">
                  {playerIds.map((playerId) => entry.totals[playerId]).join(' / ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </section>
  );
};

export default HistoryModal;
