import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {State} from "../interfaces/state.interface";
import {ApiService} from './api.service';

@Injectable()
export class StateService {
  constructor(private api: ApiService) { }

  add(item: any): Observable<State> {
    return this.api.postPrivate('state', item) as Observable<State>;
  }

  update(id: string, item: any): Observable<State> {
    return this.api.putPrivate('state/' + id, item) as Observable<State>;
  }

  getAll(): Observable<State[]> {
    return this.api.getPrivate('state') as Observable<State[]>;
  }

  getAllByCountry(id: string): Observable<State[]> {
    return this.api.getPublic('state/country/' + id) as Observable<State[]>;
  }

  get(id: string): Observable<State> {
    return this.api.getPublic('state/' + id) as Observable<State>;
  }

  deleteMany(ids: string[]): Observable<any> {
    return this.api.postPrivate('state/deleteMany', ids);
  }
}
