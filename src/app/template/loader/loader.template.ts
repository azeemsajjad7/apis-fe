import { Component } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-loader',
  templateUrl: 'loader.template.html',
  styleUrls: ['loader.template.scss'],
})
export class LoaderTemplate {
  showLoader = false;
  constructor(private generalService: GeneralService) {}
  ngOnInit() {
    this.generalService.loaderEvent.subscribe((res: boolean) => {
      this.showLoader = res;
    });
  }
}
