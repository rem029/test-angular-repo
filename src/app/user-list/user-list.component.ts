import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { UsersService } from '../__services/users.service';
import { AuthService } from '../__services/auth.service';

import { UsersModel } from '../__models/users.model';

import {
  faPlusCircle,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import {
  setLoading,
  setUsers,
  usersNextPage,
  usersPrevPage,
} from '../__actions/users.actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: UsersModel = {
    lastCode: 0,
    isLoading: false,
    users: [],
    _meta: {
      page: 1,
      per_page: 10,
      total_items: 0,
      total_pages: 1,
    },
  };

  faPlusCircle = faPlusCircle;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private store: Store<{ users: UsersModel }>
  ) {
    this.store.select('users').subscribe((state) => {
      this.users = state;
    });
  }

  ngOnInit(): void {
    console.log('USERS NG ON INIT', this.users._meta);
    this.refreshUsers(this.users._meta.page, this.users._meta.per_page);
  }

  userNext() {
    if (this.users._meta.page < this.users._meta.total_pages) {
      this.store.dispatch(usersNextPage());
      this.refreshUsers(this.users._meta.page, this.users._meta.per_page);
    }
  }

  userPrev() {
    if (this.users._meta.page > 1) {
      this.store.dispatch(usersPrevPage());
      this.refreshUsers(this.users._meta.page, this.users._meta.per_page);
    }
  }

  refreshUsers(page: number, per_page: number) {
    if (this.authService.tokenCheck()) {
      this.store.dispatch(setLoading({ isLoading: true }));
      this.userService
        .getUsers(this.authService.tokenGet(), page, per_page)
        .subscribe(
          (response: any) => {
            console.log('REFRESH USERS RESPONSE', response);

            let users: UsersModel;

            users = {
              isLoading: false,
              lastCode: response.code,
              users: response.data.items,
              _meta: response.data._meta,
            };

            this.store.dispatch(setUsers({ users: users }));

            console.log('REFRESH USERS THIS', this.users);
          },
          (error) => {
            console.log('REFRESH USERS ERROR', error);
            let users: UsersModel;
            users = {
              isLoading: false,
              lastCode: error.error.code,
              users: [],
              _meta: { page: 0, per_page: 0, total_pages: 0, total_items: 0 },
            };
            this.store.dispatch(setUsers({ users: users }));

            console.log('REFRESH USERS THIS ERROR', this.users);
          }
        );
    }
  }
}
