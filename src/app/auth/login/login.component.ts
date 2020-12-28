import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UIService } from 'src/app/Shared/UI.Service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

  // Properties:
  loginForm: FormGroup;
  userEmail: string;
  isLoading = false;
  isShowingForgotPassword = false;
  private loadingSubscription: Subscription;
  private forgotPasswordSubscription: Subscription;

  // Constructor:
  constructor(private authService: UserService, private uiService: UIService) {}

  

  ngOnInit() {
    //#region Subscriptions

    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (state) => {
        this.isLoading = state;
      }
    );
    this.forgotPasswordSubscription = this.uiService.showForgotPassword.subscribe(
      (state) => {
        this.isShowingForgotPassword = state;
      }
    );

    //#endregion

        this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }


  // Submitting the Login form 
  onSubmit(form: NgForm) {
    console.log(form);
    this.userEmail = form.value.email;
    this.authService.login({
      email: form.value.email,
      password: form.value.password,
    });
  }

  // Click on forgot password button
  resetPassword() {
    console.log('email is: ' + this.userEmail);
    this.authService.resetPassword(this.userEmail);
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
    this.forgotPasswordSubscription.unsubscribe();
  }
}
