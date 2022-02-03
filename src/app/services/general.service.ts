import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class GeneralService {
  constructor(private http: HttpClient) {}

  alertEvent: Subject<Alert> = new Subject<Alert>();
  confirmEvent: Subject<Confirm> = new Subject<Confirm>();
  loaderEvent: Subject<boolean> = new Subject<boolean>();

  callApi(method: string, url: string, data: any = null): Observable<any> {
    if (method.toLowerCase() == 'get') {
      return this.http.get<any>(environment.api_prefix + url);
    } else {
      // @ts-ignore: Unreachable code error
      return this.http[method]<any>(environment.api_prefix + url, data);
    }
  }

  isUserLogged() {
    return localStorage.getItem(environment.token);
  }
}

export interface Alert {
  title?: string;
  text: string;
  onOk?: Function;
}

export interface Confirm {
  title?: string;
  text: string;
  onOk?: Function;
  onCancel?: Function;
}
