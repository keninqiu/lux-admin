import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Industry } from '../../../interfaces/industry.interface';
import { IndustryService } from '../../../services/industry.service';
import { CategoryService } from 'app/services/category.service';
import { Category } from 'app/interfaces/category.interface';

@Component({
  selector: 'industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.scss']
})
export class IndustriesComponent {

  categories: any;
  settings: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private categoryServ: CategoryService,
    private industryServ: IndustryService) {

    this.categoryServ.getAllByType('Industry').subscribe(
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
            category: {
              title: '类别',
              type: 'html',
              valuePrepareFunction: (cell, row) => { 
                
                const theCategory = this.categories.filter(item => item._id == cell);
                if(theCategory && theCategory.length > 0) {
                  return theCategory[0].name;
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
    this.industryServ.getAll().subscribe(
      (degrees: Industry[]) => {
        this.source.load(degrees);
      }
    );
  }

  onCreateConfirm(event): void {
    const data = event.newData;
    this.industryServ.add(data).subscribe(
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
   
    this.industryServ.update(id, data).subscribe(
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
      this.industryServ.deleteMany([id]).subscribe(
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
