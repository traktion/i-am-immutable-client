import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MarkdownService } from 'ngx-markdown';
import { NavigationService } from '../navigation.service';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-publish',
    templateUrl: './publish.component.html',
    styleUrls: ['./publish.component.css'],
    standalone: false
})
export class PublishComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService,
    private locationStrategy: LocationStrategy,
  ) { }

  ngOnInit(): void {
  };
}
