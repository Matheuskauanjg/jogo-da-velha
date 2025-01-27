// Função de IA que usa o Minimax
function hardAI() {
    return minimax(board, 'O', -Infinity, Infinity).index;
}

function minimax(board, player, alpha, beta) {
    const opponent = player === 'O' ? 'X' : 'O';
    const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    
    if (checkWinner(board)) return { score: player === 'O' ? 10 : -10 };
    if (board.every(cell => cell !== '')) return { score: 0 };

    let bestMove = { score: player === 'O' ? -Infinity : Infinity };

    for (let move of availableMoves) {
        const newBoard = board.slice();
        newBoard[move] = player;

        const score = minimax(newBoard, opponent, alpha, beta).score;

        if (player === 'O') {
            if (score > bestMove.score) {
                bestMove = { score, index: move };
            }
            alpha = Math.max(alpha, score);
        } else {
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
