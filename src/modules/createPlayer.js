import GameBoard from "./GameBoard";

export default function createPlayer() {
  return {
    board: new GameBoard(),
    attack(enemyBoard, hitCoor) {
      enemyBoard.recieveAttack(hitCoor);
    },
  };
}
