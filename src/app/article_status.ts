export class ArticleStatus {
  id: string;
  status: string;
  message: string;
  address: string;

  constructor(id: string = '', status: string = '', message: string = '', address: string = '') {
    this.id = id;
    this.status = status;
    this.message = message;
    this.address = address;
  }
}
