import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import Chart from 'chart.js/auto';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  templateUrl: 'covid-history.component.html',
  styleUrls: ['covid-history.component.scss'],
})
export class CovidHistoryComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CovidHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private generalService: GeneralService
  ) {}

  filteredDate: any = [];

  ngOnInit() {
    for (let i in this.data.All.dates) {
      this.filteredDate.push(this.data.All.dates[i]);
    }

    new Chart('myChart', {
      type: 'line',
      data: {
        labels: Object.keys(this.data.All.dates).reverse(),
        datasets: [
          {
            label: '# of Votes',
            data: this.filteredDate.reverse(),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  changeStatus(event: MatSelectChange) {
    this.generalService
      .callApi('post', 'covid/history', {
        country: this.data.All.country,
        status: event.value,
      })
      .subscribe(
        (res) => {
          this.generalService.loaderEvent.next(false);
          this.data = res.result;
          console.log(this.data);
        },
        (err) => {
          this.generalService.loaderEvent.next(false);
          console.log(err);
        }
      );
  }
}
