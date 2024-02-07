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

// Function for computerPlayer to place it's ships
computerPlayer.placeShips = function placeShips() {
  const shipsArr = Object.values(computerPlayer.board.ships);
  shipsArr.forEach((ship) => {
    let startCoor;
    let shipPlaced = false;

    while (!shipPlaced) {
      try {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        startCoor = { row: num1, column: num2 };

        // Attempt to place the ship
        computerPlayer.board.placeShip(ship, startCoor);

        // If no error occurred, set shipPlaced to true
        shipPlaced = true;
      } catch (err) {
        // Silently catch the error
      }
    }
  });
};

// Create array for computerPlayer to keep track of attacked coordinates
computerPlayer.attackedCoords = [];

// Helper function to check if coordinates have already been attacked
function coordinatesAlreadyAttacked(coords) {
  return computerPlayer.attackedCoords.some(
    (coord) => coord.row === coords.row && coord.column === coords.column,
  );
}

// Variable to keep track of latest attack cell
let latestAttackedCell = {
  cellValue: null,
  hitCoor: null,
};

// Variable to keep track of adjacent ship cells on ship hit
const shipCellsCoords = [];

// Helper function for random attacks
function attackRandom(enemyBoard) {
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
}

// Helper function to attack previous or next cells of an already hit ship
function attackPrevNext(enemyBoard, hitCoor) {
  computerPlayer.attackedCoords.push(hitCoor);
  const cellValue = computerPlayer.attack(enemyBoard, hitCoor);
  return { hitCoor, cellValue };
}

// Function for computer's play
computerPlayer.play = function play(enemyBoard) {
  if (
    latestAttackedCell.cellValue === null ||
    latestAttackedCell.cellValue === "0" ||
    shipCellsCoords.length === 0
  ) {
    latestAttackedCell = attackRandom(enemyBoard);
    // This mean a ship got hit
    if (latestAttackedCell.cellValue !== "0") {
      // Store references to prev and next cells
      const { row } = latestAttackedCell.hitCoor;
      const { column } = latestAttackedCell.hitCoor;
      let columnNext = column;
      let columnPrev = column;
      while (
        enemyBoard.board[row][columnNext + 1] === latestAttackedCell.cellValue
      ) {
        columnNext += 1;
        shipCellsCoords.push({ row, column: columnNext });
      }

      while (
        enemyBoard.board[row][columnPrev - 1] === latestAttackedCell.cellValue
      ) {
        columnPrev -= 1;
        shipCellsCoords.push({ row, column: columnPrev });
      }
    }
    return latestAttackedCell;
  }
  if (shipCellsCoords.length !== 0) {
    latestAttackedCell = attackPrevNext(enemyBoard, shipCellsCoords[0]);
    shipCellsCoords.shift();
  }
  return latestAttackedCell;
};

export { humanPlayer, computerPlayer };

// Pseuodocode
/* 
let latestAttackedCell;
let shipCellsCoords;

function attackRandom() {}
function attackPrevNext() {}

computerPlayer.play = function play(enemyBoard) {
  If (latestAttackedCell === "0") { 
    latestAttackedCell = attackRandom()
    If ( latestAttackedCell !== "0") { 
      // Store references to prev and next cells 
      Update shipCellsCoords
    }
    return latestAttackedCell
  }
  
  if ( shipCellsCoords.length !== 0) {
    // Keep attacking shipCellsCoords until store Arr is empty
    attackPrevNext(shipCellsCoords[0])
    shipCellsCoords.shift()
    if (shipCellsCoords.length === 0) {
      // If store Arr is empty, update latestAttackedCell to "0"
      latestAttackedCell = "0";
    }
    return ?
  }
} 
*/
