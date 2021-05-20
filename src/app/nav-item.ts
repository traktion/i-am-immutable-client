export class NavItem {
  title: string;
  fragment: string;
  url: string;

  constructor(title: string = '', fragment: string = '', url: string = '') {
    this.title = title;
    this.fragment = fragment;
    this.url = url;
  }
}
