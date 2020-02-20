import { Component , OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from './../../api.service';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { LocalStorageService } from 'ngx-store';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  Username: string = '';
  Password: string = '';
  message;
  constructor(private apiservice:ApiService,private router:Router,public formbuilder:FormBuilder,public localstorage:LocalStorageService){
    
  }
  ngOnInit(){
    
  }
  OnLogin(){
    if (!this.Username || !this.Password) {
      this.message = "Please enter Username and Password";
    }else{
      let logindata = {"username":this.Username,"password":this.Password};
      this.apiservice.Login(logindata).subscribe((data:any)=>{
        if(data){
          console.log(data);
          this.localstorage.set('isLogin','true');
          this.localstorage.set('name',data.data.name);
          this.localstorage.set('login_id',data.data.id);
          this.localstorage.set('credits',data.data.partner_detail.amount);
          this.apiservice.count = data.data.partner_detail.amount;
          this.router.navigateByUrl('/MyList');
        }
      }, error => {
          this.message = "Username or Password Invalid";

        });
    }
  }
 }
