import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../auth/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService
      .userObservable
      .subscribe(
        user => {
          this.user = user;
          console.log(this.user);
        }
      );
  }

  onSave() {
    console.log(this.user);
    this.authService.updateUser(this.user).subscribe();
  }

}
