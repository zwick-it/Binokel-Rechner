import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const InputSection = () => {
  const { updateScores } = useContext(GameContext);

  const handleCalculate = () => {
    // Hier später die Logik für die Berechnung einfügen
    console.log('Berechne Punkte...');
  };

  return (
    <div className="mt-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={handleCalculate}
      >
        Berechnen
      </button>
    </div>
  );
};

export default InputSection;
