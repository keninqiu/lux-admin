import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { Country } from '../../../interfaces/country.interface';
import { CountryService } from '../../../services/country.service';

@Component({
  selector: 'ngx-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent {
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
      name: {
        title: '名称',
        type: 'string',
      },
      url: {
        title: '链接',
        type: 'string',
      },
      code: {
        title: '代码',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private route: Router,
    private countryServ: CountryService) {
    this.countryServ.getAll().subscribe(
      (countries: Country[]) => {
        this.count = countries.length;
        this.source.load(countries);
      }
    );
  }

  onEdit(event): void {
    console.log('onEdit, event=', event);
    const id = event.data._id;
    this.route.navigate(['pages/basic/country/' + id + '/edit']);
  }

  onCreate(event): void {
    console.log('create');
    this.route.navigate(['pages/basic/country/add']);
  }

  onDelete(event): void {
    if (window.confirm('确定删除吗?')) {
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
