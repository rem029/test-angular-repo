import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class CookieManager {
  constructor(private cookieService: CookieService) {}

  save(name: string, value: string) {
    const expireDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay() + 30
    );
    // ); 30 DAYS EXPIRY DATE

    this.cookieService.set(name, value, { expires: expireDate });
  }

  delete(name: string) {
    this.cookieService.delete(name);
  }

  load(name: string) {
    return this.cookieService.get(name);
  }

  check(name: string) {
    return this.cookieService.check(name);
  }
}
