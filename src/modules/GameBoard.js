import Ship from "./Ship";

export default class GameBoard {
  constructor() {
    // A 10x10 matrix initially filled with string zeros
    this.board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }).fill("0"),
    );
    this.ships = {
      carrier: new Ship("carrier", 5),
      battleship: new Ship("battleship", 4),
      destroyer: new Ship("destroyer", 3),
      submarine: new Ship("submarine", 3),
      patrolBoat: new Ship("patrol boat", 2),
    };
  }

  placeShip(ship, startCoor) {
    if (startCoor.row > 9 || startCoor.column > 9)
      throw new Error("Coordinates are outside of gameboard.");

    if (startCoor.column + ship.length - 1 > 9)
      throw new Error("Ship length exceeds board column length.");

    const columnEndCoor = startCoor.column + ship.length - 1;

    for (let i = startCoor.column; i <= columnEndCoor; i += 1) {
      if (this.board[startCoor.row][i] !== "0")
        throw new Error("A ship is already placed at those coordinates.");
    }

    const firstChar = [...ship.name][0];
    for (let i = startCoor.column; i <= columnEndCoor; i += 1) {
      this.board[startCoor.row][i] = firstChar;
    }
    return true;
  }

  receiveAttack(hitCoor) {
    const cellValue = this.board[hitCoor.row][hitCoor.column];

    if (cellValue === "X") {
      throw new Error("Coordinate is already hit.");
    }

    if (cellValue === "0") {
      this.board[hitCoor.row][hitCoor.column] = "X";
    } else {
      // If the hit cellValue is not X or 0 which means a ship got hit
      Object.entries(this.ships).some(([key, ship]) => {
        if (key[0] === cellValue) {
          this.board[hitCoor.row][hitCoor.column] = "X";
          ship.hit();
        }
        return false;
      });
    }
    return this.areAllShipsSunk();
  }

  areAllShipsSunk() {
    return Object.values(this.ships).every((value) => value.isSunk());
  }
}
