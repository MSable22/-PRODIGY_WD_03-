const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

cells.forEach(cell => {
    cell.addEventListener('click', () => cellClick(cell.dataset.index));
});

function cellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        updateBoard();
        checkWinner();
        togglePlayer();
    }
}

function updateBoard() {
    cells.forEach((cell, index) => {
        cell.innerText = gameBoard[index];
    });
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            message.innerText = ${currentPlayer} wins!;
            gameActive = false;
            highlightWinnerCells(combo);
            break;
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        message.innerText = 'It\'s a tie!';
        gameActive = false;
    }
}

function highlightWinnerCells(cellsToHighlight) {
    cellsToHighlight.forEach(index => {
        cells[index].style.backgroundColor = '#4caf50';
        cells[index].style.color = '#fff';
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    message.innerText = '';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = '#fff';
        cell.style.color = '#000';
    });
}