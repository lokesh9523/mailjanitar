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
    console.log(this.myAngularxQrCode,"==============");
    }
  ngOnInit() {
    this.apiservice.getPartnerDetails(this.localstorageservice.get('login_id')).subscribe((data:any)=>{
      if(data){
        console.log(data.data.partner_detail.ether_amount,"===============")
       if(!data.data.partner_detail.ether_account){
         console.log("iam here");
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
    this.apiservice.buyEther(this.localstorageservice.get('login_id'),data).subscribe((updateddata:any)=>{
      console.log(updateddata,"=============")
      if(updateddata){
        // console.log(updateddata,"=============")
        // this.localstorageservice.set('credits',updateddata.data.amount);
        // this.apiservice.count = updateddata.data.amount;
        // alert("Ether added sucessfully");
      }
    })
}
  }
  Addaccount(){
    if(!this.accountnumber){
     // this.message = "please enter the account number";
      alert("please enter the ether")
    }else{
      let data = {"ether_account":this.accountnumber,"login_id":this.localstorageservice.get('login_id')}
        this.apiservice.UpdatePartner(data).subscribe((updateddata:any)=>{
          if(updateddata){
            alert("Account  added sucessfully");
            this.modal.hide();
          }
        })
    }
  }
}
