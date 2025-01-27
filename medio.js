function hardAI() {
    return minimax(board, 'O').index;
}

function minimax(board, player) {
    const opponent = player === 'O' ? 'X' : 'O';
    const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    
    if (checkWinner()) return { score: -10 };
    if (board.every(cell => cell !== '')) return { score: 0 };

    let bestMove = { score: -Infinity };
    for (let move of availableMoves) {
        const newBoard = board.slice();
        newBoard[move] = player;
        const score = minimax(newBoard, opponent).score;
        
        if (score > bestMove.score) {
            bestMove = { score, index: move };
        }
    }

    return bestMove;
}
