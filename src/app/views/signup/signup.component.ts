import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private _formbuilder: FormBuilder,
    private generalService: GeneralService,
    private router: Router
  ) {}

  signUpForm: FormGroup;
  hide: boolean = true;

  ngOnInit() {
    this.signUpForm = this._formbuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  signUpFormSubmit() {
    this.generalService.loaderEvent.next(true);
    this.generalService
      .callApi('post', 'auth/signup', {
        first_name: this.signUpForm.value.firstName,
        last_name: this.signUpForm.value.lastName,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
      })
      .subscribe(
        (res) => {
          if (res.success) {
            this.generalService.loaderEvent.next(false);
            this.generalService.alertEvent.next({
              title: 'Success',
              text: res.result,
              onOk: () => {
                this.router.navigateByUrl('/');
              },
            });
          } else if (res.result?.response?.statusCode === 409) {
            this.generalService.loaderEvent.next(false);
            this.generalService.alertEvent.next({
              title: res.result.response.error,
              text: res.result.response.message,
            });
          }
        },
        (err) => {
          if (err.status == 400) {
            this.generalService.loaderEvent.next(false);
            this.generalService.alertEvent.next({
              title: err.error.error,
              text: err.error.message[0],
            });
          } else {
            this.generalService.loaderEvent.next(false);
            this.generalService.alertEvent.next({
              title: err.name,
              text: err.message,
            });
          }
        }
      );
  }
}
