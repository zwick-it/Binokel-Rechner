// Initialisierung der Spielerpunkte und Historie
let player1Score = 0;
let player2Score = 0;
let player3Score = 0;
let history = [];

// Spielerstände aktualisieren
function updateScores() {
    document.getElementById('player1Score').innerText = player1Score;
    document.getElementById('player2Score').innerText = player2Score;
    document.getElementById('player3Score').innerText = player3Score;
}

// Eingabefelder leeren
function clearInputs() {
    document.getElementById('player1Bid').value = '';
    document.getElementById('player2Bid').value = '';
    document.getElementById('player3Bid').value = '';
    document.getElementById('player1Meld').value = '';
    document.getElementById('player2Meld').value = '';
    document.getElementById('player3Meld').value = '';
    document.getElementById('player1Tricks').value = ''; // Leer statt 0
    document.getElementById('player2Tricks').value = ''; // Leer statt 0
    document.getElementById('player3Tricks').value = ''; // Leer statt 0
    document.getElementById('remainingTricks').value = '';
    document.getElementById('pointsToReach').value = '';
}

// Neues Spiel starten
function resetGame() {
    player1Score = 0;
    player2Score = 0;
    player3Score = 0;
    history = [];
    updateScores();
    document.getElementById('resultMessage').innerText = '';
    clearInputs();
}

// Stiche auf Zehner runden
function roundTricks(tricks) {
    return Math.round(tricks / 10) * 10;
}

// Restwert und zu stechende Punkte berechnen
function calculateRemainingAndPointsToReach() {
    const player1Tricks = parseInt(document.getElementById('player1Tricks').value) || 0;
    const player2Tricks = parseInt(document.getElementById('player2Tricks').value) || 0;
    const player3Tricks = parseInt(document.getElementById('player3Tricks').value) || 0;

    const player1Bid = parseInt(document.getElementById('player1Bid').value) || 0;
    const player2Bid = parseInt(document.getElementById('player2Bid').value) || 0;
    const player3Bid = parseInt(document.getElementById('player3Bid').value) || 0;

    const player1Meld = parseInt(document.getElementById('player1Meld').value) || 0;
    const player2Meld = parseInt(document.getElementById('player2Meld').value) || 0;
    const player3Meld = parseInt(document.getElementById('player3Meld').value) || 0;

    // Berechne die Summe der Stiche
    const sumTricks = player1Tricks + player2Tricks + player3Tricks;

    // Berechne den Restwert (250 - Summe der Stiche)
    const remainingTricks = 250 - sumTricks;
    document.getElementById('remainingTricks').value = remainingTricks;


    // Finde den höchsten Reizwert
    const bids = [player1Bid, player2Bid, player3Bid];
    const highestBid = Math.max(...bids);
    const highestBidder = bids.indexOf(highestBid);

    // Berechne die zu stechenden Punkte (Reizwert - Meldung des höchsten Bieters)
    let pointsToReach = 0;
    if (highestBidder !== -1) {
        const melds = [player1Meld, player2Meld, player3Meld];
        pointsToReach = highestBid - melds[highestBidder];
    }
    document.getElementById('pointsToReach').value = pointsToReach;
}

// Punkte berechnen
function calculateScores() {
    // Werte aus den Eingabefeldern holen
    const player1Tricks = parseInt(document.getElementById('player1Tricks').value) || 0;
    const player2Tricks = parseInt(document.getElementById('player2Tricks').value) || 0;
    const player3Tricks = parseInt(document.getElementById('player3Tricks').value) || 0;

    const player1Bid = parseInt(document.getElementById('player1Bid').value) || 0;
    const player2Bid = parseInt(document.getElementById('player2Bid').value) || 0;
    const player3Bid = parseInt(document.getElementById('player3Bid').value) || 0;

    const player1Meld = parseInt(document.getElementById('player1Meld').value) || 0;
    const player2Meld = parseInt(document.getElementById('player2Meld').value) || 0;
    const player3Meld = parseInt(document.getElementById('player3Meld').value) || 0;

    const bids = [player1Bid, player2Bid, player3Bid];
    const tricks = [player1Tricks, player2Tricks, player3Tricks];
    const melds = [player1Meld, player2Meld, player3Meld];

    const highestBid = Math.max(...bids);
    const highestBidder = bids.indexOf(highestBid);

    let roundResults = [0, 0, 0];

    for (let i = 0; i < 3; i++) {
        if (tricks[i] > 0) {
            if (i === highestBidder) {
                const totalSum = melds[i] + tricks[i];
                if (totalSum >= highestBid) {
                    const roundedTricks = roundTricks(tricks[i]);
                    roundResults[i] = melds[i] + roundedTricks;
                } else {
                    roundResults[i] = -2 * highestBid;
                }
            } else {
                const roundedTricks = roundTricks(tricks[i]);
                roundResults[i] = melds[i] + roundedTricks;
            }
        } else {
            if (i === highestBidder) {
                roundResults[i] = -2 * highestBid;
            } else {
                roundResults[i] = 0;
            }
        }
    }

    // Punkte aktualisieren
    player1Score += roundResults[0];
    player2Score += roundResults[1];
    player3Score += roundResults[2];

    // Historie aktualisieren
    history.push({
        player1: player1Score,
        player2: player2Score,
        player3: player3Score,
        highestBid: highestBid
    });

    // Ergebnisse anzeigen
    updateScores();
    document.getElementById('resultMessage').innerText = `Rundenergebnisse:
        ${document.getElementById('player1Name').value || 'Spieler 1'}: ${roundResults[0]}
        ${document.getElementById('player2Name').value || 'Spieler 2'}: ${roundResults[1]}
        ${document.getElementById('player3Name').value || 'Spieler 3'}: ${roundResults[2]}`;

    clearInputs();
}

