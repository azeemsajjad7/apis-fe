import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Alert,
  Confirm,
  GeneralService,
} from 'src/app/services/general.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: 'confirm.template.html',
})
export class ConfirmTemplate implements OnInit {
  constructor(
    private generalService: GeneralService,
    private dialog: MatDialog
  ) {}

  confirm: Confirm;
  @ViewChild('confirmTemplate')
  confirmTemplate: any;
  confirmTemplateRef: any;

  ngOnInit() {
    this.generalService.confirmEvent.subscribe((confirm: Confirm) => {
      this.confirm = confirm;
      this.confirmTemplateRef = this.dialog.open(this.confirmTemplate, {
        disableClose: true,
        minWidth: '350px',
      });
    });
  }

  ok() {
    this.confirm.onOk && this.confirm.onOk();
    this.confirmTemplateRef.close();
  }

  cancel() {
    this.confirm.onCancel && this.confirm.onCancel();
    this.confirmTemplateRef.close();
  }
}
