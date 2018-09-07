import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  errorMessage = 'You are not property owner';
  errorNavigateLink = '/user';
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data.expectedRole;
    this.auth.currentUser.subscribe( user => {
        if (!this.auth.isAuthenticated || !user.roles.find(role => role.name === expectedRole)) {
          this.router.navigate([this.errorNavigateLink]);
          alert(this.errorMessage);
        }
      }
    )
    return true;
  }
}
