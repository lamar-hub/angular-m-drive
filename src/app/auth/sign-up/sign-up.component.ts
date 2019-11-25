import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form = new FormGroup(
    {
      name: new FormControl(null, {validators: Validators.required}),
      surname: new FormControl(null, {validators: Validators.required}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      pass: new FormGroup(
        {
          password: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]}),
          confirmPassword: new FormControl(null)
        },
        {validators: this.confirmPasswordValidator}
      )
    }
  );

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  private confirmPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.get('password').value !== control.get('confirmPassword').value) {
      return {samePassword: true};
    }
    return null;
  }

  onSignUp() {
    if (!this.form.valid) {
      alert('Invalid data!');
    }
    this.authService
      .signUp(
        {
          name: this.form.get('name').value,
          surname: this.form.get('surname').value,
          email: this.form.get('email').value,
          password: this.form.get('pass.password').value
        }
      )
      .subscribe(
        value => {

        },
        error => {
          console.log(error);
        }
      );
  }
}
