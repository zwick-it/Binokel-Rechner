import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const HistoryModal = () => {
  const { history } = useContext(GameContext);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Historie</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index} className="mb-2">
            Spieler 1: {entry.player1}, Spieler 2: {entry.player2}, Spieler 3: {entry.player3}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryModal;
