import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  templateUrl: 'google-spreadsheet.component.html',
})
export class GoogleSpreadSheetComponent implements OnInit {
  constructor(private generalService: GeneralService) {}

  dataSource: any;
  displayedColumns: [];

  ngOnInit() {
    this.generalService.loaderEvent.next(true);
    this.generalService
      .callApi(
        'get',
        'google-apis/1p-tROXeUKa-FxjcrUG3E_7ko4DSbox1gBRZxIdgwhB0'
      )
      .subscribe(
        (res) => {
          if (res.success) {
            this.generalService.loaderEvent.next(false);
            this.dataSource = res.data;
            this.displayedColumns = res.header;
          } else {
            this.generalService.loaderEvent.next(false);
            this.generalService.alertEvent.next({
              title: 'ERROR!',
              text: 'Something went wrong',
            });
          }
        },
        (err) => {
          this.generalService.loaderEvent.next(false);
          this.generalService.alertEvent.next({
            title: 'ERROR!',
            text: err.message,
          });
        }
      );
  }
}
