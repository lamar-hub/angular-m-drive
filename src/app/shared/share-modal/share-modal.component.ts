import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
    message: new FormControl(null)
  });

  constructor() {
  }

  ngOnInit() {
  }

}
