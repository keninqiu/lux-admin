import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Login, SignUp, Tokens} from "../interfaces/auth.interface";

interface SignedUp {
  _id: number;
  status: string;
}

@Injectable()
export class AuthService {
  constructor(private api: ApiService) { }

  login(loginParams: Login): Observable<Tokens> {
    return this.api.postPublic('auth/login', loginParams);
  }

  signUp(signUpParams: SignUp): Observable<SignedUp> {
    return this.api.postPublic('auth/register', signUpParams);
  }
}
