import { Component, ViewChild } from '@angular/core';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';

import { School } from '../../../interfaces/school.interface';
import { SchoolService } from '../../../services/school.service';
import { CategoryService } from 'app/services/category.service';
import { Category } from 'app/interfaces/category.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent {
  count: number;
  categories: any;
  cities: any;
  settings: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private route: Router,
    private schoolServ: SchoolService, 
    private categoryServ: CategoryService) {

    this.categoryServ.getAllByType('School').subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        const categoryList = categories.map(item => {return {value: item._id, title: item.name};});

        this.settings = {
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
          mode: 'external',
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


    this.schoolServ.getAll().subscribe(
      (schools: School[]) => {
        this.count = schools.length;
        this.source.load(schools);
      }
    );
  }


  onEdit(event): void {
    console.log('onEdit, event=', event);
    const id = event.data._id;
    this.route.navigate(['pages/basic/school/' + id + '/edit']);
  }

  onCreate(event): void {
    console.log('create');
    this.route.navigate(['pages/basic/school/add']);
  }

  /*
  onCreateConfirm(event): void {
    const data = event.newData;
    this.schoolServ.add(data).subscribe(
      (ret: any) => {
        console.log('ret in add country = ', ret);
        event.confirm.resolve();
      },
      (error: any) => {
        event.confirm.reject();
      }
    );
  }

  onEditConfirm(event): void {
    const data = event.newData;
    const id = data._id;
   
    this.schoolServ.update(id, data).subscribe(
      (ret: any) => {
        const newData = event.newData;
        event.confirm.resolve(newData);
      },
      (error: any) => {
        event.confirm.reject();
      }
    );
    
  }
  */
  onDelete(event): void {
    console.log('event for delete=', event);
    if (window.confirm('确定删除吗?')) {
      const data = event.data;
      const id = data._id;
      console.log('id=', id);
      this.schoolServ.deleteMany([id]).subscribe(
        (ret: any) => {
          event.confirm.resolve();
        },
        (error: any) => {
          event.confirm.reject();
        }
      );
    }
  }
}
