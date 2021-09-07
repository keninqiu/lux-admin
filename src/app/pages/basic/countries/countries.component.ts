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
      iso: {
        title: 'ISO',
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
      }
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
