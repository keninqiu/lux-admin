import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Country} from "../interfaces/country.interface";
import {ApiService} from './api.service';

@Injectable()
export class CountryService {
  constructor(private api: ApiService) { }

  add(item: Country): Observable<Country> {
    return this.api.postPrivate('country', item) as Observable<Country>;
  }

  update(id: string, item: Country): Observable<Country> {
    return this.api.putPrivate('country/' + id, item) as Observable<Country>;
  }

  getAll(): Observable<Country[]> {
    return this.api.getPublic('country') as Observable<Country[]>;
  }

  get(id: string): Observable<Country> {
    return this.api.getPublic('country/' + id) as Observable<Country>;
  }

  deleteMany(ids: string[]): Observable<any> {
    return this.api.postPrivate('country/deleteMany', ids);
  }
}
