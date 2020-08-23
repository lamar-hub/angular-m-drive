import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {MatDialog} from '@angular/material/dialog';
import {VerificationDialogComponent} from './verification-dialog/verification-dialog.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  form = new FormGroup(
    {
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {validators: [Validators.required]})
    }
  );

  constructor(private authService: AuthService, private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  onLogin() {
    this.authService
      .login(
        {
          email: this.form.get('email').value,
          password: this.form.get('password').value
        }
      )
      .subscribe();
  }

  onOpenDialog() {
    const matDialogRef = this.dialog.open(VerificationDialogComponent);
    matDialogRef.afterClosed().subscribe(value => console.log(value));
  }
}
