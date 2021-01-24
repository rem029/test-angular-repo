import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppModel } from 'src/app/__models/app.model';
import { UserModel } from 'src/app/__models/user.model';
import { paths } from 'src/app/__paths/paths';
import { AppsService } from 'src/app/__services/app.service';
import { AuthService } from 'src/app/__services/auth.service';
import { UsersService } from 'src/app/__services/users.service';

@Component({
  selector: 'app-application-new',
  templateUrl: './application-new.component.html',
  styleUrls: ['./application-new.component.css'],
})
export class ApplicationNewComponent implements OnInit {
  users: UserModel[] = [];
  appName: string = '';
  scope: string = '';
  url: string = '';
  formStatus = '';
  appCreated = false;

  constructor(
    private authService: AuthService,
    private appsService: AppsService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usersService.getUsers(this.authService.tokenGet()).subscribe(
      (response: any) => {
        response.data.items.map((item: any) => {
          return this.users.push({ ...item, include: false });
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  userClick(event: any, id: number, index: number) {
    let userCopy = this.users
      .filter((user: any) => {
        return user.id === id;
      })
      .map((user) => {
        return { ...user, include: event.target.checked };
      });

    this.users[index] = userCopy[0];
  }

  cancelCreateApps() {
    this.router.navigateByUrl(paths.appList);
  }

  createApps() {
    this.appCreated = false;
    this.formStatus = '';
    if (
      this.appName.length > 0 &&
      this.scope.length > 0 &&
      this.url.length > 0
    ) {
      let newApps = {
        name: this.appName,
        scope: this.scope,
        url: this.url,
        users: this.users.filter((user) => {
          return user.include;
        }),
      };

      this.appsService
        .createApps(this.authService.tokenGet(), newApps)
        .subscribe(
          (response: any) => {
            console.log(response);
            this.formStatus = 'SUCCESS: ' + response.code;
            this.appCreated = true;
          },
          (error) => {
            this.formStatus =
              'ERROR : ' + error.error.code + ': ' + error.error.message;
            this.appCreated = false;
          }
        );
    } else {
      this.formStatus = 'All inputs are required.';
    }
  }
}
