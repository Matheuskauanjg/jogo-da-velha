function easyAI() {
    const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}
