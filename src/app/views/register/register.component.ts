import { Component, OnInit } from '@angular/core';
import { ApiService} from './../../api.service';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  onsubmit:boolean = false;
  public UserFormGroup: FormGroup;
  constructor(private apiservice:ApiService,public formbuilder:FormBuilder,private router:Router) { 
    this.UserFormGroup = this.formbuilder.group({
      name:['',Validators.required],
      username:['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

ngOnInit(){

}
OnReqister(){
  this.onsubmit = true;
  if(this.UserFormGroup.valid){
    this.apiservice.Register(this.UserFormGroup.value).subscribe((data:any)=>{
      if(data){
        alert("Registered sucessfully Please Login!!!");
        this.router.navigateByUrl('/login');
      }
    })
  }
}
}
