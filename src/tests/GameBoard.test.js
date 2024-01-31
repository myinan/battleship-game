import GameBoard from "../modules/GameBoard";

test("place ship on gameboard", () => {
  const gameBoard = new GameBoard();
  expect(
    gameBoard.placeShip(gameBoard.ships.carrier, { row: 3, column: 4 }),
  ).toBe(true);

  expect(
    gameBoard.placeShip(gameBoard.ships.patrolBoat, { row: 12, column: 5 }),
  ).toEqual(Error("Coordinates are outside of gameboard."));

  expect(
    gameBoard.placeShip(gameBoard.ships.destroyer, { row: 4, column: 9 }),
  ).toEqual(Error("Ship length exceeds board column length."));
});
