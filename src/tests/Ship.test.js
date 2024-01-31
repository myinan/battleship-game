import Ship from "../modules/Ship";

test("ship gets hit", () => {
  const firstShip = new Ship(3);
  expect(firstShip.hit()).toBe(firstShip.totalHit);
});

test("ship gets sunk", () => {
  const newShip = new Ship(3);
  newShip.hit();
  newShip.hit();
  newShip.hit();
  expect(newShip.isSunk()).toBe(true);
});
