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
    events.emit("humanAttacked", { event: data.eventData, cellValue });
  }
}

function handleComputerAttack(data) {
  let compAttackData;
  // If user clicked on an already attacked cell, don't make a play
  if (data.cellValue === "X") return;

  setTimeout(() => {
    compAttackData = computerPlayer.play(humanPlayer.board);
    events.emit("computerAttacked", compAttackData);
  }, 100);
}

// Get the coor data of human attack, play the game, emit the result
events.on("humanClicked", handleHumanAttack);

// Listen/Wait for human play, then play as computer,
// after that, emit the data of computer's play for rendering
events.on("humanAttacked", handleComputerAttack);
