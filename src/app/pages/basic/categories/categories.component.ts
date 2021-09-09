import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Category } from '../../../interfaces/category.interface';
import { Country } from '../../../interfaces/country.interface';
import { CategoryService } from '../../../services/category.service';
import { CountryService } from '../../../services/country.service';


@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  countries: any;
  settings: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(private categoryServ: CategoryService, private countryServ: CountryService) {

    this.countryServ.getAll().subscribe(
      (countries: Country[]) => {
        this.countries = countries;
        const countryList = countries.map(item => {return {value: item._id, title: item.name};});
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
            type: {
              title: '类型',
              type: 'string'
            },
            country: {
              title: '国家/地区',
              type: 'html',
              valuePrepareFunction: (cell, row) => { 
                const theCountry = this.countries.filter(item => item._id == cell);
                if(theCountry && theCountry.length > 0) {
                  return theCountry[0].name;
                }
                return cell;
              },
              editor: {
                type: 'list',
                config: {
                  list: countryList,
                },
              },
            },
          },
        };



    
      }
    );

    this.categoryServ.getAll().subscribe(
      (categories: Category[]) => {
        this.source.load(categories);
      }
    );

  }

  onCreateConfirm(event): void {
    const data = event.newData;
    this.categoryServ.add(data).subscribe(
      (ret: any) => {
        console.log('ret in add country = ', ret);
        const newData = event.newData;
        event.confirm.resolve(newData);
      },
      (error: any) => {
        event.confirm.reject();
      }
    );
  }

  onEditConfirm(event): void {
    const data = event.newData;
    const id = data._id;
   
    this.categoryServ.update(id, data).subscribe(
      (ret: any) => {
        console.log('ret in update country = ', ret);
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
      this.categoryServ.deleteMany([id]).subscribe(
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
