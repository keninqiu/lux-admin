import { Component, OnInit } from '@angular/core';
import { Homepage } from 'app/interfaces/homepage.interface';
import { HomepageService } from 'app/services/homepage.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'homepage-salary-add-detail-add',
  templateUrl: './detail-add.component.html',
  styleUrls: ['./detail-add.component.scss']
})
export class SalaryAddDetailAddComponent implements OnInit {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastrServ: NbToastrService,
    private homepageServ: HomepageService) { }

  ngOnInit(): void {
    this.homepageServ.getLatest().subscribe(
      (homepage: Homepage) => {
        this.route.paramMap.subscribe( paramMap => {
          this.id = paramMap.get('id');
          if(homepage && homepage.salary && homepage.salary.details) {
            for(let i = 0; i < homepage.salary.details.length; i++) {
              const detail = homepage.salary.details[i];
              if(detail._id == this.id) {
                this.title = detail.title;
                this.subtitle = detail.subtitle;
                this.content = detail.content;
              }
            }

          }
        }); 
      }
    );
  }

  save() {
    const data = {
      title: this.title,
      subtitle: this.subtitle,
      content: this.content
    };
    if(this.id) {
      this.homepageServ.updateSalaryDetail(this.id, data).subscribe(
        (homepage: Homepage) => {
          console.log('success');
          this.toastrServ.success('修改成功');
          this.router.navigate(['/pages/homepage/salary/add/details']);
        }
      );
    } else {
      this.homepageServ.addSalaryDetail(data).subscribe(
        (homepage: Homepage) => {
          console.log('success');
          this.toastrServ.success('新增成功');
          this.router.navigate(['/pages/homepage/salary/add/details']);
        }
      );      
    }

  }  
}
