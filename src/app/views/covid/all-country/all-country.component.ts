import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from 'src/app/services/general.service';
import { CovidHistoryComponent } from '../history/covid-history.component';

@Component({
  templateUrl: 'all-country.component.html',
  styleUrls: ['all-country.component.scss'],
})
export class AllCountryCovidComponent implements OnInit {
  constructor(
    private generalService: GeneralService,
    public dialog: MatDialog
  ) {}

  dataSource: any = [];

  displayedColumns = ['country', 'confirmed', 'deaths', 'population', 'update'];

  ngOnInit() {
    this.generalService.loaderEvent.next(true);
    this.generalService.callApi('get', 'covid').subscribe((res) => {
      this.generalService.loaderEvent.next(false);

      for (let i in res.result) {
        if (res.result[i].All.country) this.dataSource.push(res.result[i].All);
      }
    });
  }

  viewDetails(element: any) {
    this.generalService.loaderEvent.next(true);
    this.generalService
      .callApi('post', 'covid/history', {
        country: element.country,
        status: 'Confirmed',
      })
      .subscribe(
        (res) => {
          this.generalService.loaderEvent.next(false);
          this.dialog.open(CovidHistoryComponent, {
            panelClass: 'dialog-80',
            data: res.result,
          });
        },
        (err) => {
          this.generalService.loaderEvent.next(false);
          console.log(err);
        }
      );
  }
}
