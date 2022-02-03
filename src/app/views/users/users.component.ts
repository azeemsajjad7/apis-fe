import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private generalService: GeneralService) {}

  dataSource: any;

  displayedColumns = ['first_name', 'last_name', 'email', 'active'];

  ngOnInit() {
    this.generalService.loaderEvent.next(true);
    this.generalService.callApi('get', 'users').subscribe(
      (res) => {
        if (res.success) {
          this.generalService.loaderEvent.next(false);
          this.dataSource = res.result;
        } else {
          this.generalService.loaderEvent.next(false);
          this.generalService.alertEvent.next({
            title: 'ERROR',
            text: 'Something went wrong!!',
          });
        }
      },
      (err) => {
        this.generalService.loaderEvent.next(false);
        this.generalService.alertEvent.next({
          title: 'ERROR',
          text: 'Something went wrong!!',
        });
      }
    );
  }

  changeStatus(event: MatSlideToggleChange, ele: any) {
    this.generalService.loaderEvent.next(true);
    this.generalService
      .callApi('post', 'users/change-user-status', {
        user_id: ele.id,
        status: event.checked,
      })
      .subscribe(
        (res) => {
          if (res.success) {
            this.generalService.loaderEvent.next(false);
            this.generalService.alertEvent.next({
              title: 'Success',
              text: res.result + ' for ' + ele.first_name + ' ' + ele.last_name,
            });
          } else {
            this.generalService.loaderEvent.next(false);
            this.generalService.alertEvent.next({
              title: 'ERROR',
              text: 'Something went wrong!!',
            });
          }
        },
        (err) => {
          this.generalService.loaderEvent.next(false);
          this.generalService.alertEvent.next({
            title: 'ERROR',
            text: err,
          });
        }
      );
  }
}
