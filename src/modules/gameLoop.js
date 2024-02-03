import { events } from "../helpers/events";
import { humanPlayer, computerPlayer } from "./createPlayer";

function placeComputerShips() {
  computerPlayer.placeShips();
  console.log(computerPlayer.board.board);
}

function handleHumanAttack(data) {
  let cellValue;
  try {
    cellValue = humanPlayer.attack(computerPlayer.board, {
      row: data.coor[0],
      column: data.coor[1],
    });
  } catch (err) {
    cellValue = "X";
  } finally {
    const dataObject = {
      event: data.eventData,
      cellValue,
      areAllShipsSunk: computerPlayer.board.areAllShipsSunk(),
    };
    events.emit("humanAttacked", dataObject);
  }
}

function handleComputerAttack(data) {
  let compAttackData;

  // If user clicked on an already attacked cell, don't make a play
  if (data.cellValue === "X") return;

  setTimeout(() => {
    compAttackData = computerPlayer.play(humanPlayer.board);
    const areAllShipsSunk = humanPlayer.board.areAllShipsSunk();
    events.emit("computerAttacked", { compAttackData, areAllShipsSunk });
  }, 100);
}

// On page load, computer places it's ships
events.on("pageLoaded", placeComputerShips);

// Get the coor data from human click, play the game, emit the result
events.on("humanClicked", handleHumanAttack);

// Listen/Wait for human play, then play as computer,
// after that, emit the data of computer's play
events.on("humanAttacked", handleComputerAttack);
