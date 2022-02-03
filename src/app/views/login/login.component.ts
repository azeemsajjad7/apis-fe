import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'selector-name',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _formbuilder: FormBuilder,
    private generalService: GeneralService,
    private router: Router
  ) {}

  signInForm: FormGroup;
  hide: boolean = true;

  ngOnInit() {
    this.signInForm = this._formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  signInFormSubmit() {
    this.generalService.loaderEvent.next(true);
    this.generalService
      .callApi('post', 'auth/signin', {
        email: this.signInForm.value.email,
        password: this.signInForm.value.password,
      })
      .subscribe(
        (res) => {
          if (res.success) {
            this.generalService.loaderEvent.next(false);
            localStorage.setItem(environment.token, res.token);

            let token: any = localStorage.getItem(environment.token);
            var decodedToken: any = jwt_decode(token);
            if (decodedToken.email === 'admin123@gmail.com') {
              this.router.navigateByUrl('/users');
            } else {
              this.router.navigateByUrl('/covid');
            }
          } else if (res.result?.response?.statusCode === 401) {
            this.generalService.loaderEvent.next(false);
            this.generalService.alertEvent.next({
              title: res.result.response.error,
              text: res.result.response.message,
            });
          } else {
            this.generalService.loaderEvent.next(false);
            this.generalService.alertEvent.next({
              title: 'ERROR!!',
              text: 'Somrthing went wrong!!',
            });
          }
        },
        (err: Error) => {
          this.generalService.loaderEvent.next(false);
          this.generalService.alertEvent.next({
            title: 'ERROR!!',
            text: err.message,
          });
        }
      );
  }
}
