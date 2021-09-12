import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Degree } from '../../../interfaces/degree.interface';
import { DegreeService } from '../../../services/degree.service';
import { CategoryService } from 'app/services/category.service';
import { Category } from 'app/interfaces/category.interface';

@Component({
  selector: 'degrees',
  templateUrl: './degrees.component.html',
  styleUrls: ['./degrees.component.scss']
})
export class DegreesComponent {
  categories: any;

  settings: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private categoryServ: CategoryService,
    private degreeServ: DegreeService) {

    this.categoryServ.getAllByType('Degree').subscribe(
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
      });

    this.degreeServ.getAll().subscribe(
      (degrees: Degree[]) => {
        this.source.load(degrees);
      }
    );
  }

  onCreateConfirm(event): void {
    const data = event.newData;
    this.degreeServ.add(data).subscribe(
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
   
    console.log('degree update');
    this.degreeServ.update(id, data).subscribe(
      (ret: any) => {
        const newData = event.newData;
        event.confirm.resolve(newData);
      },
      (error: any) => {
        event.confirm.reject();
      }
    );
    
  }

  onDeleteConfirm(event): void {
    if (window.confirm('确定删除吗?')) {
      const data = event.data;
      const id = data._id;
      this.degreeServ.deleteMany([id]).subscribe(
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
