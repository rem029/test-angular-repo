import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faUsers, faLaptop } from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';
import { toggle } from '../../actions/sidebar.actions';

@Component({
  selector: 'app-header-sidebar',
  templateUrl: './header-sidebar.component.html',
  styleUrls: ['./header-sidebar.component.css'],
})
export class HeaderSideBarComponent implements OnInit {
  isDrawerOpen: boolean = false;
  faUsers = faUsers;
  faLaptop = faLaptop;

  constructor(private store: Store<{ isDrawerOpen: boolean }>) {
    this.store.select('isDrawerOpen').subscribe((state) => {
      this.isDrawerOpen = state;
    });
  }

  ngOnInit(): void {}

  onClickLink() {
    this.store.dispatch(toggle());
  }
}
