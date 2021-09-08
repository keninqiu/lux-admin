import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {School} from "../interfaces/school.interface";
import {ApiService} from './api.service';

@Injectable()
export class SchoolService {
  constructor(private api: ApiService) { }

  add(item: School): Observable<School> {
    return this.api.postPrivate('school', item) as Observable<School>;
  }

  update(id: string, item: School): Observable<School> {
    return this.api.putPrivate('school/' + id, item) as Observable<School>;
  }

  getAll(): Observable<School[]> {
    return this.api.getPrivate('school') as Observable<School[]>;
  }

  get(id: string): Observable<School> {
    return this.api.getPublic('school/' + id) as Observable<School>;
  }

  deleteMany(ids: string[]): Observable<any> {
    return this.api.postPrivate('school/deleteMany', ids);
  }
}