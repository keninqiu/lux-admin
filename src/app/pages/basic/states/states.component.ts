import { Component, OnInit } from '@angular/core';
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
export class StatesComponent implements OnInit {
  totalCount: number;
  pageSize = 30;
  currentPage = 1;
  showPerPage = 10;
  countries: any;
  settings: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private route: Router,
    private stateServ: StateService, 
    private countryServ: CountryService) {

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
              if(cell) {
                return cell.zh;
              }
              return '';
            }
          },
        },
      };

    this.stateServ.getCount().subscribe(
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
    this.stateServ.getStates(this.currentPage, this.pageSize).subscribe( (result: State[]) => {
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
      this.stateServ.getStates(this.currentPage, this.pageSize).subscribe( (result: State[]) => {
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
