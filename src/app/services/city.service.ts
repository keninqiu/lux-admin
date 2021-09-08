import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {City} from "../interfaces/city.interface";
import {ApiService} from './api.service';

@Injectable()
export class CityService {
  constructor(private api: ApiService) { }

  add(item: City): Observable<City> {
    return this.api.postPrivate('city', item) as Observable<City>;
  }

  update(id: string, item: City): Observable<City> {
    return this.api.putPrivate('city/' + id, item) as Observable<City>;
  }

  getAll(): Observable<City[]> {
    return this.api.getPrivate('city') as Observable<City[]>;
  }

  get(id: string): Observable<City> {
    return this.api.getPublic('city/' + id) as Observable<City>;
  }

  deleteMany(ids: string[]): Observable<any> {
    return this.api.postPrivate('city/deleteMany', ids);
  }
}