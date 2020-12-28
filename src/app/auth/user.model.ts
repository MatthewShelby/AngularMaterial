import { Subject } from 'rxjs/Subject';
import { Injectable, Output } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { EventEmitter } from 'events';

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
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trService: TrainingService,
    private snackBar: MatSnackBar,
    private uiService: UIService 
  ) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: environment.authSnackBarDuration,
    });
  }
  //mellast     koche kave p26
  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        //this.successfullyAuth();
        this.uiService.loadingStateChanged.next(false);
      })
      .catch((err) => {
        this.uiService.loadingStateChanged.next(false);
        console.log(err);
        this.openSnackBar(err, 'ok ');
      });
  }
  showForgotPassword: boolean = false;
  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        // this.successfullyAuth();
        this.uiService.loadingStateChanged.next(false);
      })
      .catch((err) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showForgotPassword.next(true)
        //this.showForgotPassword = true;
        console.log(err);
        // if (err.code == 'auth/too-many-requests') {
        //   this.showForgotPassword = true;
        //   console.log(
        //     '0000000000000000000000000000000000000000000000000000000000'
        //   );
        // }

        this.openSnackBar(err, 'ok ');
      });
  }

  resetPassword(email: string) {
    console.log('to reset email is: ' + email);

    this.afAuth
      .sendPasswordResetEmail(email)
      .then((res) => {
        console.log('reset email res: ');
        console.log(res);
        this.openSnackBar(
          'A password reset link has been sebt to your email address.',
          'ok '
        );
      })
      .catch((error) => console.log('failed to send', error));
  }

  // private successfullyAuth() {
  //   this.isAuthenticated = true;
  //   this.authChange.next(true);
  //   this.router.navigate(['/training']);
  // }
  initAuthListenner() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trService.cancelSubscription();
        this.authChange.next(false);
        this.router.navigate(['/']);
        this.isAuthenticated = false;
      }
    });
  }
  logout() {
    this.trService.cancelSubscription();
    this.afAuth.signOut();
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/']);
    this.isAuthenticated = false;
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.isAuthenticated;
  }
}

import { TrainingService } from 'src/app/training/exercise.model';
import { from } from 'rxjs';
import { UIService } from '../Shared/UI.Service';

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
