import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Company} from "../interfaces/company.interface";
import {ApiService} from './api.service';

@Injectable()
export class CompanyService {
  constructor(private api: ApiService) { }

  add(item: Company): Observable<Company> {
    return this.api.postPrivate('company', item) as Observable<Company>;
  }

  update(id: string, item: Company): Observable<Company> {
    return this.api.putPrivate('company/' + id, item) as Observable<Company>;
  }

  getAll(): Observable<Company[]> {
    return this.api.getPrivate('company') as Observable<Company[]>;
  }

  get(id: string): Observable<Company> {
    return this.api.getPublic('company/' + id) as Observable<Company>;
  }

  deleteMany(ids: string[]): Observable<any> {
    return this.api.postPrivate('company/deleteMany', ids);
  }
}