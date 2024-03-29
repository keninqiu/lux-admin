import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Translate} from "../interfaces/translate.interface";
import {ApiService} from './api.service';

@Injectable()
export class TranslateService {
  constructor(private api: ApiService) { }

  add(item: any): Observable<Translate> {
    return this.api.postPrivate('translate', item) as Observable<Translate>;
  }

  update(id: string, item: any): Observable<Translate> {
    return this.api.putPrivate('translate/' + id, item) as Observable<Translate>;
  }

  getAll(): Observable<Translate[]> {
    return this.api.getPrivate('translate') as Observable<Translate[]>;
  }

  getCount(): Observable<number> {
    return this.api.getPublic('translate/count') as Observable<number>;
  }
  
  getCountByType(type: string): Observable<number> {
    return this.api.getPublic('translate/' + type + '/count') as Observable<number>;
  }

  getTranslates(currentPage: number, pageSize: number) {
    return this.api.getPublic('translate/' + currentPage + '/' + pageSize) as Observable<Translate[]>;
  }

  getAllByType(type: string): Observable<Translate[]> {
    return this.api.getPrivate('translate/type/' + type) as Observable<Translate[]>;
  }

  getTranslatesByType(type: string, currentPage: number, pageSize: number) {
    return this.api.getPublic('translate/' + type + '/' + currentPage + '/' + pageSize) as Observable<Translate[]>;
  }

  get(id: string): Observable<Translate> {
    return this.api.getPublic('translate/' + id) as Observable<Translate>;
  }

  deleteMany(ids: string[]): Observable<any> {
    return this.api.postPrivate('translate/deleteMany', ids);
  }
}
