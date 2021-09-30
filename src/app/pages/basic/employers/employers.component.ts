import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { Employer } from '../../../interfaces/employer.interface';
import { EmployerService } from '../../../services/employer.service';
import { CategoryService } from 'app/services/category.service';
import { Category } from 'app/interfaces/category.interface';

@Component({
  selector: 'employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.scss']
})
export class EmployersComponent {
  count: number;
  categories: any;
  cities: any;
  settings: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private route: Router,
    private employerServ: EmployerService, 
    private categoryServ: CategoryService) {


    this.categoryServ.getAllByType('Employer').subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        const categoryList = categories.map(item => {return {value: item._id, title: item.name};});

        this.settings = {
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
            name: {
              title: '名称',
              type: 'string',
            },
            url: {
              title: '链接',
              type: 'string',
            },
            category: {
              title: '类别',
              type: 'html',
              valuePrepareFunction: (cell, row) => { 
                
                const theCategory = this.categories.filter(item => item._id == cell);
                if(theCategory && theCategory.length > 0) {
                  const item = theCategory[0];
                  return item.country.name + '-' + item.name;
                }
              
                return cell;
              },
              editor: {
                type: 'list',
                config: {
                  list: categoryList,
                },
              },
            },
          },
        };


    
      }
    );    


    this.employerServ.getAll().subscribe(
      (employers: Employer[]) => {
        this.count = employers.length;
        this.source.load(employers);
      }
    );
  }

  onEdit(event): void {
    console.log('onEdit, event=', event);
    const id = event.data._id;
    this.route.navigate(['pages/basic/employer/' + id + '/edit']);
  }

  onCreate(event): void {
    console.log('create');
    this.route.navigate(['pages/basic/employer/add']);
  }

  onDelete(event): void {
    if (window.confirm('确定删除吗?')) {
      const data = event.data;
      const id = data._id;
      this.employerServ.deleteMany([id]).subscribe(
        (ret: any) => {
          event.confirm.resolve();
        },
        (error: any) => {
          event.confirm.reject();
        }
      );
    } else {
      event.confirm.reject();
    }
}

}
