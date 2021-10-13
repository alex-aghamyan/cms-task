import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  user$: Observable<User> = EMPTY;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.auth.user$;
  }

  login() {
    this.auth.loginWithGoogle();
  }

  logout() {
    this.auth.logout();
  }
}
