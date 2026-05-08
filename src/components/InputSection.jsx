import React, { useContext, useState } from 'react';
import { GameContext } from '../context/GameContext';

const InputSection = () => {
  const { addRound, resetGame } = useContext(GameContext);
  const [roundScores, setRoundScores] = useState({
    player1: '',
    player2: '',
    player3: '',
  });

  const handleCalculate = () => {
    addRound({
      player1: Number(roundScores.player1) || 0,
      player2: Number(roundScores.player2) || 0,
      player3: Number(roundScores.player3) || 0,
    });
    setRoundScores({ player1: '', player2: '', player3: '' });
  };

  const handleChange = (playerId, value) => {
    setRoundScores((currentScores) => ({
      ...currentScores,
      [playerId]: value,
    }));
  };

  return (
    <div className="mt-4 bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-3">Runde eintragen</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {['player1', 'player2', 'player3'].map((playerId, index) => (
          <label className="block" key={playerId}>
            <span className="block text-sm font-medium mb-1">Spieler {index + 1}</span>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              placeholder="Punkte"
              value={roundScores[playerId]}
              onChange={(event) => handleChange(playerId, event.target.value)}
            />
          </label>
        ))}
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
        onClick={handleCalculate}
      >
        Berechnen
      </button>
      <button
        className="bg-gray-600 text-white px-4 py-2 rounded-lg"
        onClick={resetGame}
      >
        Neues Spiel
      </button>
    </div>
  );
};

export default InputSection;
