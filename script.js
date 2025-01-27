let playerScore = 0;
let aiScore = 0;
let board = ['', '', '', '', '', '', '', '', '']; // Estado inicial do tabuleiro
let currentPlayer = 'X'; // Jogador começa com X
let gameOver = false;

const cells = document.querySelectorAll('#board div');
const playerScoreElem = document.getElementById('player-score');
const aiScoreElem = document.getElementById('ai-score');
const restartBtn = document.getElementById('restart-btn');

// Inicializar o tabuleiro
function initBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach((cell, index) => {
        cell.textContent = '';
        cell.addEventListener('click', () => makeMove(index), { once: true });
    });
}

function makeMove(index) {
    if (gameOver || board[index] !== '') return;

    // Jogada do jogador
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWinner(board)) {
        setTimeout(() => {
            playerScore++;
            updateScore();
            alert("Você venceu!");
            gameOver = true;
        }, 100);
        return;
    }

    // Alterna para a vez da IA
    currentPlayer = 'O';
    aiMove();
}

function aiMove() {
    const aiMoveIndex = hardAI(); // Função que escolhe a jogada da IA (usando minimax)
    board[aiMoveIndex] = currentPlayer;
    cells[aiMoveIndex].textContent = currentPlayer;

    if (checkWinner(board)) {
        setTimeout(() => {
            aiScore++;
            updateScore();
            alert("A IA venceu!");
            gameOver = true;
        }, 100);
        return;
    }

    currentPlayer = 'X';
}

// Verifica o vencedor
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

// Atualiza o score
function updateScore() {
    playerScoreElem.textContent = playerScore;
    aiScoreElem.textContent = aiScore;
}

// Função para reiniciar para a próxima partida
restartBtn.addEventListener('click', () => {
    if (!gameOver) return;
    initBoard();
});

// Iniciar o jogo
initBoard();
