# Binokel-Rechner

Ein einfacher Rechner fuer Binokel mit 3 Spielern.

## Status

Alpha. Die React-App ersetzt einen einfachen Papier-Spielzettel fuer 3 Spieler: Namen, Reizwert, Meldung, Stichpunkte, Rundenergebnis, Gesamtpunkte und Historie werden im Browser gefuehrt.

Die aktuelle Rechenlogik nutzt diese Annahmen:

- 250 Stichpunkte pro Runde
- hoechster Reizwert bestimmt den spielenden Spieler
- Meldung plus Stichpunkte muss mindestens den Reizwert erreichen
- bei verlorenem Spiel zaehlt `-2 * Reizwert`
- Stichpunkte werden auf Zehner gerundet
- der Spielstand wird im Browser gespeichert

## Entwicklung

Abhaengigkeiten installieren:

```bash
npm install
```

Lokal starten:

```bash
npm start
```

Produktions-Build erzeugen:

```bash
npm run build
```

## Struktur

- `src/context/GameContext.js`: Gemeinsamer Spielzustand fuer Punkte und Historie.
- `src/components/PlayerScore.jsx`: Anzeige der Spielerpunkte.
- `src/components/InputSection.jsx`: Eingabe neuer Rundenpunkte.
- `src/components/HistoryModal.jsx`: Anzeige der Rundhistorie.
