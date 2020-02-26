import { Component, OnInit, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import {ApiService} from './../../api.service';
import { LocalStorageService } from 'ngx-store';
import{ default as config} from './../../views/config'
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  templateUrl: 'credits.component.html'
})
export class CreditComponent implements OnInit {
  cols = [
    {header:"Name",field:"name"},
    { header: "Size", field: "size" },
    { header: "Upload Date", field: "upload_date" },
    { header: "process", field: "process" },
    
    //{header:""}
  ];
  credits = '';
  message;
  accountnumber = '';
  tabledata = [];
  userdata;
  public myAngularxQrCode: string = null;

  @ViewChild(ModalDirective) modal: ModalDirective;
  constructor(public apiservice:ApiService,public localstorageservice:LocalStorageService) {
    this.myAngularxQrCode = config.ADDRESS;
    }
  ngOnInit() {
    this.apiservice.getPartnerDetails(this.localstorageservice.get('login_id')).subscribe((data:any)=>{
      if(data){
       if(!data.data.partner_detail.ether_account){
         this.modal.show();
       }else{

       }
      }
    },error=>{
      alert(error.error.data);
    })
  }
  addCredits(){
if(!this.credits){
  this.message = "please enter the ether";
  alert("please enter the ether")
}else{
  let credit = +this.credits + this.localstorageservice.get('credits');
  let data = {"amount":credit,"login_id":this.localstorageservice.get('login_id')}
  this.apiservice.depositeJan(data).subscribe((updateddata:any)=>{
      console.log(updateddata,"=============")
      if(updateddata){
        
         alert("you will get an alert once you complete the transcation from your mobile");
      }
    })
}
  }
  Addaccount(){
    if(!this.accountnumber){
     // this.message = "please enter the account number";
      alert("please enter the account number")
    }else{
      let data = {"ether_account":this.accountnumber,"login_id":this.localstorageservice.get('login_id')}
        this.apiservice.addEtheraccount(data).subscribe((updateddata:any)=>{
          if(updateddata){
            alert("Account  added sucessfully");
            this.modal.hide();
          }
        },error=>{
          // alert(error.error.data);
          this.message = error.error.data;
        })
    }
  }
}
