let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';  // O jogador começa com 'X'
let playerScore = 0;
let aiScore = 0;
let currentDifficulty = 'easy';  // Dificuldade inicial

function setDifficulty(difficulty) {
    currentDifficulty = difficulty;
}

function startNewGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    updateBoard();
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function makeMove(index) {
    if (board[index] !== '' || !isGameActive()) return;

    board[index] = currentPlayer;
    updateBoard();

    if (checkWinner(board)) {
        if (currentPlayer === 'X') {
            playerScore++;
            alert('Você venceu!');
        } else {
            aiScore++;
            alert('A máquina venceu!');
        }
        updateScores();
        startNewGame();
        return;
    }

    if (board.every(cell => cell !== '')) {
        alert('Empate!');
        startNewGame();
        return;
    }

    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';

    if (currentPlayer === 'O') {
        setTimeout(() => aiMove(), 500);  // A IA joga após meio segundo
    }
}

function isGameActive() {
    return board.some(cell => cell === '');
}

function checkWinner(board) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontais
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Verticais
        [0, 4, 8], [2, 4, 6]              // Diagonais
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function updateScores() {
    document.getElementById('player-sco
