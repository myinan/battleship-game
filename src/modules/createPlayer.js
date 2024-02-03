import GameBoard from "./GameBoard";

function createPlayer() {
  return {
    board: new GameBoard(),
    attack(enemyBoard, hitCoor) {
      return enemyBoard.receiveAttack(hitCoor);
    },
  };
}

// Create both players
const humanPlayer = createPlayer();
const computerPlayer = createPlayer();

// Create array for computerPlayer to keep track of attacked coordinates
computerPlayer.attackedCoords = [];

// Helper function to check if coordinates have already been attacked
function coordinatesAlreadyAttacked(coords) {
  return computerPlayer.attackedCoords.some(
    (coord) => coord.row === coords.row && coord.column === coords.column,
  );
}

// Function for computer's play
computerPlayer.play = function play(enemyBoard) {
  let hitCoor;

  // Keep generating random coordinates until a not-attacked one is found
  do {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    hitCoor = { row: num1, column: num2 };
  } while (coordinatesAlreadyAttacked(hitCoor));

  // Mark the current coordinates as attacked
  computerPlayer.attackedCoords.push(hitCoor);

  // Perform the attack on the enemy board
  const cellValue = computerPlayer.attack(enemyBoard, hitCoor);
  return { hitCoor, cellValue };
};

export { humanPlayer, computerPlayer };
