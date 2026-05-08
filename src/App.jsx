import React from 'react';
import { GameProvider } from './context/GameContext';
import PlayerScore from './components/PlayerScore';
import InputSection from './components/InputSection';
import HistoryModal from './components/HistoryModal';

const App = () => {
  return (
    <GameProvider>
      <main className="min-h-screen bg-[#f4f1ea] text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:py-8">
        <header className="mb-5 flex flex-col gap-2 border-b border-slate-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
              Digitaler Spielzettel
            </p>
            <h1 className="text-4xl font-bold leading-tight">Binokel Rechner</h1>
            <p className="mt-1 text-sm text-slate-600">
              Reizen, melden, Stiche zaehlen und Spielstand sauber fortschreiben.
            </p>
          </div>
          <div className="rounded border border-slate-300 bg-white/70 px-4 py-3 text-sm text-slate-700 shadow-sm">
            3 Spieler · 250 Stichpunkte · Historie im Browser
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PlayerScore playerId="player1" color="from-sky-50 to-white border-sky-300" accent="bg-sky-600" />
          <PlayerScore playerId="player2" color="from-emerald-50 to-white border-emerald-300" accent="bg-emerald-700" />
          <PlayerScore playerId="player3" color="from-amber-50 to-white border-amber-300" accent="bg-amber-600" />
        </div>
        <InputSection />
        <HistoryModal />
      </div>
      </main>
    </GameProvider>
  );
};

export default App;
