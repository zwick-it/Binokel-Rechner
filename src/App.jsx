import React from 'react';
import { GameProvider } from './context/GameContext';
import PlayerScore from './components/PlayerScore';
import InputSection from './components/InputSection';
import HistoryModal from './components/HistoryModal';

const App = () => {
  return (
    <GameProvider>
      <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-6xl p-4">
        <header className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Binokel Rechner</h1>
            <p className="text-sm text-slate-600">Digitaler Spielzettel fuer 3 Spieler</p>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PlayerScore playerId="player1" color="bg-sky-100 border-sky-300" />
          <PlayerScore playerId="player2" color="bg-emerald-100 border-emerald-300" />
          <PlayerScore playerId="player3" color="bg-amber-100 border-amber-300" />
        </div>
        <InputSection />
        <HistoryModal />
      </div>
      </main>
    </GameProvider>
  );
};

export default App;
