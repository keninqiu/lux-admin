import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { City } from '../../../interfaces/city.interface';
import { CityService } from '../../../services/city.service';
import { State } from '../../../interfaces/state.interface';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'ngx-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  totalCount: number;
  pageSize = 30;
  currentPage = 1;
  showPerPage = 10;
  states: any;
  settings: any;


  source: LocalDataSource = new LocalDataSource();

  constructor(
    private route: Router,
    private stateServ: StateService,
    private cityServ: CityService) {
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
              if(cell) {
                return cell.zh;
              }
              return '';
            }
          },
          url: {
            title: '链接',
            type: 'string',
          },
          state: {
            title: '省/州',
            type: 'html',
            valuePrepareFunction: (cell, row) => { 
              return cell.name
            }
          },
        },
      };

    this.cityServ.getCount().subscribe(
      (count: number) => {
        this.totalCount = count;
      }
    );
  }

  ngOnInit() {
    this.initData();
    this.initOnChagedData();
  }

  initData(){
    this.source = new LocalDataSource();
    this.cityServ.getCities(this.currentPage, this.pageSize).subscribe( (result: City[]) => {
      if(!result){
        return;
      }
      this.source.load(result);
    }
    )
  }


  initOnChagedData(){
    this.source.onChanged().subscribe((change) => {
      if (change.action === 'page') {
        this.pageChange(change.paging.page);
      }
    });
  }

  pageChange(pageIndex) {
    var getNew = pageIndex * this.showPerPage;
    if( getNew >= this.source.count() && getNew < this.totalCount){
      this.currentPage = this.currentPage + 1;
      this.cityServ.getCities(this.currentPage, this.pageSize).subscribe( (result: City[]) => {
        if(!result){
          return;
        }
        result.forEach(element => {
          this.source.add(element);
        });
      })
    }
  }

  onEdit(event): void {
    console.log('onEdit, event=', event);
    const id = event.data._id;
    this.route.navigate(['pages/basic/city/' + id + '/edit']);
  }

  onCreate(event): void {
    console.log('create');
    this.route.navigate(['pages/basic/city/add']);
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
