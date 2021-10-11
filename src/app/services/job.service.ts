import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Job} from "../interfaces/job.interface";
import {ApiService} from './api.service';

@Injectable()
export class JobService {
  constructor(private api: ApiService) { }

  add(item: any): Observable<Job> {
    return this.api.postPrivate('job', item) as Observable<Job>;
  }

  update(id: string, item: any): Observable<Job> {
    return this.api.putPrivate('job/' + id, item) as Observable<Job>;
  }

  getAll(): Observable<Job[]> {
    return this.api.getPrivate('job') as Observable<Job[]>;
  }

  getCount(): Observable<number> {
    return this.api.getPublic('job/count') as Observable<number>;
  }
  
  getJobs(currentPage: number, pageSize: number) {
    return this.api.getPublic('job/' + currentPage + '/' + pageSize) as Observable<Job[]>;
  }

  getAllWithoutDuplicate(): Observable<Job[]> {
    return this.api.getPrivate('job/all/withoutDuplicate') as Observable<Job[]>;
  }

  get(id: string): Observable<Job> {
    return this.api.getPublic('job/' + id) as Observable<Job>;
  }

  deleteMany(ids: string[]): Observable<any> {
    return this.api.postPrivate('job/deleteMany', ids);
  }
}