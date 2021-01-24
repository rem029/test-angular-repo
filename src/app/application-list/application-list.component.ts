import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { AppsService } from '../__services/app.service';
import { AuthService } from '../__services/auth.service';

import { UsersModel } from '../__models/users.model';
import { AppsModel } from '../__models/apps.model';

import {
  faPlusCircle,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import {
  setLoading,
  setApps,
  appsNextPage,
  appsPrevPage,
} from '../__actions/apps.action';
import { paths } from '../__paths/paths';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css'],
})
export class ApplicationListComponent implements OnInit {
  appsModel: AppsModel = {
    apps: [],
    lastCode: 0,
    isLoading: false,
    _meta: {
      page: 0,
      per_page: 0,
      total_items: 0,
      total_pages: 0,
    },
  };

  faPlusCircle = faPlusCircle;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  constructor(
    private appsService: AppsService,
    private authService: AuthService,
    private store: Store<{ apps: AppsModel }>,
    private router: Router
  ) {
    this.store.select('apps').subscribe((state) => {
      this.appsModel = state;
    });
  }

  ngOnInit(): void {
    this.refreshApps(1, 10);
  }

  appNext() {
    if (this.appsModel._meta.page < this.appsModel._meta.total_pages) {
      this.store.dispatch(appsNextPage());
      this.refreshApps(
        this.appsModel._meta.page,
        this.appsModel._meta.per_page
      );
    }
  }

  appPrev() {
    if (this.appsModel._meta.page > 1) {
      this.store.dispatch(appsPrevPage());
      this.refreshApps(
        this.appsModel._meta.page,
        this.appsModel._meta.per_page
      );
    }
  }

  addApps(event: any) {
    event.preventDefault();
    this.router.navigateByUrl(paths.appListNew);
  }

  refreshApps(page: number, per_page: number) {
    if (this.authService.tokenCheck()) {
      this.store.dispatch(setLoading({ isLoading: true }));
      this.appsService
        .getApps(this.authService.tokenGet(), page, per_page)
        .subscribe(
          (response: any) => {
            let apps: AppsModel;

            apps = {
              isLoading: false,
              lastCode: response.code,
              apps: response.data.items,
              _meta: response.data._meta,
            };

            this.store.dispatch(setApps({ apps: apps }));
          },
          (error) => {
            let apps: AppsModel;
            apps = {
              isLoading: false,
              lastCode: error.error.code,
              apps: [],
              _meta: { page: 0, per_page: 0, total_pages: 0, total_items: 0 },
            };
            this.store.dispatch(setApps({ apps: apps }));
          }
        );
    }
  }
}
