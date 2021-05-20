export class MessageDescriptor {
  name: string;
  description: string;
  url: string;

  constructor(name: string = '', description: string = '', url: string = '') {
    this.name = name;
    this.description = description;
    this.url = url;
  }
}
