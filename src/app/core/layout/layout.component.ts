import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  user$: Observable<User> = EMPTY;
  totalItems: Observable<number | undefined> = EMPTY;

  constructor(public auth: AuthService, private cartService: CartService) {}

  ngOnInit(): void {
    this.user$ = this.auth.user$;
    this.totalItems = this.cartService.cart$.pipe(
      map((products) => products?.length)
    );
  }

  login() {
    this.auth.loginWithGoogle();
  }

  logout() {
    this.auth.logout();
  }
}
