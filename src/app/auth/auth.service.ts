import {Injectable} from '@angular/core';
import {User} from './user.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = [
    {userId: 'user-1', email: 'lazarmarinkovic29@gmail.com', name: 'Lazar', surname: 'Marinkovic', stored: 322, limit: 500}
  ];

  constructor(private router: Router) {
  }

  getUser() {
    return [...this.users][0];
  }

  signUp(param: { password: any; surname: any; name: any; email: any }) {
    this.users.push(
      {
        email: param.email,
        surname: param.surname,
        name: param.name,
        userId: 'user-' + this.users.length + 1,
        limit: 500,
        stored: 0
      }
    );
    console.log(this.users);
    this.router.navigateByUrl('/auth');
  }

  login(param: { password: any; email: any }) {
    if (this.users.filter(user => user.email === param.email).length === 1) {
      this.router.navigateByUrl('/drive');
    }
  }
}
