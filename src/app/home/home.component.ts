import { Component, OnInit } from '@angular/core';
import {MessageDescriptor} from '../message-descriptor';
import {BlogService} from '../blog.service';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MarkdownService} from 'ngx-markdown';
import {Message} from '../message';
import {NavigationService} from '../navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }
}
