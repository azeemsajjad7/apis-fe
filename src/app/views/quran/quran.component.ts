import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  templateUrl: 'quran.component.html',
})
export class QuranComponent implements OnInit {
  constructor(private generalService: GeneralService, private router: Router) {}

  dataSource: any = [];

  displayedColumns = ['chapter', 'englishname'];

  ngOnInit() {
    this.generalService.loaderEvent.next(true);
    this.generalService.callApi('get', 'quran/info').subscribe(
      (res) => {
        if (res.success) {
          this.generalService.loaderEvent.next(false);
          this.dataSource = res.result.chapters;
        } else {
          this.generalService.loaderEvent.next(false);
          this.generalService.alertEvent.next({
            title: 'ERROR!!',
            text: 'Something went wrong!!',
          });
        }
      },
      (err) => {
        console.log(err);
        this.generalService.loaderEvent.next(false);
        this.generalService.alertEvent.next({
          title: 'ERROR!!',
          text: err,
        });
      }
    );
  }

  viewDetails(row: any) {
    this.router.navigateByUrl('quran/' + row.chapter);
  }
}
