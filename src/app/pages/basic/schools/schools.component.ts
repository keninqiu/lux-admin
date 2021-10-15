import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';

import { School } from '../../../interfaces/school.interface';
import { SchoolService } from '../../../services/school.service';
import { CategoryService } from 'app/services/category.service';
import { Category } from 'app/interfaces/category.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {
  totalCount: number;
  pageSize = 30;
  currentPage = 1;
  showPerPage = 10;
  categories: any;
  cities: any;
  settings: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private route: Router,
    private schoolServ: SchoolService, 
    private categoryServ: CategoryService) {

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
          } 
        },
      };


      this.schoolServ.getCount().subscribe(
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
    this.schoolServ.getSchools(this.currentPage, this.pageSize).subscribe( (result: School[]) => {
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
      this.schoolServ.getSchools(this.currentPage, this.pageSize).subscribe( (result: School[]) => {
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
    this.route.navigate(['pages/basic/school/' + id + '/edit']);
  }

  onCreate(event): void {
    console.log('create');
    this.route.navigate(['pages/basic/school/add']);
  }

  onDelete(event): void {
    console.log('event for delete=', event);
    if (window.confirm('确定删除吗?')) {
      const data = event.data;
      const id = data._id;
      console.log('id=', id);
      this.schoolServ.deleteMany([id]).subscribe(
        (ret: any) => {
          event.confirm.resolve();
        },
        (error: any) => {
          event.confirm.reject();
        }
      );
    }
  }
}
