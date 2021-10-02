import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Homepage} from "../interfaces/homepage.interface";
import {ApiService} from './api.service';

@Injectable()
export class HomepageService {
  constructor(private api: ApiService) { }

  add(item: any): Observable<Homepage> {
    return this.api.postPrivate('homepage', item) as Observable<Homepage>;
  }

  update(id: string, item: any): Observable<Homepage> {
    return this.api.putPrivate('homepage/' + id, item) as Observable<Homepage>;
  }

  getAll(): Observable<Homepage[]> {
    return this.api.getPublic('homepage') as Observable<Homepage[]>;
  }

  get(id: string): Observable<Homepage> {
    return this.api.getPublic('homepage/' + id) as Observable<Homepage>;
  }

  deleteMany(ids: string[]): Observable<any> {
    return this.api.postPrivate('homepage/deleteMany', ids);
  }

  getLatest(): Observable<Homepage> {
    return this.api.getPublic('homepage/latest') as Observable<Homepage>;
  } 

  updateLatest(data: any): Observable<Homepage> {
    return this.api.putPrivate('homepage/latest', data) as Observable<Homepage>;
  } 

  updateCarousel(id: string, data: any): Observable<Homepage> {
    return this.api.putPrivate('homepage/carousel/' + id, data) as Observable<Homepage>;
  } 
  addCarousel(data: any): Observable<Homepage> {
    return this.api.postPrivate('homepage/carousel', data) as Observable<Homepage>;
  } 

  deleteCarousel(id: string): Observable<Homepage> {
    return this.api.deletePrivate('homepage/carousel/' + id) as Observable<Homepage>;
  } 
}
