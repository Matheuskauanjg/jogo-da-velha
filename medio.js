function mediumAI() {
    let availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);

    // A IA tenta bloquear o jogador, caso ele tenha 2 'X' em uma linha
    for (let move of availableMoves) {
        let newBoard = board.slice();
        newBoard[move] = 'O';
        if (checkWinner(newBoard)) {
            return move;
        }
    }

    // Se não puder bloquear, joga aleatoriamente
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}
