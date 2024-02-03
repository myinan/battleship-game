import "./renderingModule.css";
import { events } from "../helpers/events";
import "./gameLoop";

// Get references for both gameboards
const gameBoards = document.querySelectorAll(".game-board");
const computerBoard = document.querySelector(
  "#computer-player-container .game-board",
);
const humanBoard = document.querySelector(
  "#human-player-container .game-board",
);

// Render 10x10 "gameboards" for both the human and the computer
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

// Emits both coordinate and event data on human click
let canRegisterClick = true;
function emitHumanAttackCoor(e) {
  if (canRegisterClick) {
    const coor = e.target.getAttribute("data-coor").split("");
    events.emit("humanClicked", { coor, eventData: e });

    // Disable further click registration for 150 milisecond
    canRegisterClick = false;
    setTimeout(() => {
      canRegisterClick = true;
    }, 150);
  }
}

function renderAfterHumanPlay(data) {
  const { event, cellValue, areAllShipsSunk } = data;
  if (cellValue === "0") {
    event.target.style.backgroundColor = "blue";
    event.target.innerText = "X";
  }
}

function renderAfterComputerPlay(data) {
  const { compAttackData, areAllShipsSunk } = data;
  if (compAttackData) {
    const { hitCoor, cellValue } = compAttackData;
    const cellToRenderOn = humanBoard.querySelector(
      `div[data-coor='${Object.values(hitCoor).join("")}']`,
    );
    if (cellValue === "0") {
      cellToRenderOn.style.backgroundColor = "blue";
      cellToRenderOn.innerText = "X";
    }
  }
}

// Emit attack coordinates when human clicks on a cell on Computer's "board"
computerBoard.addEventListener("click", emitHumanAttackCoor);

// Render accordingly after human play
events.on("humanAttacked", renderAfterHumanPlay);

// Render accordingly after computer play
events.on("computerAttacked", renderAfterComputerPlay);

// User clicks on a block on computer's board +
// emit coor +
// play the game and emit the cell value +
// do rendering according to cell value +
// now computer plays ++
// do rendering according to computer's play ++
// now let player make another move on computer's board ++
// repeat until one of the players loses all of their ships (--
