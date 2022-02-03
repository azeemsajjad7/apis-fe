import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  templateUrl: 'surah.component.html',
})
export class SurahComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService,
    private fb: FormBuilder
  ) {
    this.activatedRoute.params.subscribe((res) => {
      this.chapter = res['chapter'];
    });
  }

  chapter: any;
  languageList: any = [];

  translation: FormGroup;

  ngOnInit() {
    this.translation = this.fb.group({
      to: null,
      from: null,
    });

    this.generalService.loaderEvent.next(true);
    this.generalService.callApi('get', 'quran/languages').subscribe(
      (res) => {
        if (res.success) {
          this.generalService.loaderEvent.next(false);
          for (let item in res.result) {
            let obj: any = {
              name: res.result[item].name,
              language: res.result[item].language,
              author: res.result[item].author,
            };
            this.languageList.push(obj);
          }
          this.languageList = this.languageList.filter(
            (value: any, index: any, self: any) =>
              index ===
              self.findIndex((t: any) => t.language === value.language)
          );
        } else {
          this.generalService.loaderEvent.next(false);
          this.generalService.alertEvent.next({
            title: 'ERROR!!',
            text: 'Something went wrong!!',
          });
        }
      },
      (err) => {
        this.generalService.loaderEvent.next(false);
        this.generalService.alertEvent.next({
          title: 'ERROR!!',
          text: err.message,
        });
      }
    );

    this.translation.valueChanges.subscribe((res) => {
      if (res.to && res.from) {
        console.log(res);
      }
    });
  }
}
