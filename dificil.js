function hardAI() {
    return minimax(board, 'O', -Infinity, Infinity).index;
}

// Algoritmo Minimax
function minimax(board, player, alpha, beta) {
    const opponent = player === 'O' ? 'X' : 'O';
    const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);

    // Se o jogo acabou, retorna o score
    if (checkWinner(board)) {
        return { score: player === 'O' ? 10 : -10 };  // 'O' é a IA, 'X' é o jogador
    }

    if (board.every(cell => cell !== '')) {
        return { score: 0 };  // Empate
    }

    let bestMove = { score: player === 'O' ? -Infinity : Infinity };

    for (let move of availableMoves) {
        const newBoard = board.slice();
        newBoard[move] = player;

        const score = minimax(newBoard, opponent, alpha, beta).score;

        if (player === 'O') {  // IA jogando 'O'
            if (score > bestMove.score) {
                bestMove = { score, index: move };
            }
            alpha = Math.max(alpha, score);
        } else {  // Jogador jogando 'X'
            if (score < bestMove.score) {
                bestMove = { score, index: move };
            }
            beta = Math.min(beta, score);
        }

        if (beta <= alpha) {
            break;
        }
    }

    return bestMove;
}
