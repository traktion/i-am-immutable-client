import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SnConfig} from './sn-config.js';
import {LocationStrategy} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient,
    private locationStrategy: LocationStrategy
  ) {}

  getSnConfig(xor: string): Observable<SnConfig> {
    return this.http.get<SnConfig>(`/safe/` + xor, { responseType: 'json'});
  }

  getArticle(xor: string): Observable<string> {
    return this.http.get(this.locationStrategy.getBaseHref() + xor, { responseType: 'text'});
  }

  formatMarkdownHeader1(document: string, articleUrl: string): string {
    return document.replace(/(# )(.*)( #)/, '# [$2](' + articleUrl + ') #');
  }

  formatMarkdownSafeUrls(document: string): string {
    const url = this.locationStrategy.getBaseHref() + '$1$2';
    return document.replace(/safe?:\/\/([-a-zA-Z0-9@:%._\\+~#=]{1,256})\b([-a-zA-Z0-9@:%_\\+.~#?&\/=]*)/g, url);
  }
}
