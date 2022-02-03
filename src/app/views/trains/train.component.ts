import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  templateUrl: 'train.component.html',
  styleUrls: ['train.component.scss'],
})
export class TrainComponent implements OnInit {
  constructor(private generalService: GeneralService) {}

  ngOnInit() {
    this.generalService
      .callApi('post', 'travel/get-trains')
      .subscribe((res) => {
        console.log(res);
      });
  }
}
