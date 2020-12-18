import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { UserService } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean = false;
  subscription: Subscription;
  onSidenavToggle() {
    this.sidenavToggle.emit();
  }

  constructor(private authService: UserService) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.authService.authChange.subscribe((status) => {
      this.isAuth = status;
    });
  }

  onLogout(){
    this.authService.logout();
  }
}
