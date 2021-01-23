import { Component, OnInit, Input } from '@angular/core';
import {
  faEdit,
  faTimes,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { AppModel } from 'src/app/__models/app.model';
import { UserModel } from 'src/app/__models/user.model';
import { UsersModel } from 'src/app/__models/users.model';
import { AuthService } from 'src/app/__services/auth.service';
import { UsersService } from 'src/app/__services/users.service';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @Input() userModel: UserModel = { email: '', id: 0 };

  faEdit = faEdit;
  faTimes = faTimes;
  faAngleDown = faAngleDown;
  apps: any[] = [];
  usersModel: UsersModel = {
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

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private store: Store<{ users: UsersModel }>
  ) {
    this.store.select('users').subscribe((state) => {
      this.usersModel = state;
    });
  }

  ngOnInit(): void {
    this.userService
      .getUsersById(this.userModel.id, this.authService.tokenGet())
      .subscribe(
        (response: any) => {
          response.data.apps.map((apps: any) => {
            this.apps.push(apps);
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  onClickLink(event: any) {
    event.preventDefault();
  }
}
