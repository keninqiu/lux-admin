import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Country } from '../../../interfaces/country.interface';
import { CountryService } from '../../../services/country.service';

@Component({
  selector: 'ngx-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent {


  settings = {
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
        title: 'Name',
        type: 'string',
      },
      code: {
        title: 'Code',
        type: 'string',
      },
      currencyCode: {
        title: 'Currency code',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private countryServ: CountryService) {
    this.countryServ.getAll().subscribe(
      (countries: Country[]) => {
        this.source.load(countries);
      }
    );
  }

  onCreateConfirm(event): void {
    console.log('event in onCreateConfirm=', event);
    const data = event.newData;
    this.countryServ.add(data).subscribe(
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
    console.log('event in onEditConfirm=', event);
    const data = event.newData;
    const id = data._id;
   
    this.countryServ.update(id, data).subscribe(
      (ret: any) => {
        console.log('ret in update country = ', ret);
        event.confirm.resolve();
      },
      (error: any) => {
        event.confirm.reject();
      }
    );
    
  }

  onDeleteConfirm(event): void {
    console.log('event in onDeleteConfirm=', event);
    if (window.confirm('Are you sure you want to delete?')) {
      const data = event.data;
      const id = data._id;
      this.countryServ.deleteMany([id]).subscribe(
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
