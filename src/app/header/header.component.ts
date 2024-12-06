import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavItem} from '../nav-item';
import {withLatestFrom} from 'rxjs/operators';
import {NavigationService} from '../navigation.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent implements OnInit {

  constructor(public route: ActivatedRoute,
              public router: Router,
              public navigationService: NavigationService) {
  }

  ngOnInit(): void {
  }

}
