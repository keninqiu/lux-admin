import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
interface OPTIONS {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    // responseType: "arraybuffer";
    withCredentials?: boolean;
}

@Injectable()
export class ApiService extends HttpClient{
    postPublic(uri: string, data: any) {
        const ret = new Observable<any>((observer) => {
            this.post<any>(environment.API + uri, data).subscribe(
                (ret: any) => {
                    if(ret && ret.success) {
                        observer.next(ret.data);
                    } else {
                        observer.error(ret.error);
                    }
                },
                (err: any) => {
                    observer.error(err.error);
                }
            );
        });
        return ret;
        //return this.post<any>(environment.API + uri, data);
    }

    getPublic(uri: string) {
        const ret = new Observable<any>((observer) => {
            this.get<any>(environment.API + uri).subscribe(
                (ret: any) => {
                    if(ret && ret.success) {
                        observer.next(ret.data);
                    } else {
                        observer.error(ret.error);
                    }
                },
                (err: any) => {
                    observer.error(err.error);
                }
            );
        });
        return ret;
    }

    getPrivate(uri: string) {
        const token = localStorage.getItem("token");

        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': token
        });
        const options: OPTIONS = {
            headers: httpHeaders
        };   

        const ret = new Observable<any>((observer) => {
            if(!token) {
                observer.error('token not existed');
            } else {
                this.get<any>(environment.API + uri, options).subscribe(
                    (ret: any) => {
                        if(ret && ret.success) {
                            observer.next(ret.data);
                        } else {
                            observer.error(ret.error);
                        }
                    },
                    (err: any) => {
                        observer.error(err.error);
                    }
                );
            }         

        });
        return ret;
    }

    deletePrivate(uri: string) {
        const token = localStorage.getItem("token");

        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': token
        });
        const options: OPTIONS = {
            headers: httpHeaders
        };   

        const ret = new Observable<any>((observer) => {
            if(!token) {
                observer.error('token not existed');
            } else {
                this.delete<any>(environment.API + uri, options).subscribe(
                    (ret: any) => {
                        if(ret && ret.success) {
                            observer.next(ret.data);
                        } else {
                            observer.error(ret.error);
                        }
                    },
                    (err: any) => {
                        observer.error(err.error);
                    }
                );
            }         

        });
        return ret;
    }

    postPrivate(uri: string, data: any) {
        const token = localStorage.getItem("token");
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': token
        });
        const options: OPTIONS = {
            headers: httpHeaders
        };   

        const ret = new Observable<any>((observer) => {
            if(!token) {
                observer.error('token not existed');
            } else {
                this.post<any>(environment.API + uri, data, options).subscribe(
                    (ret: any) => {
                        if(ret && ret.success) {
                            observer.next(ret.data);
                        } else {
                            observer.error(ret.error);
                        }
                    },
                    (err: any) => {
                        observer.error(err.error);
                    }
                );
            }
        });
        return ret;
    }  
 

    postPrivateFormData(uri: string, data: any) {
        const token = localStorage.getItem("token");
        const httpHeaders = new HttpHeaders({
            'authorization': token
        });
        const options: OPTIONS = {
            headers: httpHeaders
        };   

        const ret = new Observable<any>((observer) => {
            if(!token) {
                observer.error('token not existed');
            } else {            
                this.post<any>(environment.API + uri, data, options).subscribe(
                    (ret: any) => {
                        observer.next(ret);
                    },
                    (err: any) => {
                        observer.error(err.error);
                    }
                );
            }
        });
        return ret;
    }  

    putPrivate(uri: string, data: any) {
        const token = localStorage.getItem("token");
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': token
        });
        const options: OPTIONS = {
            headers: httpHeaders
        };   

        const ret = new Observable<any>((observer) => {
            if(!token) {
                observer.error('token not existed');
            } else {            
                this.put<any>(environment.API + uri, data, options).subscribe(
                    (ret: any) => {
                        if(ret && ret.success) {
                            observer.next(ret.data);
                        } else {
                            observer.error(ret.error);
                        }
                    },
                    (err: any) => {
                        observer.error(err.error);
                    }
                );
            }
        });
        return ret;
    }    
}