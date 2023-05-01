import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  displayTabMenu: boolean = false;

  constructor(private router: Router) {
    this.displayTabMenu = this.shouldDisplayTabMenu();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.displayTabMenu = this.shouldDisplayTabMenu();
        console.log('display tab', this.displayTabMenu, this.router.url);
      });
  }

  ngOnInit() {}

  shouldDisplayTabMenu(): boolean {
    const currentRoute = this.router.url;
    return currentRoute !== '/animation-page' && currentRoute !== '/';
  }
}
