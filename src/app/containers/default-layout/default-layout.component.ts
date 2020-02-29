import { Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { navAdminItems } from '../../_navadmin';
import { ApiService } from './../../api.service';
import { LocalStorageService } from 'ngx-store';
import { Router } from '@angular/router';
import * as ws from 'ws';
import { default as config } from './../../views/config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  public username;
  public credits;
  public role;
  public showcredits: boolean = true;
  public showalert: boolean = false;
  public showaddedcredits;
  private changes: MutationObserver;
  constructor(public localstorageservice: LocalStorageService, public apiService: ApiService, public router: Router) {
    console.log("iamhere,")
    this.credits = this.localstorageservice.get('credits');
    this.username = this.localstorageservice.get('username');
    this.role = this.localstorageservice.get('role');
    if (this.role == 'admin') {
      this.navItems = navAdminItems;
      this.showcredits = false;
    }
    else if (this.role == 'partner') {
      this.navItems = navItems;
      this.showcredits = true;
    }

    this.apiService.webSocket$.subscribe(data => {
      var wsdata = JSON.parse(data);
      console.log(wsdata,'================wsdata',typeof wsdata)
      if (wsdata.method === 'CreditsUpdate' && wsdata.login_id === this.localstorageservice.get('login_id')) {
        this.credits = wsdata.totalCredits;
        this.localstorageservice.set('credits', this.credits);
        this.apiService.count = this.credits;
        this.showaddedcredits = wsdata.addedCredits;
        this.showalert = true;
        setTimeout(() => {
          this.showalert = false;
        }, 1000);
      }
    })
  }

  ngOnInit() {
    const url = config.WEB_URL
    const connection = new WebSocket(url)
    connection.onopen = () => {
      connection.send('Message From Client')
    }

    connection.onerror = (error) => {
      console.log(`WebSocket error: ${error}`)
    }

    connection.onmessage = (e) => {
      if (e.data) {
        console.log(e.data,"=======================");
        this.apiService.wsSubject.next(e.data);
        // this.apiService.getPartnerDetails(this.localstorageservice.get('login_id')).subscribe((partnerdata:any)=>{
        //   if(partnerdata){
        //     // console.log(partnerdata,"===================")
        //     data.forEach(element => {
        //       if(element.login_id === this.localstorageservice.get('login_id')){
        //         this.localstorageservice.set('credits',partnerdata.data.partner_detail.amount);
        //          this.apiService.count = partnerdata.data.partner_detail.amount;
        //          this.showaddedcredits = element.value * 1000;
        //          this.showalert = true;
        //          setTimeout(()=>{    //<<<---    using ()=> syntax
        //           this.showalert = false;
        //      }, 1000);
        //       }
        //     });

        //   }
        // },error=>{
        //   alert(error.error.data);
        // })
      }
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.localstorageservice.clear();
    this.router.navigateByUrl('/website'); ``

  }

}
