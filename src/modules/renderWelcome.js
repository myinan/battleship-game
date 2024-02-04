import "./renderWelcome.css";

const placeShipsBoard = document.querySelector(".ship-placer .game-board");

function addHoverEffect(e) {
  const event = e;
  const classListArr = Array.from(event.target.classList);
  if (classListArr.includes("cell")) {
    event.target.style.backgroundColor = "black";
  }
}

placeShipsBoard.addEventListener("mouseover", addHoverEffect);
