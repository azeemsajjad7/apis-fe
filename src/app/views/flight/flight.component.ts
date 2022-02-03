import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { map, startWith } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { FlightDetailsComponent } from './details/flight-details.component';

@Component({
  templateUrl: 'flight.component.html',
  styleUrls: ['flight.component.scss'],
})
export class FlightComponent implements OnInit {
  constructor(
    private generalService: GeneralService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  dataSource: any;
  filteredDataSource: any = [];
  imageBaseUrl: any;

  getFareForm: FormGroup;
  date = new Date().toISOString().split('T')[0];

  airport: Airport[];
  filteredAirportFrom: any;
  filteredAirportTo: any;

  ngOnInit() {
    this.getFareForm = this.fb.group({
      from: [null, Validators.required],
      to: [null, Validators.required],
      adult: 1,
      children: 0,
      infants: 0,
      class: 'E',
      departure: [null, Validators.required],
    });

    this.filteredAirportFrom = this.getFareForm.get('from')?.valueChanges.pipe(
      startWith(''),
      map((airport) =>
        airport ? this._filterAiport(airport) : this.airport?.slice()
      )
    );

    this.filteredAirportTo = this.getFareForm.get('to')?.valueChanges.pipe(
      startWith(''),
      map((airport) =>
        airport ? this._filterAiport(airport) : this.airport?.slice()
      )
    );

    this.getFareForm.get('from')?.valueChanges.subscribe((res) => {
      if (res != '') {
        this.generalService
          .callApi('get', 'travel/get-airports/' + res)
          .subscribe((resp) => {
            this.airport = resp.result.body.airports.map((ele: any) => {
              return {
                city: ele.city,
                country: ele.country,
                airport_name: ele.airport,
                airport_code: ele.iata,
              };
            });
          });
      }
    });

    this.getFareForm.get('to')?.valueChanges.subscribe((res) => {
      if (res != '') {
        this.generalService
          .callApi('get', 'travel/get-airports/' + res)
          .subscribe((resp) => {
            this.airport = resp.result.body.airports.map((ele: any) => {
              return {
                city: ele.city,
                country: ele.country,
                airport_name: ele.airport,
                airport_code: ele.iata,
              };
            });
          });
      }
    });
  }

  getFareFormSubmit() {
    this.generalService.loaderEvent.next(true);
    this.generalService
      .callApi('post', 'travel/get-fare', {
        adult: this.getFareForm.value.adult,
        children: this.getFareForm.value.children,
        infants: this.getFareForm.value.infants,
        class: this.getFareForm.value.class,
        origin: this.getFareForm.value.from,
        destination: this.getFareForm.value.to,
        departureDate: this.getFareForm.value.departure
          .toISOString()
          .split('T')[0]
          .replace(/-/g, ''),
      })
      .subscribe((res) => {
        this.generalService.loaderEvent.next(false);
        this.dataSource = res.result.body.onwardflights.flights;
        this.imageBaseUrl = res.result.body.airline_logo_info.base_url;
        this.dataSource.map((ele: any) => {
          let layoverText: any = '';
          if (ele.hops.length > 1) {
            ele.hops.forEach((ele: any, index: number) => {
              if (index > 0) {
                layoverText =
                  layoverText +
                  ele.layover +
                  ' layover at ' +
                  ele.origin_city +
                  '\n';
              }
            });
          }
          return (
            (ele['flightImageUrl'] =
              this.imageBaseUrl + ele.airlineCode + '.png'),
            (ele['layoverText'] = layoverText)
          );
        });
        this.filteredDataSource = this.dataSource;
      });
  }

  getDetails(item: any) {
    this.dialog.open(FlightDetailsComponent, {
      data: item,
      panelClass: 'dialog-80',
    });
  }

  toggle(event: MatCheckboxChange) {
    if (event.checked) {
      this.filteredDataSource = this.dataSource.filter((ele: any) => {
        return ele.hops.length == 1;
      });
    } else {
      this.filteredDataSource = this.dataSource.filter((ele: any) => {
        return ele;
      });
    }
  }

  private _filterAiport(value: string): Airport[] {
    const filterValue = value.toLowerCase();

    return this.airport?.filter((airport) =>
      airport.city.toLowerCase().includes(filterValue)
    );
  }
}

export interface Airport {
  filter(arg0: (airport: any) => any): Airport[];
  city: string;
  country: string;
  airport_name: string;
  airport_code: string;
}
