import Ship from "./Ship";

export default class GameBoard {
  constructor() {
    // A 10x10 matrix initially filled with zeros
    this.board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }).fill(0),
    );
    this.ships = {
      carrier: new Ship(5),
      battleship: new Ship(4),
      destroyer: new Ship(3),
      submarine: new Ship(3),
      patrolBoat: new Ship(2),
    };
  }

  placeShip(shipName, startCoor) {
    if (startCoor.row > 9 || startCoor.column > 9)
      return new Error("Coordinates are outside of gameboard.");

    if (startCoor.column + shipName.length - 1 > 9)
      return new Error("Ship length exceeds board column length.");

    const columnEndCoor = startCoor.column + shipName.length - 1;
    for (let i = startCoor.column; i <= columnEndCoor; i += 1) {
      this.board[startCoor.row][i] = 1;
    }
    return true;
  }
}
