import {Component, Input, OnInit} from '@angular/core';

export enum Plan {
  free,
  business,
  pro
}

@Component({
  selector: 'app-upgrade-modal',
  templateUrl: './upgrade-modal.component.html',
  styleUrls: ['./upgrade-modal.component.scss']
})
export class UpgradeModalComponent implements OnInit {

  @Input() plan: Plan;

  constructor() {
  }

  ngOnInit() {
  }
}
