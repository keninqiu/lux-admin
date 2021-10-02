import { Component, OnInit } from '@angular/core';
import { HomepageService } from 'app/services/homepage.service';
import { NbToastrService } from '@nebular/theme';
import { Homepage, Carousel } from 'app/interfaces/homepage.interface';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
  selector: 'carousels',
  templateUrl: './carousels.component.html',
  styleUrls: ['./carousels.component.scss']
})
export class CarouselsComponent {

  count: number;

  settings = {
    mode: 'external',
    actions: { columnTitle: '操作'},
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      title: {
        title: '标题',
        type: 'string',
      },
      subtitle: {
        title: '标题',
        type: 'string',
      },
      actionText: {
        title: '按钮文本',
        type: 'string',
      },
      actionLink: {
        title: '按钮链接',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private toastrServ: NbToastrService,
    private route: Router,
    private homepageServ: HomepageService) {
    this.homepageServ.getLatest().subscribe(
      (homepage: Homepage) => {
        if(homepage && homepage.carousels) {
          const carousels = homepage.carousels;
          this.count = carousels.length;
          this.source.load(carousels);
        }

      }
    );
  }

  onEdit(event): void {
    const id = event.data._id;
    this.route.navigate(['pages/homepage/carousel/' + id + '/edit']);
  }

  onCreate(event): void {
    this.route.navigate(['pages/homepage/carousel/add']);
  }

  onDelete(event): void {
    if (window.confirm('确定删除吗?')) {
      const data = event.data;
      const id = data._id;
      
      this.homepageServ.deleteCarousel(id).subscribe(
        (ret: any) => {
          this.toastrServ.success('删除成功');
        },
        (error: any) => {
          this.toastrServ.success('删除失败');
        }
      );
      
      
    } 
  }

}
