import { Component, OnInit } from '@angular/core';

import { HeaderSideBarService } from '../__services/header-sidebar-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

  providers: [HeaderSideBarService],
})
export class HeaderComponent implements OnInit {
  isDrawerOpen = false;

  constructor(public headerState: HeaderSideBarService) {
    this.isDrawerOpen = headerState.isDrawerOpen;
  }

  ngOnInit(): void {}

  onDrawerToggle() {
    this.isDrawerOpen = this.headerState.toggle();
  }
}
