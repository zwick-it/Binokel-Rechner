import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const HistoryModal = () => {
  const { history } = useContext(GameContext);

  return (
    <div className="mt-4 bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-2">Historie</h2>
      {history.length === 0 ? (
        <p className="text-gray-600">Noch keine Runden eingetragen.</p>
      ) : (
      <ul>
        {history.map((entry, index) => (
          <li key={index} className="mb-2">
            Runde {entry.round}: Spieler 1 {entry.roundScores.player1}, Spieler 2 {entry.roundScores.player2}, Spieler 3 {entry.roundScores.player3}
            {' '}
            <span className="text-gray-600">
              Gesamt: {entry.totals.player1} / {entry.totals.player2} / {entry.totals.player3}
            </span>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default HistoryModal;
