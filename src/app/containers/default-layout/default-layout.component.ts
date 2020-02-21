import {Component , OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import {navAdminItems} from '../../_navadmin';
import {ApiService} from './../../api.service';
import { LocalStorageService } from 'ngx-store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  public username ;
  public credits;
  public role;
  public showcredits:boolean = true;
  constructor(public localstorageservice:LocalStorageService,public apiService:ApiService,public router:Router){
    this.apiService.langSubject.next(this.localstorageservice.get('credits'));
    this.credits = this.localstorageservice.get('credits');
    this.username = this.localstorageservice.get('username');
    this.role = this.localstorageservice.get('role');
    if(this.role == 'admin'){ 
      this.navItems = navAdminItems;
      this.showcredits = false;
    }
    else if(this.role == 'partner'){
      this.navItems = navItems;
      this.showcredits = true;
     
    }
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(){
    this.localstorageservice.clear();
    this.router.navigateByUrl('/website');``

  }
}
