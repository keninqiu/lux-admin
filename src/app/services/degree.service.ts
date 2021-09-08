import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Degree} from "../interfaces/degree.interface";
import {ApiService} from './api.service';

@Injectable()
export class DegreeService {
  constructor(private api: ApiService) { }

  add(item: Degree): Observable<Degree> {
    return this.api.postPrivate('degree', item) as Observable<Degree>;
  }

  update(id: string, item: Degree): Observable<Degree> {
    return this.api.putPrivate('degree/' + id, item) as Observable<Degree>;
  }

  getAll(): Observable<Degree[]> {
    return this.api.getPrivate('degree') as Observable<Degree[]>;
  }

  get(id: string): Observable<Degree> {
    return this.api.getPublic('degree/' + id) as Observable<Degree>;
  }

  deleteMany(ids: string[]): Observable<any> {
    return this.api.postPrivate('degree/deleteMany', ids);
  }
}