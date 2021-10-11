import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';

import { Translate } from '../../../interfaces/translate.interface';
import { TranslateService } from '../../../services/translate.service';

@Component({
  selector: 'ngx-translates',
  templateUrl: './translates.component.html',
  styleUrls: ['./translates.component.scss']
})
export class TranslatesComponent {
  totalCount: number;
  type: string;
  pageSize = 30;
  currentPage = 1;
  showPerPage = 10;

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
      en: {
        title: '英文',
        type: 'string',
      },
      zh: {
        title: '中文',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translateServ: TranslateService) {
      this.route.paramMap.subscribe( paramMap => {
        const type = paramMap.get('type');
        this.type = type;
        this.initData();
        this.initOnChagedData();
        this.translateServ.getCountByType(type).subscribe(
          (count: number) => {
            this.totalCount = count;
          }
        );

      });
  }

  initData(){
    this.source = new LocalDataSource();
    this.translateServ.getTranslatesByType(this.type, this.currentPage, this.pageSize).subscribe( (result: Translate[]) => {
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
      this.translateServ.getTranslatesByType(this.type, this.currentPage, this.pageSize).subscribe( (result: Translate[]) => {
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
    this.router.navigate(['pages/translate/translate/' + id + '/edit']);
  }

  onCreate(event): void {
    console.log('create');
    this.router.navigate(['pages/translate/translate/add']);
  }

  onDelete(event): void {
    if (window.confirm('确定删除吗?')) {
      const data = event.data;
      const id = data._id;
      this.translateServ.deleteMany([id]).subscribe(
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
