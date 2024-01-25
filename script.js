const gameBoardElements = document.querySelectorAll('[data-cell]');
const endGame = document.querySelector('[data-end-game]');
const endGameMessage = document.querySelector('[data-end-game-message]')
const endGameBackGround = document.querySelector('[data-background-end-game]');
const restartButton = document.querySelector('[restart-button]');


let playerArray = [];
let computerArray = [];
let gameBoardArray = [0,1,2,3,4,5,6,7,8];

endGame.addEventListener('click', boardReset);

gameBoardElements.forEach(cell => {
    cell.addEventListener('click', playerTurn, { once: true});
})

const winingCombination = [
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function game() {
    if (boardEvaluation(playerArray)) {
        console.log('Player win');
        endModal('Player');
    } else if (draw()) {
        console.log('Draw');
        endModal('Draw');
    } else if (computerTurn()) {
        console.log('Computer wins');
        endModal('Computer');
    }
}

function playerTurn(e) {
    e.target.textContent = "X"
    let i = Number(e.target.id);
    playerArray.push(i);
    game();
}

function computerTurn(){
    let pickedCells = playerArray.concat(computerArray);
    let computerPossibleChoices = [0,1,2,3,4,5,6,7,8];
    pickedCells.sort(function(a, b){return a - b});
    gameBoardArray.forEach(option => {
        let i = 0;    
        while (i < pickedCells.length) {
            if (pickedCells[i] === option) {
                let index = computerPossibleChoices.indexOf(option);
                computerPossibleChoices.splice(index, 1)
                i++
            } else {
                i++
            }
        }
        return computerPossibleChoices; 
    })
    let computerChoice = computerPossibleChoices[Math.floor(Math.random() * computerPossibleChoices.length)];
    computerArray.push(computerChoice);
    let gameBoardQuery = document.getElementById(computerChoice);
    gameBoardQuery.textContent = "O";
    gameBoardQuery.removeEventListener('click',playerTurn);
    return boardEvaluation(computerArray)
}

function draw() {
    let pickedCells = playerArray.concat(computerArray);
    pickedCells.sort(function(a, b){return a - b});
    pickedCellsString = pickedCells.toString();
    gameBoardArrayString = gameBoardArray.toString();
    return pickedCellsString == gameBoardArrayString;
        
}

function boardEvaluation(array) {
    return winingCombination.some(combination => {
        return combination.every(element => array.includes(element))       
        })
}

function endModal(info) {
    endGame.classList.add('activate');
    endGameBackGround.classList.add('activate');
    if (info ===  'Draw') {
        endGameMessage.textContent = info
    } else {
        endGameMessage.textContent = info+' '+'Wins';
    }
}

function boardReset() {
    playerArray = []
    computerArray = []
    gameBoardElements.forEach(cell => cell.textContent = '')
    endGame.classList.remove('activate');
    endGameBackGround.classList.remove('activate');
    gameBoardElements.forEach(cell => {
        cell.addEventListener('click', playerTurn, { once: true});
    })
}
