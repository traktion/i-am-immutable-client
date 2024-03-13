import { Injectable } from '@angular/core';
import {Config} from './config';
import {MessageDescriptor} from './message-descriptor';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient
  ) {}

  getConfig(xor: string): Observable<Config> {
    return this.http.get<Config>(`/safe/` + xor, { responseType: 'json'});
  }

  getArticle(xor: string): Observable<string> {
    return this.http.get(`/safe/` + xor, { responseType: 'text'});
  }

  formatMarkdownHeader1(document: string, articleUrl: string): string {
    return document.replace(/(# )(.*)( #)/, '# [$2](' + articleUrl + ') #');
  }

  formatMarkdownSafeUrls(document: string): string {
    return document.replace(/safe?:\/\/([-a-zA-Z0-9@:%._\\+~#=]{1,256})\b([-a-zA-Z0-9@:%_\\+.~#?&\/=]*)/g, '/safe/$1$2');
  }
}
