export class Pointer {
  name: string;
  target: string;
  address: string;
  cost: number;
  counter: number;

  constructor(name: string = '', target: string = '', address: string = '', cost: number = 0, counter: number = 0) {
    this.name = name;
    this.target = target;
    this.address = address;
    this.cost = cost;
    this.counter = counter;
  }
}
