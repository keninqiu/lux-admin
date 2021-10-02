import { Component, OnInit } from '@angular/core';
import { Homepage } from 'app/interfaces/homepage.interface';
import { HomepageService } from 'app/services/homepage.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'homepage-change-add',
  templateUrl: './change-add.component.html',
  styleUrls: ['./change-add.component.scss']
})
export class ChangeAddComponent implements OnInit {
  title: string;
  subtitle: string;
  content: string;
  constructor(
    private toastrServ: NbToastrService,
    private homepageServ: HomepageService) { }

  ngOnInit(): void {
    this.homepageServ.getLatest().subscribe(
      (homepage: Homepage) => {
        if(homepage && homepage.change) {
          this.title = homepage.change.title;
          this.subtitle = homepage.change.subtitle;
          this.content = homepage.change.content;
        }

      }
    );
  }

  save() {
    console.log('saving');
    const data = {
      change: {
        title: this.title,
        subtitle: this.subtitle,
        content: this.content
      }
    };
    this.homepageServ.updateLatest(data).subscribe(
      (homepage: Homepage) => {
        this.toastrServ.success('修改成功');
      }
    );

  }  
}
