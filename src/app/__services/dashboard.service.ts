import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DashBoardService {
  private url = 'https://devautentica.brainyinteligencia.com';
  private apiParam = '?scope=auth';
  private apiPath = '/users/me';

  constructor(private http: HttpClient) {}

  getCurrentUser(token: string) {
    return this.http.get(
      this.url + this.apiPath + this.apiParam,
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
