import "./renderingModule.css";
// import { humanPlayer, computerPlayer } from "./gameLoop";

const gameBoards = document.querySelectorAll(".game-board");

gameBoards.forEach((gameBoard) => {
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coor = `(${i}, ${j})`;
      gameBoard.appendChild(cell);
    }
  }
});
