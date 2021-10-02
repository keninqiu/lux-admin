import { Component, OnInit } from '@angular/core';
import { Homepage } from 'app/interfaces/homepage.interface';
import { HomepageService } from 'app/services/homepage.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'homepage-experience-add',
  templateUrl: './experience-add.component.html',
  styleUrls: ['./experience-add.component.scss']
})
export class ExperienceAddComponent implements OnInit {
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
        if(homepage && homepage.experience) {
          this.title = homepage.experience.title;
          this.subtitle = homepage.experience.subtitle;
          this.actionText = homepage.experience.actionText;
          this.actionLink = homepage.experience.actionLink;
        }

      }
    );
  }

  save() {
    console.log('saving');
    const data = {
      experience: {
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
