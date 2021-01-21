import { LocalStorageManager } from '../__utils/storage';

export class HeaderSideBarService {
  isDrawerOpen: boolean = false;
  localStorage: LocalStorageManager = new LocalStorageManager();

  constructor() {
    const fromLocalStorageIsDrawerOpen = localStorage.getItem('isDrawerOpen');

    if (fromLocalStorageIsDrawerOpen) {
      this.isDrawerOpen = JSON.parse(fromLocalStorageIsDrawerOpen);
    }
  }

  get() {
    return this.isDrawerOpen;
  }

  set(state: boolean) {
    this.isDrawerOpen = state;
    localStorage.setItem('isDrawerOpen', this.isDrawerOpen.toString());
  }

  toggle() {
    this.isDrawerOpen = !this.isDrawerOpen;
    localStorage.setItem('isDrawerOpen', this.isDrawerOpen.toString());

    return this.isDrawerOpen;
  }
}
