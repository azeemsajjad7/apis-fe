import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurd } from './auth.guard';
import { AllCountryCovidComponent } from './views/covid/all-country/all-country.component';
import { GoogleSpreadSheetComponent } from './views/google/google-spreadsheet.component';
import { LoginComponent } from './views/login/login.component';
import { FlightComponent } from './views/flight/flight.component';
import { QuranComponent } from './views/quran/quran.component';
import { SurahComponent } from './views/quran/surah/surah.component';
import { SignupComponent } from './views/signup/signup.component';
import { UsersComponent } from './views/users/users.component';
import { TrainComponent } from './views/trains/train.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { canActivate: [AuthGaurd], path: 'users', component: UsersComponent },
  {
    canActivate: [AuthGaurd],
    path: 'covid',
    component: AllCountryCovidComponent,
  },
  {
    canActivate: [AuthGaurd],
    path: 'google-spreadsheet',
    component: GoogleSpreadSheetComponent,
  },
  { canActivate: [AuthGaurd], path: 'quran', component: QuranComponent },
  {
    canActivate: [AuthGaurd],
    path: 'quran/:chapter',
    component: SurahComponent,
  },
  { canActivate: [AuthGaurd], path: 'flight', component: FlightComponent },
  { canActivate: [AuthGaurd], path: 'train', component: TrainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
