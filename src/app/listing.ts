export class Listing {
  name: string;
  type: string;
  mtime: Date;
  size: number;

  constructor(name: string = '', type: string = '', mtime: string = '', size: number = 0) {
    this.name = name;
    this.type = type;
    this.mtime = new Date(mtime);
    this.size = size;
  }
}
