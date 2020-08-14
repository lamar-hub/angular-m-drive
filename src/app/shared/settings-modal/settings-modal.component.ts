import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../auth/user.model';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent implements OnInit {

  @Input() user: User;

  constructor() {
  }

  ngOnInit() {
  }

}
