import GameBoard from "../modules/GameBoard";

test("place ship on gameboard", () => {
  const gameBoard = new GameBoard();

  expect(
    gameBoard.placeShip(gameBoard.ships.carrier, { row: 3, column: 4 }),
  ).toBe(true);

  expect(() =>
    gameBoard.placeShip(gameBoard.ships.patrolBoat, { row: 12, column: 5 }),
  ).toThrow("Coordinates are outside of gameboard.");

  expect(() =>
    gameBoard.placeShip(gameBoard.ships.destroyer, { row: 4, column: 9 }),
  ).toThrow("Ship length exceeds board column length.");

  gameBoard.placeShip(gameBoard.ships.destroyer, { row: 5, column: 5 });
  expect(() =>
    gameBoard.placeShip(gameBoard.ships.submarine, { row: 5, column: 7 }),
  ).toThrow("A ship is already placed at those coordinates.");
});

test("receive attack on gameboard correctly", () => {
  const gameBoard = new GameBoard();

  gameBoard.placeShip(gameBoard.ships.patrolBoat, { row: 7, column: 4 });
  gameBoard.receiveAttack({ row: 7, column: 4 });
  expect(gameBoard.board[7][4]).toEqual("X");

  // Not all ships are sunk
  expect(gameBoard.receiveAttack({ row: 7, column: 5 })).toBe("p");
  // Patrol boat is sunk
  expect(gameBoard.ships.patrolBoat.isSunk()).toBe(true);

  gameBoard.receiveAttack({ row: 4, column: 9 });
  expect(gameBoard.board[4][9]).toEqual("X");

  expect(() => gameBoard.receiveAttack({ row: 4, column: 9 })).toThrow(
    "Coordinate is already hit.",
  );
});
