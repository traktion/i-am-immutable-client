import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Message} from '../message';
import {ActivatedRoute, Router} from '@angular/router';
import {BlogService} from '../blog.service';
import {MarkdownService} from 'ngx-markdown';
import {NavigationService} from '../navigation.service';
import {LocationStrategy} from '@angular/common';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogName: string;
  articleUrls: string[];
  blogSubscription: Subscription;
  articleSubscription: Subscription;
  listXor: string;
  articles: Message[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              public blogService: BlogService,
              private markdownService: MarkdownService,
              private navigationService: NavigationService,
              private locationStrategy: LocationStrategy) {
    this.blogName = 'IMIM';
    this.articleUrls = [];
    this.blogSubscription = new Subscription();
    this.articleSubscription = new Subscription();
    this.listXor = '';
    this.articles = [];
  }

  ngOnInit(): void {
    this.listXor = this.route.snapshot.paramMap.get('listXor') ?? '';
    console.log(this.listXor);

    this.markdownService.renderer.image = (href: string, title: string, text: string) => {
      return '<img src="' + href + '" title="' + title + '" alt=' + text + ' class="img-fluid">';
    };

    this.navigationService.update(this.route.snapshot.paramMap.get('listXor') ?? '');

    this.blogSubscription = this.blogService.getSnConfig(this.listXor)
    .subscribe(config => {
      this.blogName = config.imim.name;
      console.log(this.blogName);
      this.articleUrls = config.imim.articles;
      console.log(this.articleUrls);

      for (const articleXor of this.articleUrls ) {
        this.articleSubscription = this.blogService.getArticle(articleXor).subscribe(articleContent => {
          const articleUrl = this.locationStrategy.getBaseHref() + this.navigationService.getArticleUrl(this.listXor, articleXor) + '#article';
          articleContent = this.blogService.formatMarkdownHeader1(
            articleContent,
            articleUrl
          );
          articleContent = this.blogService.formatMarkdownSafeUrls(articleContent);
          this.articles.push(new Message(articleUrl, articleContent));
        });
      }
    });
  }

  onReady(): void {
    console.log('blog ready');
  }

}
