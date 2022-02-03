import { Component, OnInit, ViewChild } from '@angular/core';
import { Alert, GeneralService } from 'src/app/services/general.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.template.html',
  styleUrls: ['alert.template.scss'],
})
export class AlertTemplate implements OnInit {
  constructor(
    private generalService: GeneralService,
    private dialog: MatDialog
  ) {}

  alert: Alert;
  @ViewChild('alertTemplate')
  alertTemplate: any;
  alertTemplateRef: any;

  ngOnInit() {
    this.generalService.alertEvent.subscribe((alert: Alert) => {
      this.alert = alert;
      this.alertTemplateRef = this.dialog.open(this.alertTemplate, {
        disableClose: true,
        minWidth: '350px',
      });
    });
  }

  ok() {
    this.alert.onOk && this.alert.onOk();
    this.alertTemplateRef.close();
  }
}
