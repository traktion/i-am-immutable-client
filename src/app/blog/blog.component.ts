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

  articleSafeUrls: string[];
  articleSubscription: Subscription;
  listXor: string;
  articles: Message[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              public blogService: BlogService,
              private markdownService: MarkdownService,
              private navigationService: NavigationService) {
    this.articleSafeUrls = [];
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

    this.articleSubscription = this.blogService.getArticleDescriptors(this.listXor)
    .subscribe(xorUrls => {
      this.articleSafeUrls = JSON.parse(xorUrls);
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
    console.log('ready');
  }

}
