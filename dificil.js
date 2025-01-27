function hardAI() {
    return minimax(board, 'O', -Infinity, Infinity).index;
}

function minimax(board, player, alpha, beta) {
    const opponent = player === 'O' ? 'X' : 'O';
    const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    
    // Checa se o jogo terminou
    if (checkWinner(board)) return { score: player === 'O' ? 10 : -10 };
    if (board.every(cell => cell !== '')) return { score: 0 };

    let bestMove = { score: player === 'O' ? -Infinity : Infinity };

    for (let move of availableMoves) {
        const newBoard = board.slice();
        newBoard[move] = player;

        const score = minimax(newBoard, opponent, alpha, beta).score;

        if (player === 'O') {
            // Maximiza o score para a IA
            if (score > bestMove.score) {
                bestMove = { score, index: move };
            }
            alpha = Math.max(alpha, score);
        } else {
            // Minimiza o score para o jogador
            if (score < bestMove.score) {
                bestMove = { score, index: move };
            }
            beta = Math.min(beta, score);
        }

        // Podar a árvore se o valor de alpha for maior que beta
        if (beta <= alpha) {
            break;
        }
    }

    return bestMove;
}

// Função para verificar o vencedor
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
