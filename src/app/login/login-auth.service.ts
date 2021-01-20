import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoginAuthService {
  private url = 'https://devautentica.brainyinteligencia.com';
  private apiParam = '?scope=auth';
  private pathTokenGet = '/tokens';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(email + ':' + password),
      }),
    };

    console.log(httpOptions);

    return this.http.get(
      this.url + this.pathTokenGet + this.apiParam,
      httpOptions
    );
  }
}
