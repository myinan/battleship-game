import "./style.css";
import GameBoard from "./modules/GameBoard";

const gameBoard = new GameBoard();
gameBoard.placeShip(gameBoard.ships.patrolBoat, { row: 3, column: 4 });
gameBoard.receiveAttack({ row: 3, column: 4 });
gameBoard.receiveAttack({ row: 3, column: 5 });
console.log(gameBoard.ships.patrolBoat.isSunk());

gameBoard.receiveAttack({ row: 3, column: 6 });
console.log(gameBoard.board);
