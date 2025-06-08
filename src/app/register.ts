export class Register {
  name: string;
  content: string;
  address: string;
  cost: number;

  constructor(name: string = '', content: string = '', address: string = '', cost: number = 0) {
    this.name = name;
    this.content =  content;
    this.address = address;
    this.cost = cost;
  }
}
