import { Component, OnInit } from '@angular/core';
import {BlogService} from '../blog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MarkdownService} from 'ngx-markdown';
import {Subscription} from 'rxjs';
import {NavigationService} from '../navigation.service';
import {LocationStrategy} from '@angular/common';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  message: string;
  messageSubscription: Subscription;
  articleUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public blogService: BlogService,
              private markdownService: MarkdownService,
              public navigationService: NavigationService,
              private locationStrategy: LocationStrategy
  ) {
    this.message = '';
    this.messageSubscription = new Subscription();
    this.articleUrl = '';
  }

  ngOnInit(): void {
    this.articleUrl = this.route.snapshot.url.join('/');
    const listXor = this.route.snapshot.paramMap.get('listXor') ?? '';
    const articleXor = this.route.snapshot.paramMap.get('articleXor') ?? '';

    this.markdownService.renderer.image = (href: string, title: string, text: string) => {
      return '<img src="' + listXor + '/' + href + '" title="' + title + '" alt=' + text + ' class="img-fluid">';
    };

    this.navigationService.update(
      this.route.snapshot.paramMap.get('listXor') ?? '',
      this.route.snapshot.paramMap.get('articleXor') ?? ''
    );

    this.messageSubscription = this.blogService.getArticle(listXor, articleXor).subscribe(val => {
      /*todo: handle double fragments on navigation links*/
      const url = this.locationStrategy.getBaseHref() + this.navigationService.navItems[1].url;
      this.message = this.blogService.formatMarkdownHeader1(val, url);
      this.message = this.blogService.formatMarkdownSafeUrls(this.message);
      console.log('raw: ' + this.message);
    });
  }

  onReady(): void {
    console.log('article ready');
  }
}
