import { Component } from '@angular/core';
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
        this.translateServ.getAllByType(type).subscribe(
          (translates: Translate[]) => {
            this.count = translates.length;
            this.source.load(translates);
          }
        );
      });
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
