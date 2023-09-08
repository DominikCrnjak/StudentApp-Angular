import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
  constructor(translate: TranslateService) {
    translate.setDefaultLang('hr');
    translate.use('hr');
  }

  ngOnInit(): void {
  }

}
