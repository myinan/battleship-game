import "./renderingModule.css";

const gameBoards = document.querySelectorAll(".game-board");
const computerBoard = document.querySelector(
  "#computer-player-container .game-board",
);

gameBoards.forEach((gameBoard) => {
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coor = `${i}${j}`;
      gameBoard.appendChild(cell);
    }
  }
});

computerBoard.addEventListener("click", ...);

// User clicks on a block on computer's board
// emit coor
// play the game and emit the cell value
// do rendering according to cell value
// now computer plays
// do rendering according to computer's play
// now let player make another move on computer's board
// repeat until one of the players loses all of their ships
