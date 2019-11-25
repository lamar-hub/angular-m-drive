import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}
