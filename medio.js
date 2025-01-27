function mediumAI() {
    const winningMove = findWinningMove('O');
    if (winningMove !== null) return winningMove;

    const blockMove = findWinningMove('X');
    if (blockMove !== null) return blockMove;

    const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function findWinningMove(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] === player && board[b] === player && board[c] === '') return c;
        if (board[b] === player && board[c] === player && board[a] === '') return a;
        if (board[a] === player && board[c] === player && board[b] === '') return b;
    }

    return null;
}
