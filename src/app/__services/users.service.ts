import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private url = 'https://devautentica.brainyinteligencia.com';
  private apiParamScope = '?scope=auth';
  private apiParamPage = { page: 'page=', per_page: 'per_page=' };
  private apiPath = '/users/';

  constructor(private http: HttpClient) {}

  getUsers(token: string, page: number = 1, per_page: number = 50) {
    return this.http.get(
      this.url +
        this.apiPath +
        this.apiParamScope +
        '&' +
        this.apiParamPage.page +
        page +
        '&' +
        this.apiParamPage.per_page +
        per_page,
      this.httpOptionsSetup(token)
    );
  }

  private httpOptionsSetup(token: string) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
  }
}
