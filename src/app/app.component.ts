import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from './auth/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class AppComponent implements OnInit {
  // items: Observable<any[]>;
  // constructor(db: AngularFirestore) {
  //   this.items = db.collection('items').valueChanges();
  // }
  title = 'FT';
  openSidenav = false;
  constructor(private authService: UserService) {}
  ngOnInit() {
    this.authService.initAuthListenner();
  }
}
