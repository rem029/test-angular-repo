import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faUsers, faLaptop } from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';
import { setLoggedIn } from 'src/app/__actions/auth.action';
import { setCurrentUser } from 'src/app/__actions/dashboard.action';
import { AuthModel } from 'src/app/__models/auth.model';
import { DashboardModel } from 'src/app/__models/dashboard.model';
import { AuthService } from 'src/app/__services/auth.service';
import { DashBoardService } from 'src/app/__services/dashboard.service';
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

  dashboardModel: DashboardModel = {
    currentUser: { id: 0, email: '', apps: [] },
    lastCode: 0,
  };

  constructor(
    private storeDrawer: Store<{ isDrawerOpen: boolean }>,
    private storeAuth: Store<{ auth: AuthModel }>,
    private storeDashboard: Store<{ dashboard: DashboardModel }>,
    private dashBoardService: DashBoardService,
    private authService: AuthService
  ) {
    this.storeDrawer.select('isDrawerOpen').subscribe((state) => {
      this.isDrawerOpen = state;
    });

    this.storeAuth.select('auth').subscribe((state) => {
      this.authModel = state;
    });

    this.storeDashboard.select('dashboard').subscribe((state) => {
      this.dashboardModel = state;
    });
  }

  ngOnInit(): void {
    if (this.authService.tokenCheck()) {
      this.dashBoardService
        .getCurrentUser(this.authService.tokenGet())
        .subscribe(
          (response: any) => {
            const dashboardModel: DashboardModel = {
              lastCode: response.code,
              currentUser: response.data,
            };
            this.storeDashboard.dispatch(
              setCurrentUser({ dashBoardModel: dashboardModel })
            );
            this.storeDashboard.dispatch(setLoggedIn({ isLoggedIn: true }));
          },
          (error) => {
            const dashboardModel: DashboardModel = {
              lastCode: error.error.code,
              currentUser: { id: 0, email: '', apps: [] },
            };

            this.storeDashboard.dispatch(
              setCurrentUser({ dashBoardModel: dashboardModel })
            );
            this.storeDashboard.dispatch(setLoggedIn({ isLoggedIn: false }));
          }
        );
    }
  }

  onClickLink() {
    this.storeDrawer.dispatch(toggle());
  }
}
