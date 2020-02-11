import { Component ,ViewChild, ElementRef, TemplateRef} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService} from './../../api.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef,ModalDirective} from 'ngx-bootstrap/modal';
import { LocalStorageService } from 'ngx-store';
@Component({
//   selector: 'app-dashboard',
  templateUrl: 'website.component.html'
})

export class WebsiteComponent { 
  onsubmit:boolean = false;
  public UserFormGroup: FormGroup;
  Username: string = '';
  Password: string = '';
  message;
  message1;
  navbarOpen = false;
  @ViewChild(ModalDirective) modal: ModalDirective;
  constructor(private apiservice:ApiService,public formbuilder:FormBuilder,private router:Router,public localstorage:LocalStorageService) { 
    this.UserFormGroup = this.formbuilder.group({
      // name:['',Validators.required],
      username:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
 
}
OnReqister(){
  this.onsubmit = true;
  console.log(this.UserFormGroup);
  console.log(this.UserFormGroup.valid);
  if(this.UserFormGroup.valid){
    this.apiservice.Register(this.UserFormGroup.value).subscribe((data:any)=>{
      if(data){
        alert("Registered sucessfully Please Login!!!");
         this.UserFormGroup.reset();
        this.modal.hide();
        this.onsubmit = false;
        this.message1 = '';
        // this.router.navigateByUrl('/login');
      }
    }, error => {
      this.message1 = error.error.data

    });
  }
}
OnLogin(){
  if (!this.Username || !this.Password) {
    this.message = "Please enter Username and Password";
  }else{
    let logindata = {"username":this.Username,"password":this.Password};
    this.apiservice.Login(logindata).subscribe((data:any)=>{
      if(data){
        this.localstorage.set('isLogin','true');
        this.localstorage.set('name',data.data.name);
        this.localstorage.set('login_id',data.data.id);
        this.localstorage.set('credits',data.data.partner_detail.amount);
        this.apiservice.count = data.data.partner_detail.amount;
        this.router.navigateByUrl('/MyList');
        this.message = '';
      }
    }, error => {
        this.message = "Username or Password Invalid";

      });
  }
}

toggleNavbar() {
  this.navbarOpen = !this.navbarOpen;
}
}
