import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'src/app/auth/user.model';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClose = new EventEmitter<void>();
  isAuth: boolean = false;
  subscription: Subscription;

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSidenavClose() {
    this.sidenavClose.emit();
  }

  constructor(private authService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.authService.authChange.subscribe((status) => {
      this.isAuth = status;
    });
  }

  onLogout() {
    this.sidenavClose.emit();
    this.authService.logout();
  }
}
