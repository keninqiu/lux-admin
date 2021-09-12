import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { City } from '../../../interfaces/city.interface';
import { CityService } from '../../../services/city.service';
import { State } from '../../../interfaces/state.interface';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'ngx-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent {

  states: any;
  settings: any;


  source: LocalDataSource = new LocalDataSource();

  constructor(private stateServ: StateService,private cityServ: CityService) {


    this.stateServ.getAll().subscribe(
      (states: State[]) => {
        this.states = states;
        const stateList = states.map(item => {return {value: item._id, title: item.name};});
        console.log('stateList==', stateList);
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
            state: {
              title: '州/省',
              type: 'html',
              valuePrepareFunction: (cell, row) => { 
                const theState = this.states.filter(item => item._id == cell);
                if(theState && theState.length > 0) {
                  return theState[0].name;
                }
                return cell;
              },
              editor: {
                type: 'list',
                config: {
                  list: stateList,
                },
              },
            },
          },
        };


    
      }
    );


    this.cityServ.getAll().subscribe(
      (cities: City[]) => {
        this.source.load(cities);
      }
    );
  }

  onCreateConfirm(event): void {
    const data = event.newData;
    this.cityServ.add(data).subscribe(
      (ret: any) => {
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
   
    this.cityServ.update(id, data).subscribe(
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
