import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { Routes, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';

import { sideBarReducer } from './__reducers/sidebar.reducer';
import { loginReducer } from './__reducers/login.reducer';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';

import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user-list/user/user.component';

import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationComponent } from './application-list/application/application.component';

import { HeaderComponent } from './header/header.component';
import { HeaderSideBarButton } from './header/header-sidebar-button/header-sidebar-button';
import { HeaderSideBarComponent } from './header/header-sidebar/header-sidebar.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'app-login', component: LoginComponent },
  { path: 'app-user-list', component: UserListComponent },
  { path: 'app-application-list', component: ApplicationListComponent },
  { path: '', redirectTo: '/app-login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    UserComponent,
    ApplicationListComponent,
    ApplicationComponent,
    HeaderComponent,
    PageNotFoundComponent,
    HeaderSideBarButton,
    HeaderSideBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      isDrawerOpen: sideBarReducer,
      loginShowPassword: loginReducer,
    }),
  ],
  exports: [RouterModule],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
