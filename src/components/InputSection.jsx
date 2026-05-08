import React, { useContext, useEffect, useState } from 'react';
import { GameContext, playerIds } from '../context/GameContext';

const emptyRound = {
  player1: { bid: '', meld: '', tricks: '' },
  player2: { bid: '', meld: '', tricks: '' },
  player3: { bid: '', meld: '', tricks: '' },
};

const toNumber = (value) => Number(value) || 0;

const roundTricks = (value) => Math.round(value / 10) * 10;

const InputSection = () => {
  const { addRound, playerNames, resetGame, scores, setManualScores, undoLastRound } = useContext(GameContext);
  const [roundValues, setRoundValues] = useState(emptyRound);
  const [manualScores, setManualScoresForm] = useState(scores);

  useEffect(() => {
    setManualScoresForm(scores);
  }, [scores]);

  const bids = playerIds.map((playerId) => toNumber(roundValues[playerId].bid));
  const melds = playerIds.map((playerId) => toNumber(roundValues[playerId].meld));
  const tricks = playerIds.map((playerId) => toNumber(roundValues[playerId].tricks));
  const highestBid = Math.max(...bids);
  const bidderIndex = bids.indexOf(highestBid);
  const bidderId = highestBid > 0 ? playerIds[bidderIndex] : null;
  const trickSum = tricks.reduce((sum, value) => sum + value, 0);
  const remainingTricks = 250 - trickSum;
  const pointsToReach = bidderId ? highestBid - melds[bidderIndex] : 0;

  const handleCalculate = () => {
    const results = playerIds.reduce((roundResults, playerId, index) => {
      const playerBid = bids[index];
      const playerMeld = melds[index];
      const playerTricks = tricks[index];
      const isBidder = playerId === bidderId;
      const totalForContract = playerMeld + playerTricks;

      if (isBidder && totalForContract < highestBid) {
        return {
          ...roundResults,
          [playerId]: -2 * highestBid,
        };
      }

      return {
        ...roundResults,
        [playerId]: playerTricks > 0 || playerMeld > 0
          ? playerMeld + roundTricks(playerTricks)
          : 0,
      };
    }, {});

    addRound({
      bids: {
        player1: bids[0],
        player2: bids[1],
        player3: bids[2],
      },
      melds: {
        player1: melds[0],
        player2: melds[1],
        player3: melds[2],
      },
      tricks: {
        player1: tricks[0],
        player2: tricks[1],
        player3: tricks[2],
      },
      bidderId,
      highestBid,
      remainingTricks,
      pointsToReach,
      results,
    });
    setRoundValues(emptyRound);
  };

  const handleChange = (playerId, field, value) => {
    setRoundValues((currentValues) => ({
      ...currentValues,
      [playerId]: {
        ...currentValues[playerId],
        [field]: value,
      },
    }));
  };

  return (
    <section className="mt-4 rounded bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold">Runde eintragen</h2>
        <div className="flex flex-wrap gap-2">
          <button className="rounded bg-slate-600 px-4 py-2 text-white" onClick={undoLastRound}>
            Letzte Runde zurueck
          </button>
          <button className="rounded bg-red-700 px-4 py-2 text-white" onClick={resetGame}>
            Neues Spiel
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b text-sm text-slate-600">
              <th className="py-2 pr-3">Spieler</th>
              <th className="py-2 pr-3">Reizwert</th>
              <th className="py-2 pr-3">Meldung</th>
              <th className="py-2 pr-3">Stiche</th>
              <th className="py-2 pr-3">Rundenergebnis</th>
            </tr>
          </thead>
          <tbody>
            {playerIds.map((playerId, index) => {
              const playerMeld = melds[index];
              const playerTricks = tricks[index];
              const isBidder = playerId === bidderId;
              const preview = isBidder && playerMeld + playerTricks < highestBid
                ? -2 * highestBid
                : playerMeld + roundTricks(playerTricks);

              return (
                <tr className="border-b" key={playerId}>
                  <td className="py-2 pr-3 font-medium">{playerNames[playerId]}</td>
                  {['bid', 'meld', 'tricks'].map((field) => (
                    <td className="py-2 pr-3" key={field}>
                      <input
                        className="w-full rounded border px-3 py-2"
                        inputMode="numeric"
                        type="text"
                        value={roundValues[playerId][field]}
                        onChange={(event) => handleChange(playerId, field, event.target.value)}
                      />
                    </td>
                  ))}
                  <td className="py-2 pr-3 font-semibold">
                    {preview}
                    {isBidder ? <span className="ml-2 rounded bg-slate-200 px-2 py-1 text-xs">spielt</span> : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded bg-slate-100 p-3">
          <span className="block text-sm text-slate-600">Restpunkte aus 250</span>
          <strong className="text-2xl">{remainingTricks}</strong>
        </div>
        <div className="rounded bg-slate-100 p-3">
          <span className="block text-sm text-slate-600">Zu stechen</span>
          <strong className="text-2xl">{pointsToReach}</strong>
        </div>
        <div className="rounded bg-slate-100 p-3">
          <span className="block text-sm text-slate-600">Spieler</span>
          <strong className="text-2xl">{bidderId ? playerNames[bidderId] : '-'}</strong>
        </div>
      </div>

      <button
        className="mt-4 rounded bg-blue-700 px-5 py-3 font-semibold text-white"
        onClick={handleCalculate}
      >
        Runde speichern
      </button>

      <div className="mt-6 border-t pt-4">
        <h3 className="mb-3 font-semibold">Korrektur aktueller Gesamtpunkte</h3>
        <div className="grid gap-3 md:grid-cols-3">
          {playerIds.map((playerId) => (
            <label key={playerId}>
              <span className="mb-1 block text-sm text-slate-600">{playerNames[playerId]}</span>
              <input
                className="w-full rounded border px-3 py-2"
                inputMode="numeric"
                type="text"
                value={manualScores[playerId]}
                onChange={(event) => setManualScoresForm({
                  ...manualScores,
                  [playerId]: Number(event.target.value) || 0,
                })}
              />
            </label>
          ))}
        </div>
        <button
          className="mt-3 rounded bg-slate-700 px-4 py-2 text-white"
          onClick={() => setManualScores(manualScores)}
        >
          Korrektur uebernehmen
        </button>
      </div>
    </section>
  );
};

export default InputSection;
