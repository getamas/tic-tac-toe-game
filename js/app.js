
let gameboardDOM = document.getElementById('game-board');

let gameboard = [' ' , ' ' , ' ' , ' ' , ' ' , ' ' , ' ' , ' ' , ' ' ]


function Player(name, mark, spotsPlayed) {
    this.name = name;
    this.mark = mark;
    this.spotsPlayed = spotsPlayed;
}


let player1 = new Player('Player 1', 'x', []);
let player2 = new Player('Player 2', 'o', []);


function render() {
    for (var i = 0; i < gameboard.length; i++) {
        let markSpace = document.createElement('div');
        markSpace.className = 'mark';
        markSpace.dataset.id = i;
        markSpace.textContent = gameboard[i];
        
        let placeholderElem = document.createElement('span');
        placeholderElem.className = 'hidden';
        placeholderElem.textContent = 'Hidden';
        markSpace.appendChild(placeholderElem);

        gameboardDOM.appendChild(markSpace);
    }
}


render();


let currentPlayer = player1;
let gameFinished = false;

const setPlayer = function() {
    return currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
}

function addMarker(event) {
    if (event.target.className === 'mark') {

        var markDOM = event.target;
        var id = parseInt(markDOM.dataset.id);

        gameboard.forEach((curr, index) => {
            if (index ===  id) {

                // Check if the spot is empty if it is place the marker
                if (gameboard[index] === ' ') {

                    // Set current player
                    setPlayer();

                    // Place the current players mark in the data structure
                    gameboard[index] = currentPlayer.mark;

                    // Store the current players spot played
                    currentPlayer.spotsPlayed.push(id);

                    // Place the current players mark in the UI
                    markDOM.textContent = currentPlayer.mark;

                    // Check for a winning combination
                    checkForWinner();

                    // Check for a tie
                    if (!gameFinished && !gameboard.includes(' ')) {
                        console.log('Its a Tie!');
                    }
                }
            }
        });
    }
}

gameboardDOM.addEventListener('click', () => {
    addMarker(event);
});

const checkForWinner = function() {
    let winningCombinations = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];

    for (let i = 0; i < winningCombinations.length; i++) {
        if (winningCombinations[i].every(elem => currentPlayer.spotsPlayed.indexOf(elem) > -1)) {
            console.log(currentPlayer.name + ' ' + 'WON!');
            gameFinished = true;
        }
    }
}

