import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

export interface User {
  email: string;
  userId: string;
}

export interface AuthData {
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  private user: User;
  authChange = new Subject<boolean>();

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      //   email: 'ftJanat1379@gmail.com',
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  login(authData: AuthData) {
    this.user = {
      //   email: 'ftJanat1379@gmail.com',
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: UserService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
