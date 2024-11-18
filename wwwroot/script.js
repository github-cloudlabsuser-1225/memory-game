window.onload = function () {
    const gameBoard = document.getElementById('game-board');
    const winMessage = document.createElement('div');
    winMessage.id = 'win-message';
    winMessage.innerText = 'You Win!';
    document.body.appendChild(winMessage);
    const cards = [];

    fetch('https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/all.json')
        .then(response => response.json())
        .then(symbols => {
            /* JavaScript code snippet that loops through the first 8 elements of the symbols array, and for each symbol, 
            adds two cards to the cards array using the createCard(symbol) function (Objective 1) */
            for (let i = 0; i < 8; i++) {
                const symbol = symbols[i];
                cards.push(createCard(symbol));
                cards.push(createCard(symbol));
            }
            shuffle(cards);
            cards.forEach(card => {
                gameBoard.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    function createCard(symbol) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol.name;

        const img = document.createElement('img');
        img.src = symbol.image;
        img.classList.add('card-image');
        card.appendChild(img);

        card.addEventListener('click', flipCard);

        return card;
    }

    function shuffle(array) {
        // Shuffle the array using the Fisher-Yates algorithm (Objective 2)
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    let flippedCards = [];
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
    
        // Check if the two flipped cards have the same symbol (Objective 3)
        if (card1.dataset.symbol === card2.dataset.symbol) {
            card1.classList.add('matched');
            card2.classList.add('matched');
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
    
        flippedCards = [];
        checkWin();
    }

    function checkWin() {
        // Check if all cards are matched (Objective 4)
        const allCards = document.querySelectorAll('.card');
        const matchedCards = document.querySelectorAll('.card.matched');
    
        if (allCards.length === matchedCards.length) {
            document.getElementById('win-message').style.display = 'block';
        }
    }
};
