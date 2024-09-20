const winningTactics = [
  ["c1", "c2", "c3", "c4"],
  ["c5", "c5", "c7", "c8"],
  ["c9", "c10", "c11", "c12"],
  ["c13", "c14", "c15", "c16"],

  ["c1", "c5", "c9", "c13"],
  ["c2", "c5", "c10", "c14"],
  ["c3", "c7", "c11", "c15"],
  ["c4", "c8", "c12", "c16"],

  ["c1", "c6", "c11", "c16"],
  ["c4", "c7", "c10", "c13"],
];

let board = {
  c1: "",
  c2: "",
  c3: "",
  c4: "",
  c5: "",
  c6: "",
  c7: "",
  c8: "",
  c9: "",
  c10: "",
  c11: "",
  c12: "",
  c13: "",
  c14: "",
  c15: "",
  c16: "",
};

let currentPlayer = "X";

function selectCell() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick);
  });
}

function handleClick(event) {
  const cellElement = event.currentTarget;
  const cellId = cellElement.id;

  if (cellElement.textContent === "") {
    cellElement.textContent = currentPlayer;
    board[cellId] = currentPlayer;
  }

  const winner = checkWinner(board, winningTactics);
  const gameStatus = document.querySelector("#gameEndMessage");

  if (winner) {
    const { playerSymbol, winningCombination } = winner;
    gameStatus.textContent = `${playerSymbol} is won!`;

    highlightWinningCells(winningCombination);
  } else if (checkDraw(board)) {
    gameStatus.textContent = "Draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner(boardState, winningTactics) {
  for (let combination of winningTactics) {
    const [cell1, cell2, cell3, cell4] = combination;
    const playerSymbol = boardState[cell1];

    if (
      playerSymbol !== "" &&
      boardState[cell2] === playerSymbol &&
      boardState[cell3] === playerSymbol &&
      boardState[cell4] === playerSymbol
    ) {
      return {
        playerSymbol,
        winningCombination: combination,
      };
    }
  }

  return null;
}

const restartButton = document.querySelector("#restart");

restartButton.addEventListener("click", resetGame);

function resetGame() {
  const cells = document.querySelectorAll(".cell");
  const gameStatus = document.querySelector("#gameEndMessage");

  for (let cell in board) {
    board[cell] = "";
  }

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("highlight");
    cell.classList.remove("disableClick");
  });

  gameStatus.textContent = "";
}

function checkDraw(board) {
  return Object.values(board).every((cell) => cell !== "");
}

function highlightWinningCells(winningCombination) {
  winningCombination.forEach((cellId) => {
    const cellElement = document.getElementById(cellId);
    cellElement.classList.add("highlight");
    disableCells();
  });
}

function disableCells() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.classList.add("disableClick");
  });
}

function startGame() {
  selectCell();
}

startGame();
