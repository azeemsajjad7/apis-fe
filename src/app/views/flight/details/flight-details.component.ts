import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  templateUrl: 'flight-details.component.html',
  styleUrls: ['flight-details.component.scss'],
})
export class FlightDetailsComponent implements OnInit {
  constructor(
    private generalService: GeneralService,
    public dialogRef: MatDialogRef<FlightDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
}
