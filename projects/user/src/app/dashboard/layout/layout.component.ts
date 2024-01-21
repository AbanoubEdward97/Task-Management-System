import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  lang:any="en";
    constructor(private translate:TranslateService) {  
      this.lang=this.translate.currentLang;
    }
  
    ngOnInit(): void {
    }
    changeLang(){
      if(this.lang =="en"){
        localStorage.setItem("lang","ar");
      }else{
        localStorage.setItem("lang","en");
      }
      window.location.reload();
    }
  }
