import { LocalStorageService } from 'ngx-store';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleGaurdService implements CanActivate{

  constructor(private router: Router, public localStorageService: LocalStorageService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const tokenRole = this.localStorageService.get('role');
    // decode the token to get its payload
    if ( !this.localStorageService.get('isLogin') || tokenRole !== expectedRole
    ) {
      this.router.navigate(['website']);
      return false;
    }
    return true;
  }

}
