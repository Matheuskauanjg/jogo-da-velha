const boardElement = document.getElementById('board');
const restartBtn = document.getElementById('restartBtn');
const difficultySelect = document.getElementById('difficulty');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let difficulty = 'easy';

difficultySelect.addEventListener('change', () => {
    difficulty = difficultySelect.value;
    resetBoard();
});

function createBoard() {
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        boardElement.appendChild(cell);
    }
}

function handleCellClick(index) {
    if (gameOver || board[index] !== '') return;

    board[index] = currentPlayer;
    renderBoard();

    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} venceu!`), 100);
        gameOver = true;
    } else if (board.every(cell => cell !== '')) {
        setTimeout(() => alert('Empate!'), 100);
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            setTimeout(() => aiMove(), 500);
        }
    }
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontais
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Verticais
        [0, 4, 8], [2, 4, 6]              // Diagonais
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function aiMove() {
    let bestMove;
    switch (difficulty) {
        case 'easy':
            bestMove = easyAi();
            break;
        case 'medium':
            bestMove = mediumAi();
            break;
        case 'hard':
            bestMove = hardAi();
            break;
    }
    board[bestMove] = 'O';
    renderBoard();

    if (checkWinner()) {
        setTimeout(() => alert('O venceu!'), 100);
        gameOver = true;
    } else if (board.every(cell => cell !== '')) {
        setTimeout(() => alert('Empate!'), 100);
        gameOver = true;
    } else {
        currentPlayer = 'X';
    }
}

function easyAi() {
    const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function mediumAi() {
    // Lógica básica de AI, pode priorizar bloquear ou atacar
    const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    return availableMoves[0]; // Lógica simplificada
}

function hardAi() {
    // Lógica mais avançada de AI (minimax ou outra técnica mais complexa)
    const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    return availableMoves[0]; // Lógica simplificada
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'X';
    renderBoard();
}

createBoard();
restartBtn.addEventListener('click', resetBoard);
