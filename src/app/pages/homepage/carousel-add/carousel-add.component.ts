import { Component, OnInit } from '@angular/core';
import { Homepage } from 'app/interfaces/homepage.interface';
import { HomepageService } from 'app/services/homepage.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'carousel-add',
  templateUrl: './carousel-add.component.html',
  styleUrls: ['./carousel-add.component.scss']
})
export class CarouselAddComponent implements OnInit {

  id: string;
  title: string;
  subtitle: string;
  actionText: string;
  actionLink: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastrServ: NbToastrService,
    private homepageServ: HomepageService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.id = paramMap.get('id');
      this.homepageServ.getLatest().subscribe(
        (homepage: Homepage) => {
          const carousels = homepage.carousels;
          for(let i = 0; i < carousels.length; i++) {
            const carousel = carousels[i];
            if(carousel._id == this.id) {
              this.title = carousel.title;
              this.subtitle = carousel.subtitle;
              this.actionText = carousel.actionText;
              this.actionLink = carousel.actionLink;
            }
          }
        });
      });
  }

  save() {
    const data = {
      title: this.title,
      subtitle: this.subtitle,
      actionText: this.actionText,
      actionLink: this.actionLink
    };
    if(this.id) {
      this.homepageServ.updateCarousel(this.id, data).subscribe(
        (homepage: Homepage) => {
          console.log('success');
          this.toastrServ.success('修改成功');
          this.router.navigate(['/pages/homepage/carousels']);
        }
      );
    } else {
      this.homepageServ.addCarousel(data).subscribe(
        (homepage: Homepage) => {
          console.log('success');
          this.toastrServ.success('新增成功');
          this.router.navigate(['/pages/homepage/carousels']);
        }
      );      
    }

  }  

}
