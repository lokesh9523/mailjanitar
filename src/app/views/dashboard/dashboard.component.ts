import { Component, OnInit,ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import {ApiService} from './../../api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-store';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef,ModalDirective} from 'ngx-bootstrap/modal';
@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cols = [
    {header:"Name",field:"name"},
    { header: "Email Count", field: "file_size" },
    { header: "Upload Date", field: "date_created" },
    { header: "Status", field: "status" },
    {header:"Action",field:"active"}
    //{header:""}
  ];
  tabledata = [];
  credits = '';
  showupload:boolean = false;
  display:boolean = false;
  dialogdata;
  value: number = 0;
  @ViewChild(ModalDirective) modal: ModalDirective;
  constructor(public apiservice:ApiService,public route:Router,public localstorage:LocalStorageService,private datepipe: DatePipe, ) {
    }
  ngOnInit() {
   this.PartnerData();
   this.credits = this.localstorage.get('credits');
    
  }
  PartnerData(){
    this.tabledata = [];
    this.apiservice.getPartnerData(this.localstorage.get('login_id')).subscribe((data:any)=>{
      if(data.data.length){
        data.data.forEach(element => {
          if(element.date_created){
            element.date_created = this.datepipe.transform(element.date_created,"yyyy-MM-dd ");
          }
        });
        this.tabledata = data.data;
      }else{
        this.showupload=true;
      }
    })
  }
  selectCarWithButton(rowdata){
    this.modal.show();
    this.dialogdata = rowdata;
    this.dialogdata.credits = this.localstorage.get('credits');
   
    
    
  }
  Cleandata(){
    this.modal.hide();
    console.log(this.dialogdata);
     if(this.dialogdata.file_size >= this.localstorage.get('credits')){
      alert('Insuffients Funds!!!');
    }else{
      this.tabledata.forEach(element=>{
        if(element.id == this.dialogdata.id){
          element.status = 0;
          let interval = setInterval(() => {
            element.status = element.status + Math.floor(Math.random() * 10) + 1;
            if(element.status >= 100) {
              element.status = 100;
              element.active = 0;
                let credit =  this.localstorage.get('credits') - this.dialogdata.file_size;
           let data = {"amount":credit,"login_id":this.localstorage.get('login_id')}
            this.apiservice.UpdatePartner(data).subscribe((updateddata:any)=>{
              if(updateddata){
                this.localstorage.set('credits',updateddata.data.amount);
                this.apiservice.count = updateddata.data.amount;
              this.apiservice.DeletePartnerdata(this.dialogdata.login_id,this.dialogdata.id).subscribe((data:any)=>{
              if(data.data){
               // alert("Data has been deleted cleaned sucessfully");
                //this.PartnerData();
              }
            })
              }
            })
                clearInterval(interval);
            }
        }, 2000);
        }

      })
      
}
     
    }
  }

  // Cleandata() {
  //   this.modal.hide();
  //   console.log(this.dialogdata);
  //   if (this.dialogdata.file_size >= this.localstorage.get('credits')) {
  //     alert('Insuffients Funds!!!');
  //   } else {
  //     this.tabledata.forEach(element => {
  //       if (element.id == this.dialogdata.id) {
  //         console.log("iam here");
  //         element.status = this.value + Math.floor(Math.random() * 10) + 1;
  //         console.log("i am here");
  //         let interval = setInterval(() => {
  //           if (element.status >= 100) {

  //             element.status = 100;
  //             //       let credit =  this.localstorage.get('credits') - this.dialogdata.file_size;
  //             //  let data = {"amount":credit,"login_id":this.localstorage.get('login_id')}
  //             //   this.apiservice.UpdatePartner(data).subscribe((updateddata:any)=>{
  //             //     if(updateddata){
  //             //       this.localstorage.set('credits',updateddata.data.amount);
  //             //       this.apiservice.count = updateddata.data.amount;
  //             //   //   this.apiservice.DeletePartnerdata(this.dialogdata.login_id,this.dialogdata.id).subscribe((data:any)=>{
  //             //   //   if(data.data){
  //             //   //     alert("Data has been deleted cleaned sucessfully");
  //             //   //     this.PartnerData();
  //             //   //   }
  //             //   // })
  //             //     }
  //             //   })
  //             console.log(element);
  //             clearInterval(interval);
  //           }
  //         }, 2000);
  //       }
  //     })
  //   }

  // }