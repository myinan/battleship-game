import "./style.css";
import GameBoard from "./modules/GameBoard";

const myBoard = new GameBoard();

console.log(myBoard.placeShip(myBoard.ships.carrier, { row: 3, column: 5 }));
console.log(myBoard.board);
