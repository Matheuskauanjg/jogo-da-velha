const boardElement = document.getElementById('board');
const restartBtn = document.getElementById('restartBtn');
const difficultySelect = document.getElementById('difficulty');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; // X é o jogador
let gameOver = false;
let difficulty = 'easy';

difficultySelect.addEventListener('change', () => {
    difficulty = difficultySelect.value;
    resetBoard();
    loadAI(); // Atualiza a IA com a dificuldade selecionada
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
    if (gameOver || board[index] !== '' || currentPlayer === 'O') return; // O computador não pode jogar durante a vez do jogador

    board[index] = currentPlayer;
    renderBoard();

    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} venceu!`), 100);
        gameOver = true;
    } else if (board.every(cell => cell !== '')) {
        setTimeout(() => alert('Empate!'), 100);
        gameOver = true;
    } else {
        currentPlayer = 'O';
        setTimeout(() => aiMove(), 500);  // A IA joga após 0.5 segundos
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
            bestMove = easyAI();
            break;
        case 'medium':
            bestMove = mediumAI();
            break;
        case 'hard':
            bestMove = hardAI();
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

function loadAI() {
    // Carregar o script de dificuldade
    const script = document.createElement('script');
    script.src = `${difficulty}.js`;
    document.head.appendChild(script);
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'X';
    renderBoard();
}

createBoard();
restartBtn.addEventListener('click', resetBoard);
