import { Component, OnInit, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { ApiService } from './../../api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-store';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { default as config } from './../../views/config';
import { element } from 'protractor';
@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cols = [
    { header: "Name", field: "name" },
    { header: "Email Count", field: "email_count" },
    { header: "Upload Date", field: "date_created" },
    { header: "Status", field: "status" },
    { header: "Action", field: "active" }
    //{header:""}
  ];
  tabledata = [];
  tabledatatemp = [];
  credits = '';
  showupload: boolean = false;
  display: boolean = false;
  stopcleaning:boolean = false;
  dialogdata = {"email_cleaned":"","id":"","login_id":"","credits":"","email_count":"","status":""};
  cleaningdata = [];
  value: number = 0;
  showconform:boolean = false;
  deletefiledata;
  @ViewChild(ModalDirective) modal: ModalDirective;
  constructor(public apiservice: ApiService, public route: Router, public localstorage: LocalStorageService, private datepipe: DatePipe, ) {
  }
  ngOnInit() {
    this.PartnerData();
    this.credits = this.localstorage.get('credits');
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
        var wsdata = JSON.parse(e.data);
        // if(wsdata.method === 'Mailcleaning Completed' && parseInt(wsdata.login_id,10) === this.localstorage.get('login_id')){
        //   console.log("iam here");
          if(wsdata.method === 'Mailcleaning Completed' && parseInt(wsdata.login_id,10) === this.localstorage.get('login_id')  ){
            this.tabledatatemp.forEach(element=>{
              if(element.id == wsdata.file_id){
                this.dialogdata = element;
                this.dialogdata.email_cleaned = wsdata.mails_cleand;
                this.dialogdata.status = wsdata.status;
                this.localstorage.set('credits',wsdata.credits);
                  this.apiservice.count = wsdata.credits;
              }
            })
          }
      }
    }

  }
  PartnerData() {
    this.tabledata = [];
    this.apiservice.getUserData(this.localstorage.get('login_id')).subscribe((data: any) => {
      if (data.data.length) {
        data.data.forEach(element => {
          if (element.date_created) {
            element.date_created = this.datepipe.transform(element.date_created, "yyyy-MM-dd ");
           // element.stopcleaning = false;
          }
        });
        this.tabledata = data.data;
        this.tabledatatemp = data.data;
      } else {
        this.showupload = true;
      }
    })
  }
  selectCarWithButton(rowdata) {
    this.showconform = false
    this.modal.show();
    this.dialogdata = rowdata;
    this.cleaningdata.push(rowdata);
    this.dialogdata.credits = this.localstorage.get('credits');
    //this.stopcleaning = true;


  }
  Cleandata() {
    this.modal.hide();
    if (this.dialogdata.email_count >= this.localstorage.get('credits')) {
      alert('Insuffients Funds!!!');
    } else {
      this.tabledata.forEach(element => {
        if (element.id == this.dialogdata.id) {
          // element.stopcleaning = true
          let params = {"login_id":this.dialogdata.login_id,"file_id":this.dialogdata.id};
          this.apiservice.cleanMail(params).subscribe((cleanmail=>{
              alert("Your status will be updated  once file is cleaned");
          }))
          // let interval = setInterval(() => {
          //   element.status = element.status + Math.floor(Math.random() * 10) + 1;
          //   if (element.status >= 100) {
          //     element.status = 100;
          //     element.email_cleaned = this.dialogdata.email_count;
          //     let credit = this.localstorage.get('credits') - this.dialogdata.email_count;
          //     let data = { "amount": credit, "login_id": this.localstorage.get('login_id') };
          //     let partnerData = {"email_cleaned":element.email_cleaned,"status":element.status};
          //     this.apiservice.updateUserData(this.dialogdata.login_id,this.dialogdata.id,partnerData).subscribe((partnerdata:any)=>{
          //       this.apiservice.updateUser(data).subscribe((updateddata: any) => {
          //         if (updateddata) {
          //           this.localstorage.set('credits', updateddata.data.amount);
          //           this.apiservice.count = updateddata.data.amount;
  
          //         }
          //       })
          //     })
              
          //     clearInterval(interval);
          //   }
          // }, 2000);
        }

      })


    }

  }
  DeleteFile() {
    this.modal.hide();
    this.apiservice.deleteUserData(this.deletefiledata.login_id,this.deletefiledata.id).subscribe((data:any)=>{
          if(data.data){
           alert("File has been deleted sucessfully");
            this.PartnerData();
          }
        })
   }
   cancelFile(){
     this.showconform = false;
     this.modal.hide();
   }
   conformDeleteFile(rowdata){

    this.showconform = true;
    this.modal.show();
    this.deletefiledata = rowdata;
   }
   Stopcleaning(){
    this.stopcleaning = false;;
   }
}
