import { Injectable } from '@angular/core';
import {NavItem} from './nav-item';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  navItems: NavItem[];

  constructor() {
    this.navItems = [
      new NavItem('Home', 'home', '/blog/unknown'),
      new NavItem('Article', 'article', '/blog/unknown/article/unknown'),
    ];
  }

  update(listXor: string, articleXor?: string): void {
    this.navItems[0].url = this.getListUrl(listXor);
    if (articleXor) {
      this.navItems[1].url = this.getArticleUrl(listXor, articleXor);
    } else {
      this.navItems[1].url = this.navItems[0].url;
    }
  }

  getListUrl(listXor: string): string {
    return 'blog/' + listXor;
  }

  getArticleUrl(listXor: string, articleXor: string): string {
    return 'blog/' + listXor + '/article/' + articleXor;
  }
}
