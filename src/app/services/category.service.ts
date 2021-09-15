import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from "../interfaces/category.interface";
import {ApiService} from './api.service';

@Injectable()
export class CategoryService {
  constructor(private api: ApiService) { }

  add(item: Category): Observable<Category> {
    return this.api.postPrivate('category', item) as Observable<Category>;
  }

  update(id: string, item: Category): Observable<Category> {
    return this.api.putPrivate('category/' + id, item) as Observable<Category>;
  }

  getAll(): Observable<Category[]> {
    return this.api.getPublic('category') as Observable<Category[]>;
  }

  getAllByCountryAndType(countryId: string, type: string): Observable<Category[]> {
    return this.api.getPublic('category/country/' + countryId + '/type/' + type) as Observable<Category[]>;
  }

  getAllByType(type: string): Observable<Category[]> {
    return this.api.getPublic('category/type/' + type) as Observable<Category[]>;
  }

  get(id: string): Observable<Category> {
    return this.api.getPublic('category/' + id) as Observable<Category>;
  }

  deleteMany(ids: string[]): Observable<any> {
    return this.api.postPrivate('category/deleteMany', ids);
  }
}
