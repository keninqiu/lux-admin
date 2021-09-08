import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { State } from '../../../interfaces/state.interface';
import { Country } from '../../../interfaces/country.interface';
import { StateService } from '../../../services/state.service';
import { CountryService } from '../../../services/country.service';


@Component({
  selector: 'states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent {

  countries: any;
  settings: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(private stateServ: StateService, private countryServ: CountryService) {

    this.countryServ.getAll().subscribe(
      (countries: Country[]) => {
        this.countries = countries;
        const countryList = countries.map(item => {return {value: item._id, title: item.name};});
        this.settings = {
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
            country: {
              title: 'Country',
              type: 'html',
              valuePrepareFunction: (cell, row) => { 
                return this.countries.filter(item => item._id == cell)[0].name;
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
        this.source.load(states);
      }
    );

  }

  onCreateConfirm(event): void {
    console.log('event in onCreateConfirm=', event);
    const data = event.newData;
    this.stateServ.add(data).subscribe(
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

  onEdit(event): void {
    console.log('event.=', event);
  }
  onEditConfirm(event): void {
    console.log('event in onEditConfirm=', event);
    const data = event.newData;
    const id = data._id;
   
    this.stateServ.update(id, data).subscribe(
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
    if (window.confirm('Are you sure you want to delete?')) {
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
