const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'A', 'B', 'C', 'D', 'E', 'F'];
let shuffledCards = [];
let flippedCards = [];
let matchedCards = [];

document.addEventListener('DOMContentLoaded', () => {
    shuffledCards = shuffleCards(cardValues);
    createCards(shuffledCards);
});

function shuffleCards(cards) {
    return cards.sort(() => Math.random() - 0.5);
}

function createCards(cards) {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    cards.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);
        card.setAttribute('data-index', index);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard(e) {
    const card = e.target;
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !matchedCards.includes(card)) {
        card.classList.add('flipped');
        card.innerText = card.getAttribute('data-value');
        flippedCards.push(card);
        
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    if (flippedCards[0].getAttribute('data-value') === flippedCards[1].getAttribute('data-value')) {
        matchedCards.push(...flippedCards);
        flippedCards = [];
    } else {
        setTimeout(() => {
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.innerText = '';
            });
            flippedCards = [];
        }, 1000);
    }
}

function resetGame() {
    flippedCards = [];
    matchedCards = [];
    shuffledCards = shuffleCards(cardValues);
    createCards(shuffledCards);
}