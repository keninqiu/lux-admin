import { Component, OnInit } from '@angular/core';
import { Homepage } from 'app/interfaces/homepage.interface';
import { HomepageService } from 'app/services/homepage.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'homepage-adv-add',
  templateUrl: './adv-add.component.html',
  styleUrls: ['./adv-add.component.scss']
})
export class AdvAddComponent implements OnInit {
  text: string;
  url: string;
  constructor(
    private toastrServ: NbToastrService,
    private homepageServ: HomepageService) { }

  ngOnInit(): void {
    this.homepageServ.getLatest().subscribe(
      (homepage: Homepage) => {
        if(homepage && homepage.adv) {
          this.text = homepage.adv.text;
          this.url = homepage.adv.url;
        }

      }
    );
  }

  save() {
    console.log('saving');
    const data = {
      adv: {
        text: this.text,
        url: this.url
      }
    };
    this.homepageServ.updateLatest(data).subscribe(
      (homepage: Homepage) => {
        this.toastrServ.success('修改成功');
      }
    );

  }  
}
