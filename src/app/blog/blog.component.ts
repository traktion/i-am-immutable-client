import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Message} from '../message';
import {ActivatedRoute, Router} from '@angular/router';
import {BlogService} from '../blog.service';
import {MarkdownService} from 'ngx-markdown';
import {NavigationService} from '../navigation.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogName: string;
  articleSafeUrls: string[];
  blogSubscription: Subscription;
  articleSubscription: Subscription;
  listXor: string;
  articles: Message[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              public blogService: BlogService,
              private markdownService: MarkdownService,
              private navigationService: NavigationService) {
    this.blogName = 'IMIM';
    this.articleSafeUrls = [];
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

    this.blogSubscription = this.blogService.getConfig(this.listXor)
    .subscribe(config => {
      this.blogName = config.name;
      console.log(this.blogName);
      this.articleSafeUrls = config.urls;
      console.log(this.articleSafeUrls);

      for (const safeUrl of this.articleSafeUrls ) {
        const articleXor = safeUrl.substr(7);
        this.articleSubscription = this.blogService.getArticle(articleXor).subscribe(articleContent => {
          const articleUrl = this.navigationService.getArticleUrl(this.listXor, articleXor) + '#article';
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
