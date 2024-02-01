export default class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.totalHit = 0;
    this.sunk = false;
  }

  hit() {
    this.totalHit += 1;
    this.isSunk();
    return this.totalHit;
  }

  isSunk() {
    if (this.totalHit === this.length) this.sunk = true;
    return this.sunk;
  }
}
