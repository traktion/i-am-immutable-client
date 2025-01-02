import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
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
    return this.http.get<Listing[]>("/" + listXor + '/', { responseType: 'json'})
      /* .pipe(
         map((l: Listing) => {
            return new Listing(l.name, l.type)
         }
        )
      ); */
  }

  getArticle(listXor: string, articleXor: string): Observable<string> {
    return this.http.get("/" + listXor + "/" + articleXor, { responseType: 'text'});
  }

  formatMarkdownHeader1(document: string, articleUrl: string): string {
    return document.replace(/(# )(.*)( #)/, '# $2 #');
  }

  formatMarkdownSafeUrls(document: string): string {
    const url = this.locationStrategy.getBaseHref() + '$1$2';
    return document.replace(/safe?:\/\/([-a-zA-Z0-9@:%._\\+~#=]{1,256})\b([-a-zA-Z0-9@:%_\\+.~#?&\/=]*)/g, url);
  }
}
