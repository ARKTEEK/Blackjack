var dealerCardsSum = 0;
var playerCardsSum = 0;

var hiddenCard;
var deck;

var stayed = false;

window.onload = function() {
    createDeck();
    shuffleDeck();
    drawCards();
}

function createDeck() {
    let cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let cardTypes = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < cardTypes.length; i++) {
        for (let j = 0; j < cardValues.length; j++) {
            deck.push(cardValues[j] + "-" + cardTypes[i]);
        }
    }
}

function shuffleDeck() {

    let currentIndex = deck.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];

    }
    
}

function drawCards() {
    hiddenCard = deck.pop();
    dealerCardsSum += getCardValue(hiddenCard);
    
    while (dealerCardsSum < 17) {
        let cardImage = document.createElement("img");
        let card = deck.pop();
        cardImage.src = "./cards/" + card + ".png";
        dealerCardsSum += getCardValue(card);
        document.getElementById("dealer-cards").append(cardImage);
    }

    for (let i = 0; i < 2; i++) {
        let cardImage = document.createElement("img");
        let card = deck.pop();
        cardImage.src = "./cards/" + card + ".png";
        playerCardsSum += getCardValue(card);
        document.getElementById("player-cards").append(cardImage);
    }

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}

function stay() {
    document.getElementById("hidden_card").src = "./cards/" + hiddenCard + ".png";
    stayed = true;
    checkGame();
}

function restart() {
    window.location.reload();
}

function checkGame() {

    let gameResult = "";
    
    if (playerCardsSum > 21) {
        gameResult = "LOSE!";
    } else if (dealerCardsSum > 21) {
        gameResult = "WIN!";
    } else if (playerCardsSum > dealerCardsSum) {
        gameResult = "WIN!";
    } else if (playerCardsSum < dealerCardsSum) {
        gameResult = "LOSE!";
    } else if (playerCardsSum == dealerCardsSum) {
        gameResult = "TIE!";
    }

    document.getElementById("result").innerText = gameResult;
    setTimeout(function() { alertClick(gameResult) }, 500);
}

function alertClick(gameResult) {
    var alertButton = confirm("YOU " + gameResult + "\nPlay again?");
    if (alertButton == true) {
        restart();
    }
}

function hit() {

    if (stayed) return;

    if (canHit()) {
        stay();
        return;
    }

    let cardImage = document.createElement("img");
    let card = deck.pop();
    
    cardImage.src = "./cards/" + card + ".png";
    playerCardsSum += getCardValue(card);
    document.getElementById("player-cards").append(cardImage);
}

function getCardValue(card) {
    let cardValue = card.split("-");
    let value = cardValue[0];

    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }

    return parseInt(cardValue);
}

function canHit() {
    return playerCardsSum > 21;
}