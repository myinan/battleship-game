import { events } from "../helpers/events";
import "./renderWelcome.css";

const placeShipsBoard = document.querySelector(".ship-placer .game-board");
const paraf = document.querySelector(".ship-placer p i");

const placedShips = [];
const shipsNotYetPlaced = [
  { name: "carrier", length: 5 },
  { name: "battleship", length: 4 },
  { name: "destroyer", length: 3 },
  { name: "submarine", length: 3 },
  { name: "patrolBoat", length: 2 },
];

function announceCurShip() {
  if (shipsNotYetPlaced.length !== 0) {
    const capFirstLetter = shipsNotYetPlaced[0].name.charAt(0).toUpperCase();
    const capitalizedName = capFirstLetter.concat(
      "",
      shipsNotYetPlaced[0].name.slice(1),
    );
    paraf.textContent = `${capitalizedName}`;
  }
}

let prevDataCoor = null; // Initialize previous data-coor value
function addHoverEffect(e) {
  const curShipName = shipsNotYetPlaced[0].name;
  const event = e;
  const classListArr = Array.from(event.target.classList);

  if (classListArr.includes("cell")) {
    const currentDataCoor = event.target.dataset.coor;

    // Check if data-coor is different from the previous value
    if (currentDataCoor !== prevDataCoor) {
      // Add class "hovered" on hovered cell
      event.target.classList.add(`hovered-${curShipName}`);

      // If previous cell exists, remove the "hovered" class on it
      if (prevDataCoor !== null) {
        const prevCell = document.querySelector(
          `.ship-placer .game-board div[data-coor='${prevDataCoor}`,
        );

        prevCell.classList.remove(`hovered-${curShipName}`);
      }

      // Update the previous data-coor value
      prevDataCoor = currentDataCoor;
    }
  }
}

function clickToPlaceShip() {
  const curShipName = shipsNotYetPlaced[0].name;
  const cell = document.querySelector(
    `.ship-placer .game-board .hovered-${curShipName}`,
  );

  if (!cell) return;

  const data = {
    ship: shipsNotYetPlaced[0],
    coor: cell.getAttribute("data-coor").split(""),
  };

  events.emit("humanClickedToPlace", data);
}

// Helper function for renderResult()
function getReferencesToCells(firstCell, length) {
  const startCell = firstCell;
  let nextCells;

  // Ensure startCell is not null before proceeding
  if (startCell) {
    nextCells = [startCell]; // Include the starting cell

    // Loop to get the next cells
    for (let i = 0; i < length - 1; i += 1) {
      const nextCell = nextCells[nextCells.length - 1].nextElementSibling;

      // Check if there is a next cell
      if (nextCell) {
        nextCells.push(nextCell);
      } else {
        // Break the loop if there are no more cells
        break;
      }
    }
  }
  return nextCells;
}

// Helper function for renderResult()
function renderOnBoard(data, reference) {
  const startCell = document.querySelector(
    `${reference} .game-board div[data-coor='${data.coor.join("")}`,
  );
  const curShipLength = shipsNotYetPlaced[0].length;
  const cellsArr = getReferencesToCells(startCell, curShipLength);
  cellsArr.forEach((cell) => {
    const cellRef = cell;
    cellRef.style.backgroundColor = "#65a30d";
  });
}

function renderResult(data) {
  // If the ship was not placed, return
  if (data instanceof Error) {
    console.log(data);
    return;
  }

  // Render the placed ship coordinates on placing board
  renderOnBoard(data, ".ship-placer");

  // Render the placed ship coordinates on main human board
  renderOnBoard(data, "#human-player-container");

  // Move the placed ship to arr for placed ships, and announce the current ship to place
  placedShips.push(shipsNotYetPlaced[0]);
  shipsNotYetPlaced.shift();
  announceCurShip();

  // After all ships are placed, emit "AllShipsArePlaced" event
  if (shipsNotYetPlaced.length === 0) events.emit("AllShipsArePlaced", {});
}

function removeWelcome() {
  const overlay = document.querySelector(".overlay");
  const shipPlacerContainer = document.querySelector(".ship-placer-container");
  overlay.classList.add("hidden");
  shipPlacerContainer.classList.add("hidden");
}

// Emit to signal DOMContentLoad
document.addEventListener("DOMContentLoaded", () => {
  events.emit("pageLoaded", {});
});

document.addEventListener("DOMContentLoaded", announceCurShip);
placeShipsBoard.addEventListener("mouseover", addHoverEffect);
placeShipsBoard.addEventListener("click", clickToPlaceShip);
events.on("HumanPlaceResult", renderResult);
events.on("AllShipsArePlaced", removeWelcome);
