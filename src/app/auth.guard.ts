import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GeneralService } from './services/general.service';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(private router: Router, private generalService: GeneralService) {}

  canActivate(): boolean {
    if (this.generalService.isUserLogged()) {
      // let token: any = localStorage.getItem(environment.token);
      // var decodedToken: any = jwt_decode(token);
      // if (decodedToken.email === 'admin123@gmail.com') {
      //   console.log('hello');
      //   this.router.navigateByUrl('/users');
      return true;
      // } else {
      //   console.log('hello1');
      //   this.router.navigateByUrl('/covid');
      //   return true;
      // }
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
