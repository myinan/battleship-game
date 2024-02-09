import "./renderShipsStatus.css";
import { events } from "../helpers/events";
import { humanPlayer, computerPlayer } from "./createPlayer";

const displayShips = document.querySelectorAll(".display-ships");

const ships = [
  { name: "carrier", length: 5 },
  { name: "battleship", length: 4 },
  { name: "destroyer", length: 3 },
  { name: "submarine", length: 3 },
  { name: "patrolBoat", length: 2 },
];

Array.from(displayShips).forEach((displayer) => {
  ships.forEach((ship) => {
    const newDiv = document.createElement("div");
    displayer.appendChild(newDiv);
    newDiv.classList.add(`${ship.name}-status`);

    for (let i = 0; i < ship.length; i += 1) {
      const cell = document.createElement("div");
      newDiv.appendChild(cell);
      cell.classList.add("cell-status");
    }
  });
});

const compShipDivs = document.querySelectorAll(
  ".main-container > div:last-child > div",
);

function renderComputerShipStatus() {
  Array.from(Object.values(computerPlayer.board.ships)).forEach((ship) => {
    if (ship.isSunk()) {
      Array.from(compShipDivs).some((div) => {
        if (div.className.split("")[0] === ship.name.split("")[0]) {
          const cells = div.children;
          Array.from(cells).forEach((cell) => {
            cell.classList.add("red-bg");
          });
        }
      });
    }
  });
}

const humanShipDivs = document.querySelectorAll(
  ".main-container > div:first-child > div",
);

function renderHumanShipStatus() {
  Array.from(Object.values(humanPlayer.board.ships)).forEach((ship) => {
    if (ship.isSunk()) {
      Array.from(humanShipDivs).some((div) => {
        if (div.className.split("")[0] === ship.name.split("")[0]) {
          const cells = div.children;
          Array.from(cells).forEach((cell) => {
            cell.classList.add("red-bg");
          });
        }
      });
    }
  });
}

events.on("humanAttacked", renderComputerShipStatus);

events.on("computerAttacked", renderHumanShipStatus);
