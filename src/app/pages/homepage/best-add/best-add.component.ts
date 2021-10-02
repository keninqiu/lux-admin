import { Component, OnInit } from '@angular/core';
import { Homepage } from 'app/interfaces/homepage.interface';
import { HomepageService } from 'app/services/homepage.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'homepage-best-add',
  templateUrl: './best-add.component.html',
  styleUrls: ['./best-add.component.scss']
})
export class BestAddComponent implements OnInit {
  title: string;
  subtitle: string;
  actionText: string;
  actionLink: string;
  constructor(
    private toastrServ: NbToastrService,
    private homepageServ: HomepageService) { }

  ngOnInit(): void {
    this.homepageServ.getLatest().subscribe(
      (homepage: Homepage) => {
        if(homepage && homepage.best) {
          this.title = homepage.best.title;
          this.subtitle = homepage.best.subtitle;
          this.actionText = homepage.best.actionText;
          this.actionLink = homepage.best.actionLink;
        }

      }
    );
  }

  save() {
    console.log('saving');
    const data = {
      best: {
        title: this.title,
        subtitle: this.subtitle,
        actionText: this.actionText,
        actionLink: this.actionLink
      }
    };
    this.homepageServ.updateLatest(data).subscribe(
      (homepage: Homepage) => {
        this.toastrServ.success('修改成功');
      }
    );

  }  
}
