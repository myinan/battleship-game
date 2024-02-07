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

// Variable to keep track of latest attacked cell
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
  // Mark the current coordinates as attacked
  computerPlayer.attackedCoords.push(hitCoor);

  // Perform the attack on the enemy board
  const cellValue = computerPlayer.attack(enemyBoard, hitCoor);
  return { hitCoor, cellValue };
}

// Function for computer's play
computerPlayer.play = function play(enemyBoard) {
  if (
    latestAttackedCell.cellValue === null || // If at the beginning of the game
    (latestAttackedCell.cellValue === "0" && shipCellsCoords.length === 0) || // If the previously hit cell was empty
    shipCellsCoords.length === 0 // If the prev cell was not empty but all adjacent cells are hit
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

      // Find the minimum and maximum column values
      let minColumn = column;
      let maxColumn = column;

      shipCellsCoords.forEach((obj) => {
        if (obj.column < minColumn) {
          minColumn = obj.column;
        }
        if (obj.column > maxColumn) {
          maxColumn = obj.column;
        }
      });

      if (
        enemyBoard.board[row][minColumn - 1] &&
        enemyBoard.board[row][minColumn - 1] === "0"
      ) {
        shipCellsCoords.push({ row, column: minColumn - 1 });
      }

      if (
        enemyBoard.board[row][maxColumn + 1] &&
        enemyBoard.board[row][maxColumn + 1] === "0"
      ) {
        shipCellsCoords.push({ row, column: maxColumn + 1 });
      }
    }
    return latestAttackedCell;
  }

  // This means there are adjacent cells to hit
  if (shipCellsCoords.length !== 0) {
    latestAttackedCell = attackPrevNext(enemyBoard, shipCellsCoords[0]);
    shipCellsCoords.shift();
  }

  return latestAttackedCell;
};

export { humanPlayer, computerPlayer };
