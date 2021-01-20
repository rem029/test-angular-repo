import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';
import { toggle } from '../../actions/sidebar.actions';

@Component({
  selector: 'app-header-sidebar-button',
  templateUrl: './header-sidebar-button.html',
  styleUrls: ['./header-sidebar-button.css'],
})
export class HeaderSideBarButton implements OnInit {
  isDrawerOpen: boolean = false;

  constructor(private store: Store<{ isDrawerOpen: boolean }>) {
    this.store.select('isDrawerOpen').subscribe((state) => {
      this.isDrawerOpen = state;
    });
  }

  ngOnInit(): void {}

  ontoggleDrawer() {
    this.store.dispatch(toggle());
  }
}
