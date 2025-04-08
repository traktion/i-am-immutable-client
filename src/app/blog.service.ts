import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Listing} from './listing';
import {LocationStrategy} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient,
    private locationStrategy: LocationStrategy
  ) {}

  getSnConfig(listXor: string): Observable<Listing[]> {
    return this.http.get<Listing[]>("http://" + listXor + '/', { responseType: 'json'})
      .pipe(
        map((items:Listing[]) => items.sort((a: Listing, b: Listing) => {
          if (a.mtime > b.mtime) {
            return 1;
          } else if (a.mtime > b.mtime) {
            return -1;
          }
          return 0
        }))
      );
  }

  getArticle(listXor: string, articleXor: string): Observable<string> {
    return this.http.get("http://" + listXor + "/" + articleXor, { responseType: 'text'});
  }

  formatMarkdownHeader1(document: string, articleUrl: string): string {
    return document.replace(/(# )(.*)( #)/, '# [$2](' + articleUrl + ') #');
  }

  formatMarkdownSafeUrls(document: string): string {
    const url = this.locationStrategy.getBaseHref() + '$1$2';
    return document.replace(/ant?:\/\/([-a-zA-Z0-9@:%._\\+~#=]{1,256})\b([-a-zA-Z0-9@:%_\\+.~#?&\/=]*)/g, url);
  }
}
