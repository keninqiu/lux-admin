import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ViewCell } from 'ng2-smart-table';
import { State } from '../../../interfaces/state.interface';
import { Country } from '../../../interfaces/country.interface';
import { StateService } from '../../../services/state.service';
import { CountryService } from '../../../services/country.service';
import { CustomRenderComponent } from './custom-render.component';


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
        console.log('countries=', countries);
        const countryList = countries.map(item => {return {value: item._id, title: item.name};});
        console.log('this.countries==', this.countries);
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
              editor: {
                type: 'list',
                config: {
                  list: countryList,
                },
              },
              //renderComponent: CustomRenderComponent
              /*
              type: 'custom',
              title: 'Country',
              editor: {
                type: 'list',
                config:
                {
                  list: this.countries
                },
              },
              filter: {
                type: 'list',
                config: {
                  selectText: 'Select country',
                  list: this.countries
                }  
              },
              renderComponent: CustomRenderComponent
              */

            },
          },
        };


        this.stateServ.getAll().subscribe(
          (states: State[]) => {
            const newStates = [];
            for(let i = 0; i < states.length; i++) {
              const state = states[i];
              const newState = {
                _id: state._id,
                name: state.name,
                country: this.countries.filter(country => country._id == state.country)[0].name
              }
              newStates.push(newState);
            }
            this.source.load(newStates);
          }
        );
    
      }
    );



  }

  onCreateConfirm(event): void {
    console.log('event in onCreateConfirm=', event);
    const data = event.newData;
    const theCountry = this.countries.filter(item => item._id == data.country)[0];
    data.country = theCountry._id;
    this.stateServ.add(data).subscribe(
      (ret: any) => {
        console.log('ret in add country = ', ret);
        const newData = event.newData;
        newData.country = this.countries.filter(country => country._id == newData.country)[0].name;
        event.confirm.resolve(newData);
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
   
    this.stateServ.update(id, data).subscribe(
      (ret: any) => {
        console.log('ret in update country = ', ret);
        const newData = event.newData;
        newData.country = this.countries.filter(country => country._id == newData.country)[0].name;
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
