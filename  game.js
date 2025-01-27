import { saveGame, getAllGames } from './firebase.js';

let playerScore = 0;
let aiScore = 0;
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";  // Começa com o jogador
let gameOver = false;

const boardDiv = document.getElementById("board");
const newGameBtn = document.getElementById("new-game-btn");
const playerScoreElem = document.getElementById("player-score");
const aiScoreElem = document.getElementById("ai-score");

const initGame = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X"; // Jogador começa
  gameOver = false;
  renderBoard();
};

const renderBoard = () => {
  boardDiv.innerHTML = '';
  board.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", () => makeMove(index), { once: true });
    boardDiv.appendChild(cellDiv);
  });
};

const makeMove = (index) => {
  if (board[index] === "" && !gameOver) {
    board[index] = currentPlayer;
    renderBoard();
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (!gameOver && currentPlayer === "O") {
      aiMove();
    }
  }
};

const checkWinner = () => {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      if (board[a] === "X") {
        playerScore++;
      } else {
        aiScore++;
      }
      saveGame(playerScore, aiScore);
      alert(`${board[a]} venceu!`);
      playerScoreElem.innerText = `Jogador: ${playerScore}`;
      aiScoreElem.innerText = `Máquina: ${aiScore}`;
      return;
    }
  }

  if (!board.includes("")) {
    gameOver = true;
    alert("Empate!");
  }
};

const aiMove = () => {
  // Aqui você pode implementar uma lógica simples para o AI, ou algo mais complexo.
  // Neste exemplo, a AI faz a primeira jogada disponível.
  let availableMoves = board.map((val, index) => val === "" ? index : null).filter(val => val !== null);
  const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  board[move] = "O";
  renderBoard();
  checkWinner();
};

newGameBtn.addEventListener("click", initGame);

initGame();
