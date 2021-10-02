import { Component, OnInit } from '@angular/core';
import { HomepageService } from 'app/services/homepage.service';
import { NbToastrService } from '@nebular/theme';
import { Homepage, Carousel } from 'app/interfaces/homepage.interface';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
  selector: 'homepage-salary-add-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class SalaryAddDetailsComponent {

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
      content: {
        title: '内容',
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
        console.log('homepage=', homepage);
        if(homepage && homepage.salary) {
          console.log('salary=' + homepage.salary);
          const details = homepage.salary.details;
          this.count = details.length;
          this.source.load(details);
        }

      }
    );
  }

  onEdit(event): void {
    const id = event.data._id;
    this.route.navigate(['pages/homepage/salary/add/detail/' + id + '/edit']);
  }

  onCreate(event): void {
    this.route.navigate(['pages/homepage/salary/add/detail/add']);
  }

  onDelete(event): void {
    if (window.confirm('确定删除吗?')) {
      const data = event.data;
      const id = data._id;
      
      this.homepageServ.deleteSalaryDetail(id).subscribe(
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
