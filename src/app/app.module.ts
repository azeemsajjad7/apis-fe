import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertTemplate } from './template/alert/alert.template';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmTemplate } from './template/confirm/confirm.template';
import { LoaderTemplate } from './template/loader/loader.template';
import { SignupComponent } from './views/signup/signup.component';
import { UsersComponent } from './views/users/users.component';
import { RequestInterceptor } from './services/request.interceptor';
import { AllCountryCovidComponent } from './views/covid/all-country/all-country.component';
import { CovidHistoryComponent } from './views/covid/history/covid-history.component';
import { AuthGaurd } from './auth.guard';
import { GoogleSpreadSheetComponent } from './views/google/google-spreadsheet.component';
import { QuranComponent } from './views/quran/quran.component';
import { SurahComponent } from './views/quran/surah/surah.component';
import { FlightComponent } from './views/flight/flight.component';
import { FlightDetailsComponent } from './views/flight/details/flight-details.component';
import { TrainComponent } from './views/trains/train.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertTemplate,
    ConfirmTemplate,
    LoaderTemplate,
    LoginComponent,
    SignupComponent,
    UsersComponent,
    AllCountryCovidComponent,
    CovidHistoryComponent,
    GoogleSpreadSheetComponent,
    QuranComponent,
    SurahComponent,
    FlightComponent,
    FlightDetailsComponent,
    TrainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
  ],
  providers: [
    AuthGaurd,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertTemplate,
    ConfirmTemplate,
    CovidHistoryComponent,
    FlightDetailsComponent,
  ],
})
export class AppModule {}
