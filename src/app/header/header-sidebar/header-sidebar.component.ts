import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faUsers, faLaptop } from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';
import { AuthModel } from 'src/app/__models/auth.model';
import { toggle } from '../../__actions/sidebar.actions';

import { paths } from '../../__paths/paths';

@Component({
  selector: 'app-header-sidebar',
  templateUrl: './header-sidebar.component.html',
  styleUrls: ['./header-sidebar.component.css'],
})
export class HeaderSideBarComponent implements OnInit {
  isDrawerOpen: boolean = false;
  faUsers = faUsers;
  faLaptop = faLaptop;
  paths = paths;

  authModel: AuthModel = {
    toggleShowPassword: false,
    isLoggedIn: false,
    isLoggedInError: false,
    isLoading: false,
    token: '',
    lastCode: 0,
  };

  constructor(
    private storeDrawer: Store<{ isDrawerOpen: boolean }>,
    private storeAuth: Store<{ auth: AuthModel }>
  ) {
    this.storeDrawer.select('isDrawerOpen').subscribe((state) => {
      this.isDrawerOpen = state;
    });

    this.storeAuth.select('auth').subscribe((state) => {
      this.authModel = state;
    });
  }

  ngOnInit(): void {}

  onClickLink() {
    this.storeDrawer.dispatch(toggle());
  }
}
