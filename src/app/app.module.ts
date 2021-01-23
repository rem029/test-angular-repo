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
import { authReducer } from './__reducers/auth.reducer';
import { dashboardReducer } from './__reducers/dashboard.reducer';
import { usersReducer } from './__reducers/users.reducer';

import { AppComponent } from './app.component';

import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user-list/user/user.component';

import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationComponent } from './application-list/application/application.component';

import { HeaderComponent } from './header/header.component';
import { HeaderSideBarButton } from './header/header-sidebar-button/header-sidebar-button';
import { HeaderSideBarComponent } from './header/header-sidebar/header-sidebar.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { paths } from './__paths/paths';

const routes: Routes = [
  { path: paths.auth, component: AuthComponent },
  { path: paths.dashboard, component: DashboardComponent },
  { path: paths.userList, component: UserListComponent },
  { path: paths.appList, component: ApplicationListComponent },
  { path: '', redirectTo: '/' + paths.auth, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserListComponent,
    UserComponent,
    ApplicationListComponent,
    ApplicationComponent,
    HeaderComponent,
    PageNotFoundComponent,
    HeaderSideBarButton,
    HeaderSideBarComponent,
    DashboardComponent,
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
      auth: authReducer,
      dashboard: dashboardReducer,
      users: usersReducer,
    }),
  ],
  exports: [RouterModule],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
