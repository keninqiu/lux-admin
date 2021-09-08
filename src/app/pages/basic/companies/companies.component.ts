import { Component } from '@angular/core';
import { CityService } from 'app/services/city.service';
import { LocalDataSource } from 'ng2-smart-table';

import { Company } from '../../../interfaces/company.interface';
import { CompanyService } from '../../../services/company.service';
import { City } from '../../../interfaces/city.interface';

@Component({
  selector: 'companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent {

  cities: any;
  settings: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(private companyServ: CompanyService, private cityServ: CityService) {


    this.cityServ.getAll().subscribe(
      (cities: City[]) => {
        this.cities = cities;
        const cityList = cities.map(item => {return {value: item._id, title: item.name};});

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
            city: {
              title: '城市',
              type: 'html',
              valuePrepareFunction: (cell, row) => { 
                const theState = this.cities.filter(item => item._id == cell);
                if(theState && theState.length > 0) {
                  return theState[0].name;
                }
                return cell;
              },
              editor: {
                type: 'list',
                config: {
                  list: cityList,
                },
              },
            },
          },
        };


    
      }
    );    


    this.companyServ.getAll().subscribe(
      (certifications: Company[]) => {
        this.source.load(certifications);
      }
    );
  }

  onCreateConfirm(event): void {
    console.log('event in onCreateConfirm=', event);
    const data = event.newData;
    this.companyServ.add(data).subscribe(
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
   
    this.companyServ.update(id, data).subscribe(
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
      this.companyServ.deleteMany([id]).subscribe(
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
