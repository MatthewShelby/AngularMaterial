import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../user.model';
import { UIService } from 'src/app/Shared/UI.Service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading = false;
  private loadingSubscription: Subscription;

  onSubmit(form: NgForm) {
    console.log(form);
    this.authServise.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }

  constructor(private authServise: UserService, private uiService: UIService) {}

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (state) => {
        this.isLoading = state;
      }
    );
  }
  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
