import React, { useContext } from 'react';
import { GameContext, playerIds } from '../context/GameContext';

const HistoryModal = () => {
  const { history, playerNames } = useContext(GameContext);

  return (
    <section className="mt-4 rounded bg-white p-4 shadow-sm">
      <h2 className="text-xl font-bold mb-2">Historie</h2>
      {history.length === 0 ? (
        <p className="text-gray-600">Noch keine Runden eingetragen.</p>
      ) : (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b text-slate-600">
              <th className="py-2 pr-3">Runde</th>
              <th className="py-2 pr-3">Spieler</th>
              <th className="py-2 pr-3">Reizwert</th>
              {playerIds.map((playerId) => (
                <th className="py-2 pr-3" key={playerId}>{playerNames[playerId]}</th>
              ))}
              <th className="py-2 pr-3">Gesamt</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr className="border-b" key={entry.round}>
                <td className="py-2 pr-3">{entry.round}</td>
                <td className="py-2 pr-3">{entry.bidderId ? playerNames[entry.bidderId] : '-'}</td>
                <td className="py-2 pr-3">{entry.highestBid}</td>
                {playerIds.map((playerId) => (
                  <td className="py-2 pr-3" key={playerId}>{entry.results[playerId]}</td>
                ))}
                <td className="py-2 pr-3">
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
