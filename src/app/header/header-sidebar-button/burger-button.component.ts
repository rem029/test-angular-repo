import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-sidebar-button',
  templateUrl: './burger-button.component.html',
  styleUrls: ['./burger-button.component.css'],
})
export class HeaderSideBarButton implements OnInit {
  @Input('isDrawerOpen') isDrawerOpen: boolean = false;
  @Output() drawerToggle = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  ontoggleDrawer() {
    this.drawerToggle.emit(!this.isDrawerOpen);
  }
}
