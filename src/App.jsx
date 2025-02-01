import React, { useContext } from 'react';
import { GameProvider } from './context/GameContext';
import PlayerScore from './components/PlayerScore';
import InputSection from './components/InputSection';
import HistoryModal from './components/HistoryModal';

const App = () => {
  return (
    <GameProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Binokel Rechner</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PlayerScore playerId="player1" playerName="Spieler 1" color="bg-blue-100" />
          <PlayerScore playerId="player2" playerName="Spieler 2" color="bg-green-100" />
          <PlayerScore playerId="player3" playerName="Spieler 3" color="bg-yellow-100" />
        </div>
        <InputSection />
        <HistoryModal />
      </div>
    </GameProvider>
  );
};

export default App;