// Historie anzeigen
function showHistory() {
    const historyTableBody = document.getElementById('historyTableBody');
    historyTableBody.innerHTML = ''; // Tabelle leeren

    // Historie-Daten in die Tabelle einfügen
    history.forEach(entry => {
        const row = document.createElement('tr');

        // Spieler 1
        const player1Cell = document.createElement('td');
        player1Cell.innerText = entry.player1;
        row.appendChild(player1Cell);

        // Spieler 2
        const player2Cell = document.createElement('td');
        player2Cell.innerText = entry.player2;
        row.appendChild(player2Cell);

        // Spieler 3
        const player3Cell = document.createElement('td');
        player3Cell.innerText = entry.player3;
        row.appendChild(player3Cell);

        // Reizwert
        const bidCell = document.createElement('td');
        bidCell.innerText = entry.highestBid;
        row.appendChild(bidCell);

        // Zeile zur Tabelle hinzufügen
        historyTableBody.appendChild(row);
    });

    // Modal anzeigen
    const historyModal = new bootstrap.Modal(document.getElementById('historyModal'));
    historyModal.show();
}

// Ergebnisse bearbeiten
function editScores() {
    // Aktuelle Punktestände in die Eingabefelder laden
    document.getElementById('editPlayer1').value = player1Score;
    document.getElementById('editPlayer2').value = player2Score;
    document.getElementById('editPlayer3').value = player3Score;

    // Modal anzeigen
    const editScoresModal = new bootstrap.Modal(document.getElementById('editScoresModal'));
    editScoresModal.show();
}

// Bearbeitete Ergebnisse speichern
function saveScores() {
    player1Score = parseInt(document.getElementById('editPlayer1').value) || 0;
    player2Score = parseInt(document.getElementById('editPlayer2').value) || 0;
    player3Score = parseInt(document.getElementById('editPlayer3').value) || 0;
    updateScores();

    // Modal schließen
    const editScoresModal = bootstrap.Modal.getInstance(document.getElementById('editScoresModal'));
    editScoresModal.hide();
}

// Event-Listener für die Stiche-Eingabefelder
document.getElementById('player1Tricks').addEventListener('input', calculateRemainingAndPointsToReach);
document.getElementById('player2Tricks').addEventListener('input', calculateRemainingAndPointsToReach);
document.getElementById('player3Tricks').addEventListener('input', calculateRemainingAndPointsToReach);

// Event-Listener für die Reizwert- und Meldungsfelder
document.getElementById('player1Bid').addEventListener('input', calculateRemainingAndPointsToReach);
document.getElementById('player2Bid').addEventListener('input', calculateRemainingAndPointsToReach);
document.getElementById('player3Bid').addEventListener('input', calculateRemainingAndPointsToReach);
document.getElementById('player1Meld').addEventListener('input', calculateRemainingAndPointsToReach);
document.getElementById('player2Meld').addEventListener('input', calculateRemainingAndPointsToReach);
document.getElementById('player3Meld').addEventListener('input', calculateRemainingAndPointsToReach);

// Event-Listener für Buttons
document.querySelector('button[onclick="resetGame()"]').addEventListener('click', resetGame);
document.querySelector('button[onclick="calculateScores()"]').addEventListener('click', calculateScores);
document.querySelector('button[onclick="showHistory()"]').addEventListener('click', showHistory);
document.querySelector('button[onclick="editScores()"]').addEventListener('click', editScores);
