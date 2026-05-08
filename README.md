# Binokel-Rechner

Ein einfacher Rechner fuer Binokel mit 3 Spielern.

## Status

Alpha. Die React-App kann Rundenpunkte erfassen, Gesamtpunkte addieren und die Rundhistorie anzeigen. Die vollstaendige Binokel-Regellogik aus der aelteren statischen Version ist noch nicht komplett in React migriert.

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
