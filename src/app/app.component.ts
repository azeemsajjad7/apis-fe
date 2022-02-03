import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (localStorage.getItem(environment.token)) {
          this.showToolbar = true;
        } else {
          this.showToolbar = false;
        }
      }
    });
  }

  showToolbar: boolean;

  ngOnInit() {}

  logout() {
    localStorage.removeItem(environment.token);
    this.router.navigateByUrl('/');
  }

  menuList = [
    {
      routerlink: '/covid',
      title: 'Covid',
    },
    {
      routerlink: '/google-spreadsheet',
      title: 'Google',
    },
    {
      routerlink: '/quran',
      title: 'Quran',
    },
    {
      routerlink: '/flight',
      title: 'Flight',
    },
    {
      routerlink: '/train',
      title: 'Train',
    },
  ];
}
