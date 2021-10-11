import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Industry} from "../interfaces/industry.interface";
import {ApiService} from './api.service';

@Injectable()
export class IndustryService {
  constructor(private api: ApiService) { }

  add(item: any): Observable<Industry> {
    return this.api.postPrivate('industry', item) as Observable<Industry>;
  }

  update(id: string, item: any): Observable<Industry> {
    return this.api.putPrivate('industry/' + id, item) as Observable<Industry>;
  }

  getAll(): Observable<Industry[]> {
    return this.api.getPrivate('industry') as Observable<Industry[]>;
  }

  getCount(): Observable<number> {
    return this.api.getPublic('industry/count') as Observable<number>;
  }
  
  getIndustries(currentPage: number, pageSize: number) {
    return this.api.getPublic('industry/' + currentPage + '/' + pageSize) as Observable<Industry[]>;
  }

  getAllWithoutDuplicate(): Observable<Industry[]> {
    return this.api.getPrivate('industry/all/withoutDuplicate') as Observable<Industry[]>;
  }

  get(id: string): Observable<Industry> {
    return this.api.getPublic('industry/' + id) as Observable<Industry>;
  }

  deleteMany(ids: string[]): Observable<any> {
    return this.api.postPrivate('industry/deleteMany', ids);
  }
}