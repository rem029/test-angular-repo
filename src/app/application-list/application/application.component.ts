import { Component, OnInit, Input } from '@angular/core';
import {
  faEdit,
  faTimes,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

import { AppModel } from '../../__models/app.model';
import { UserModel } from '../../__models/user.model';

import { AuthService } from 'src/app/__services/auth.service';

import { AppsService } from 'src/app/__services/app.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
})
export class ApplicationComponent implements OnInit {
  @Input() app: AppModel = {
    id: 0,
    name: '',
    scope: '',
    url: '',
    include: false,
  };

  users: UserModel[] = [];

  faEdit = faEdit;
  faTimes = faTimes;
  faAngleDown = faAngleDown;

  constructor(
    private appsService: AppsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.appsService
      .getAppById(this.app.id, this.authService.tokenGet())
      .subscribe(
        (response: any) => {
          response.data.users.map((user: UserModel) => {
            return this.users.push(user);
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
