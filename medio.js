function mediumAI() {
    let availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    // Aqui você pode adicionar um simples algoritmo que bloqueia o jogador de ganhar
    // ou faz movimentos inteligentes, como jogar no centro ou nos cantos.
    // Para manter simples, vamos jogar aleatoriamente, mas de forma um pouco mais estratégica.
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}
