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

function curShipAnnouncer() {
  if (shipsNotYetPlaced) {
    const capFirstLetter = shipsNotYetPlaced[0].name.charAt(0).toUpperCase();
    const capitalizedName = capFirstLetter.concat(
      "",
      shipsNotYetPlaced[0].name.slice(1),
    );
    paraf.textContent = `${capitalizedName}`;
    placedShips.push(shipsNotYetPlaced[0]);
    shipsNotYetPlaced.shift();
    return true;
  }
  return false;
}

let prevDataCoor = null; // Initialize previous data-coor value
function addHoverEffect(e) {
  const event = e;
  const classListArr = Array.from(event.target.classList);

  if (classListArr.includes("cell")) {
    const currentDataCoor = event.target.dataset.coor;

    // Check if data-coor is different from the previous value
    if (currentDataCoor !== prevDataCoor) {
      // Add class "hovered" on hovered cell
      event.target.classList.add("hovered");

      // If previous cell exists, remove the "hovered" class on it
      if (prevDataCoor !== null) {
        const prevCell = document.querySelector(
          `.ship-placer .game-board div[data-coor='${prevDataCoor}`,
        );

        prevCell.classList.remove("hovered");
      }

      // Update the previous data-coor value
      prevDataCoor = currentDataCoor;
    }
  }
}

document.addEventListener("DOMContentLoaded", curShipAnnouncer);

placeShipsBoard.addEventListener("mouseover", addHoverEffect);

placeShipsBoard.addEventListener("click", (e) => {
  const cell = document.querySelector(".ship-placer .game-board .hovered");
  console.log(cell);
});
