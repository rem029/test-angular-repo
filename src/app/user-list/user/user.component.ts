import { Component, OnInit } from '@angular/core';
import {
  faEdit,
  faTimes,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  faEdit = faEdit;
  faTimes = faTimes;
  faAngleDown = faAngleDown;

  constructor() {}

  ngOnInit(): void {}

  onClickLink(event: any) {
    event.preventDefault();
  }
}
