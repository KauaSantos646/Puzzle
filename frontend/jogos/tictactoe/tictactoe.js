const board = document.getElementById("board");
const message = document.getElementById("message");

let currentPlayer = "X";
let cells = [];

function createBoard() {
  board.innerHTML = "";
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => makeMove(i));
    board.appendChild(cell);
    cells.push("");
  }

  message.textContent = "Vez do jogador X";
}

function makeMove(index) {
  if (cells[index] !== "") return;

  const cell = board.children[index];
  cells[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWin(currentPlayer)) {
    message.textContent = `Jogador ${currentPlayer} venceu!`;
    disableBoard();

    setTimeout(() => {
      createBoard();
    }, 1000);
    return;
  }

  if (cells.every(c => c !== "")) {
    message.textContent = "Empate!";
    setTimeout(() => {
      createBoard();
    }, 2000);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Vez do jogador ${currentPlayer}`;
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => cells[index] === player)
  );
}

function disableBoard() {
  for (let i = 0; i < board.children.length; i++) {
    board.children[i].style.pointerEvents = "none";
  }
}

createBoard();
