let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function startGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  updateBoard();
  document.getElementById("status").textContent = `Vez de: ${currentPlayer}`;
}

function updateBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
    cell.onclick = () => handleMove(index);
  });
}

function handleMove(index) {
  if (!gameActive || board[index] !== "") return;
  board[index] = currentPlayer;
  updateBoard();
  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById("status").textContent = `Vez de: ${currentPlayer}`;
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // linhas
    [0,3,6],[1,4,7],[2,5,8], // colunas
    [0,4,8],[2,4,6]          // diagonais
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      document.getElementById("status").textContent = `Vitória de ${board[a]}!`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    document.getElementById("status").textContent = "Empate!";
    gameActive = false;
  }
}

startGame();
