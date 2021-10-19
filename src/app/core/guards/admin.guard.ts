import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user$.pipe(
      map((user) => {
        return user && user.roles?.admin ? true : false;
      })
    );
  }
}
