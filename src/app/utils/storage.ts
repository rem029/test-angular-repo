import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageManager {
  constructor() {}

  save(type: string, value: string) {
    localStorage.setItem(type, value);
  }

  load(type: string) {
    let storedValue = localStorage.getItem(type);
    return storedValue;
  }
}
