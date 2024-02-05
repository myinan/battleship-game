import "./renderGameLoop.css";
import { events } from "../helpers/events";
import "./gameLoop";
import "./renderWelcome";

// Get a reference for all(3) gameboards, also
// seperate references for computerBoard and humanBoard
const gameBoards = document.querySelectorAll(".game-board");
const computerBoard = document.querySelector(
  "#computer-player-container .game-board",
);
const humanBoard = document.querySelector(
  "#human-player-container .game-board",
);

// Render 10x10 "gameboards"
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

// Emits both coordinate and event data on human click on computerBoard
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

// Helper function for cell rendering
function renderCell(cellValue, target) {
  const targetCell = target;

  // if (cellValue === "X") { Do nothing }

  if (cellValue === "0") {
    targetCell.style.backgroundColor = "blue";
    targetCell.innerText = "X";
  }

  // This means a ship got hit
  if (cellValue !== "X" && cellValue !== "0") {
    targetCell.style.backgroundColor = "red";
    targetCell.innerText = "X";
  }
}

function renderAfterHumanPlay(data) {
  const { event, cellValue, areAllShipsSunk } = data;
  renderCell(cellValue, event.target);
  events.emit("areAllShipsSunk", { humanWon: areAllShipsSunk });
}

function renderAfterComputerPlay(data) {
  const { compAttackData, areAllShipsSunk } = data;
  if (compAttackData) {
    const { hitCoor, cellValue } = compAttackData;
    const cellToRenderOn = humanBoard.querySelector(
      `div[data-coor='${Object.values(hitCoor).join("")}']`,
    );

    renderCell(cellValue, cellToRenderOn);
    events.emit("areAllShipsSunk", { computerWon: areAllShipsSunk });
  }
}

function announceWinner(data) {
  const winAnnWrapper = document.querySelector(".winner-announcer-wrapper");
  const paraf = document.querySelector(".winner-announcer-wrapper p");
  const restartBtn = document.querySelector(".winner-announcer-wrapper button");

  if (data.humanWon === true || data.computerWon === true) {
    winAnnWrapper.classList.remove("hidden");
    restartBtn.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.reload();
    });
  }
  if (data.humanWon) {
    paraf.textContent = "You have won!";
  }

  if (data.computerWon) {
    paraf.textContent = "Computer wins!";
  }
}

// Emit attack coordinates when human clicks on a cell on Computer's "board"
computerBoard.addEventListener("click", emitHumanAttackCoor);

// Render accordingly after human play
events.on("humanAttacked", renderAfterHumanPlay);

// Render accordingly after computer play
events.on("computerAttacked", renderAfterComputerPlay);

// Check if any of the players all ships have been sunk
// if true, render winner
events.on("areAllShipsSunk", announceWinner);
