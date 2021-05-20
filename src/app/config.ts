export class Config {
  name: string;
  mq: string;

  constructor(name: string = '', mq: string = '') {
    this.name = name;
    this.mq = mq;
  }
}
