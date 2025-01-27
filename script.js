let board = ['', '', '', '', '', '', '', '', '']; // Representa o tabuleiro
let currentPlayer = 'X'; // Jogador começa com X
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('reset');

// Função para inicializar o jogo
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDiv.textContent = 'Jogador X, é sua vez!';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('won');
    });
}

// Função para verificar se alguém ganhou
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].classList.add('won');
            cells[b].classList.add('won');
            cells[c].classList.add('won');
            gameActive = false;
            statusDiv.textContent = `${currentPlayer} ganhou!`;
            return true;
        }
    }
    if (board.every(cell => cell !== '')) {
        gameActive = false;
        statusDiv.textContent = 'Empate!';
    }
    return false;
}

// Função para jogar
function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (!checkWinner()) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDiv.textContent = `Jogador ${currentPlayer}, é sua vez!`;
        if (currentPlayer === 'O') {
            aiMove(); // IA joga após o jogador
        }
    }
}

// Função para a IA jogar (simples)
function aiMove() {
    if (!gameActive) return;
    let emptyCells = [];
    board.forEach((cell, index) => {
        if (cell === '') emptyCells.push(index);
    });
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    checkWinner();
    currentPlayer = 'X'; // Volta para o jogador X
    statusDiv.textContent = 'Jogador X, é sua vez!';
}

// Função para reiniciar a partida
resetButton.addEventListener('click', resetGame);

// Configura o evento de clique nas células
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
