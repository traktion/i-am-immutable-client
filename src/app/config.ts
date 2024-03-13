export class Config {
  name: string;
  urls: string[];
  assets: string[];

  constructor(name: string = '', urls: string[], assets: string[]) {
    this.name = name;
    this.urls = urls;
    this.assets = assets;
  }
}
