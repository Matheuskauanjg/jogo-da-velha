let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';  // O jogador começa com 'X'
let playerScore = 0;
let aiScore = 0;
let currentDifficulty = 'easy';  // Dificuldade inicial

// Define a dificuldade escolhida pelo jogador
function setDifficulty(difficulty) {
    currentDifficulty = difficulty;
}

// Inicia um novo jogo (próxima partida)
function startNewGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';  // O jogador começa com 'X'
    updateBoard();
}

// Atualiza o tabuleiro na tela
function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

// Função que lida com os cliques no tabuleiro
function makeMove(index) {
    if (board[index] !== '' || !isGameActive()) return;

    // Marca a célula com o movimento do jogador
    board[index] = currentPlayer;
    updateBoard();

    // Verifica se o jogador venceu
    if (checkWinner(board)) {
        if (currentPlayer === 'X') {
            playerScore++;
            alert('Você venceu!');
        } else {
            aiScore++;
            alert('A máquina venceu!');
        }
        updateScores();
        startNewGame();  // Inicia uma nova partida
        return;
    }

    // Verifica se houve empate
    if (board.every(cell => cell !== '')) {
        alert('Empate!');
        startNewGame();  // Inicia uma nova partida
        return;
    }

    // Alterna para o outro jogador
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';

    // Se for a vez da IA, ela faz a jogada automaticamente
    if (currentPlayer === 'O') {
        setTimeout(() => aiMove(), 500);  // A IA joga após meio segundo
    }
}

// Verifica se o jogo está ativo
function isGameActive() {
    return board.some(cell => cell === '');
}

// Checa se há um vencedor
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

// Atualiza as pontuações na tela
function updateScores() {
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('ai-score').textContent = aiScore;
}

// A IA faz a jogada, dependendo da dificuldade
function aiMove() {
    let move;
    if (currentDifficulty === 'easy') {
        move = easyAI();
    } else if (currentDifficulty === 'medium') {
        move = mediumAI();
    } else {
        move = hardAI();
    }
    makeMove(move);
}
