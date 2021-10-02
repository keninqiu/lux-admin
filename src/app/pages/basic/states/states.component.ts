import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { State } from '../../../interfaces/state.interface';
import { Country } from '../../../interfaces/country.interface';
import { StateService } from '../../../services/state.service';
import { CountryService } from '../../../services/country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent {
  count: number;
  countries: any;
  settings: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private route: Router,
    private stateServ: StateService, 
    private countryServ: CountryService) {

    this.countryServ.getAll().subscribe(
      (countries: Country[]) => {
        this.countries = countries;
        const countryList = countries.map(item => {return {value: item._id, title: item.name};});
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
            namet: {
              title: '中文名称',
              type: 'html',
              valuePrepareFunction: (cell, row) => { 
                return cell.zh;
              }
            },
            url: {
              title: '链接',
              type: 'string',
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

    this.stateServ.getAll().subscribe(
      (states: State[]) => {
        this.count = states.length;
        this.source.load(states);
      }
    );

  }

  onEdit(event): void {
    console.log('onEdit, event=', event);
    const id = event.data._id;
    this.route.navigate(['pages/basic/state/' + id + '/edit']);
  }

  onCreate(event): void {
    console.log('create');
    this.route.navigate(['pages/basic/state/add']);
  }

  onDelete(event): void {
    if (window.confirm('确定删除吗?')) {
      const data = event.data;
      const id = data._id;
      this.stateServ.deleteMany([id]).subscribe(
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
