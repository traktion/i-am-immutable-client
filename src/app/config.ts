export class Config {
  name: string;
  articles: string[];

  constructor(name: string = '', articles: string[]) {
    this.name = name;
    this.articles = articles;
  }
}
