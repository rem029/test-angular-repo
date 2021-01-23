import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../__services/auth.service';
import { DashBoardService } from '../__services/dashboard.service';
import { DashboardModel } from '../__models/dashboard.model';
import { setCurrentUser } from '../__actions/dashboard.action';
import { setLoggedIn, resetAuthState } from '../__actions/auth.action';

import { Store } from '@ngrx/store';

import { paths } from '../__paths/paths';
import { AuthModel } from '../__models/auth.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dashboardModel: DashboardModel = {
    currentUser: { id: 0, email: '', apps: [] },
    lastCode: 0,
  };

  constructor(
    private store: Store<{ dashboard: DashboardModel; auth: AuthModel }>,
    private authService: AuthService,
    private dashBoardService: DashBoardService,
    private router: Router
  ) {
    this.store.select('dashboard').subscribe((value) => {
      this.dashboardModel = { ...value };
    });
  }

  ngOnInit(): void {
    if (!this.authService.tokenCheck()) {
      this.router.navigateByUrl(paths.auth);
    } else {
      this.dashBoardService
        .getCurrentUser(this.authService.tokenGet())
        .subscribe(
          (response: any) => {
            const dashboardModel: DashboardModel = {
              lastCode: response.code,
              currentUser: response.data,
            };
            this.store.dispatch(
              setCurrentUser({ dashBoardModel: dashboardModel })
            );
            this.store.dispatch(setLoggedIn({ isLoggedIn: true }));
          },
          (error) => {
            const dashboardModel: DashboardModel = {
              lastCode: error.error.code,
              currentUser: { id: 0, email: '', apps: [] },
            };

            this.store.dispatch(
              setCurrentUser({ dashBoardModel: dashboardModel })
            );
            this.store.dispatch(setLoggedIn({ isLoggedIn: false }));
          }
        );
    }
  }

  logout() {
    this.authService.tokenDelete();
    this.store.dispatch(resetAuthState());
    this.router.navigateByUrl(paths.auth);
    this.reload();
  }

  reload() {
    window.location.reload();
  }
}
