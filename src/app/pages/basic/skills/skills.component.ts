import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Skill } from '../../../interfaces/skill.interface';
import { SkillService } from '../../../services/skill.service';
import { CategoryService } from 'app/services/category.service';
import { Category } from 'app/interfaces/category.interface';

@Component({
  selector: 'skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  count: number;
  settings: any;
  
  categories: any;
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private categoryServ: CategoryService,
    private skillServ: SkillService) {

      this.categoryServ.getAllByType('Skill').subscribe(
        (categories: Category[]) => {
          this.categories = categories;
          const categoryList = categories.map(item => {return {value: item._id, title: item.name};});
        

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
                title: '名称',
                type: 'string',
              },
              url: {
                title: '链接',
                type: 'string',
              },
              category: {
                title: '类别',
                type: 'html',
                valuePrepareFunction: (cell, row) => { 
                  
                  const theCategory = this.categories.filter(item => item._id == cell);
                  if(theCategory && theCategory.length > 0) {
                    const item = theCategory[0];
                    return item.country.name + '-' + item.name;
                  }
                
                  return cell;
                },
                editor: {
                  type: 'list',
                  config: {
                    list: categoryList,
                  },
                },
              },              
            },
          };
        });


    this.skillServ.getAll().subscribe(
      (skills: Skill[]) => {
        this.count = skills.length;
        this.source.load(skills);
      }
    );
  }

  onCreateConfirm(event): void {
    console.log('event in onCreateConfirm=', event);
    const data = event.newData;
    this.skillServ.add(data).subscribe(
      (ret: any) => {
        console.log('ret in add country = ', ret);
        event.confirm.resolve();
      },
      (error: any) => {
        event.confirm.reject();
      }
    );
  }

  onEditConfirm(event): void {
    const data = event.newData;
    const id = data._id;
   
    this.skillServ.update(id, data).subscribe(
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
      this.skillServ.deleteMany([id]).subscribe(
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
