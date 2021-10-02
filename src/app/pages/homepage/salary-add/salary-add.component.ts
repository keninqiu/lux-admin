import { Component, OnInit } from '@angular/core';
import { Homepage } from 'app/interfaces/homepage.interface';
import { HomepageService } from 'app/services/homepage.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'homepage-salary-add',
  templateUrl: './salary-add.component.html',
  styleUrls: ['./salary-add.component.scss']
})
export class SalaryAddComponent implements OnInit {
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
        if(homepage && homepage.salary) {
          this.title = homepage.salary.title;
          this.subtitle = homepage.salary.subtitle;
          this.actionText = homepage.salary.actionText;
          this.actionLink = homepage.salary.actionLink;
        }

      }
    );
  }

  save() {
    const data = {
      change: {
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
