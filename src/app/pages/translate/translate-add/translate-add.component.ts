import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'app/services/translate.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { Translate } from 'app/interfaces/translate.interface';
import { Location } from '@angular/common'

@Component({
  selector: 'translate-add',
  templateUrl: './translate-add.component.html',
  styleUrls: ['./translate-add.component.scss']
})
export class TranslateAddComponent implements OnInit {
  id: string;
  en: string;
  zh: string;
  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private toastrServ: NbToastrService,
    private translateServ: TranslateService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.id = paramMap.get('id');
      this.translateServ.get(this.id).subscribe(
        (translate: Translate) => {
          this.en = translate.en;
          this.zh = translate.zh;
        });
      });
  }

  save() {
    const data = {
      zh: this.zh
    };
    if(this.id) {
      this.translateServ.update(this.id, data).subscribe(
        (translate: Translate) => {
          console.log('success');
          this.toastrServ.success('修改成功');
          this.location.back();
          //this.router.navigate(['/pages/translate/countries']);
        }
      );
    }

  }  
}
