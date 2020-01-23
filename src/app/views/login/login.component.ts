import { Component , OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from './../../api.service';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  Username: string = '';
  Password: string = '';
  message;
  constructor(private apiservice:ApiService,private router:Router,public formbuilder:FormBuilder){
    
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
          this.router.navigateByUrl('/MyList');
        }
      }, error => {
          this.message = "Username or Password Invalid";

        });
    }
  }
 }
