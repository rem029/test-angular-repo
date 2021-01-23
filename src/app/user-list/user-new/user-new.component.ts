import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppModel } from 'src/app/__models/app.model';
import { paths } from 'src/app/__paths/paths';
import { AppsService } from 'src/app/__services/app.service';
import { AuthService } from 'src/app/__services/auth.service';
import { UsersService } from 'src/app/__services/users.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css'],
})
export class UserNewComponent implements OnInit {
  apps: AppModel[] = [];
  email: string = '';
  password1: string = '';
  password2: string = '';
  formStatus = '';
  userCreated = false;

  constructor(
    private authService: AuthService,
    private appsService: AppsService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appsService.getApps(this.authService.tokenGet()).subscribe(
      (response: any) => {
        response.data.items.map((item: any) => {
          return this.apps.push({ ...item, include: false });
        });

        console.log('INIT APPS', this.apps);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  appClick(event: any, id: number, index: number) {
    let appsCopy = this.apps
      .filter((app: any) => {
        return app.id === id;
      })
      .map((app) => {
        return { ...app, include: event.target.checked };
      });

    this.apps[index] = appsCopy[0];
  }

  createUser() {
    this.userCreated = false;
    this.formStatus = '';
    if (
      this.email.length > 0 &&
      this.password1.length > 0 &&
      this.password1.length > 0
    ) {
      if (this.password1 === this.password2) {
        const newUser = {
          email: this.email,
          passtoken: this.password1,
          apps: this.apps.filter((app) => {
            return app.include;
          }),
        };
        this.usersService
          .createUsers(this.authService.tokenGet(), newUser)
          .subscribe(
            (response: any) => {
              console.log(response);
              this.formStatus = 'SUCCESS: ' + response.code;
              this.userCreated = true;
            },
            (error) => {
              this.formStatus = 'ERROR : ' + error.error.code;
              this.userCreated = false;
            }
          );
      } else {
        this.formStatus = 'Password does not match';
      }
    } else {
      this.formStatus = 'Please enter your email and password';
    }
  }

  cancelCreateUser() {
    this.router.navigateByUrl(paths.userList);
  }
}
