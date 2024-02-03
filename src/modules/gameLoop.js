import { events } from "../helpers/events";
import { humanPlayer, computerPlayer } from "./createPlayer";

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

// Get the coor data from human click, play the game, emit the result
events.on("humanClicked", handleHumanAttack);

// Listen/Wait for human play, then play as computer,
// after that, emit the data of computer's play
events.on("humanAttacked", handleComputerAttack);

/* Driver Script */
humanPlayer.board.placeShip(humanPlayer.board.ships.carrier, {
  row: 0,
  column: 0,
});
humanPlayer.board.placeShip(humanPlayer.board.ships.battleship, {
  row: 1,
  column: 0,
});
humanPlayer.board.placeShip(humanPlayer.board.ships.destroyer, {
  row: 2,
  column: 0,
});
humanPlayer.board.placeShip(humanPlayer.board.ships.submarine, {
  row: 3,
  column: 0,
});
humanPlayer.board.placeShip(humanPlayer.board.ships.patrolBoat, {
  row: 4,
  column: 0,
});

computerPlayer.board.placeShip(computerPlayer.board.ships.carrier, {
  row: 0,
  column: 0,
});
computerPlayer.board.placeShip(computerPlayer.board.ships.battleship, {
  row: 1,
  column: 0,
});
computerPlayer.board.placeShip(computerPlayer.board.ships.destroyer, {
  row: 2,
  column: 0,
});
computerPlayer.board.placeShip(computerPlayer.board.ships.submarine, {
  row: 3,
  column: 0,
});
computerPlayer.board.placeShip(computerPlayer.board.ships.patrolBoat, {
  row: 4,
  column: 0,
});

console.log(computerPlayer.board.board);
