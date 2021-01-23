import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CookieManager } from '../__utils/cookie';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = 'https://devautentica.brainyinteligencia.com';
  private apiParam = '?scope=auth';
  private pathTokenGet = '/tokens';

  private cookieTokenName = 'token';

  constructor(private http: HttpClient, private cookie: CookieManager) {
    if (this.tokenCheck()) {
      console.log('INITIALIZE', this.tokenGet());
    }
  }

  login(email: string, password: string) {
    const httpOptions = this.httpOptionsSetup('login', email, password);

    return this.http.get(
      this.url + this.pathTokenGet + this.apiParam,
      httpOptions
    );
  }

  tokenSave(token: string) {
    this.cookie.save(this.cookieTokenName, token);
  }

  tokenDelete() {
    this.cookie.delete(this.cookieTokenName);
  }

  tokenGet() {
    return this.cookie.load(this.cookieTokenName);
  }

  tokenCheck() {
    return this.cookie.check(this.cookieTokenName);
  }

  private httpOptionsSetup(type: string, email?: string, password?: string) {
    switch (type) {
      case 'login':
        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(email + ':' + password),
          }),
        };

      default:
        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        };
    }
  }
}
