import {Listing} from './listing';

export class SnConfig {
  items: Listing[];

  constructor(items: Listing[]) {
    this.items = items;
  }
}
