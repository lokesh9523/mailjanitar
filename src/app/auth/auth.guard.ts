import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'ngx-store';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, public localStorageService: LocalStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (route.routeConfig.component.name == "LoginComponent")  {
      if (this.localStorageService.get('isLogin')) {
        this.router.navigate(['/dashboard']);
        return false;
      } else {
        return true;
      }
    }
    if (!this.localStorageService.get('isLogin')) {
      this.router.navigate(['/login']);
      return false;
    }else{
      
        return true
    }
  
  }
}