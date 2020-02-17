import { Component, OnInit, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { ApiService } from './../../api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-store';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
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
  credits = '';
  showupload: boolean = false;
  display: boolean = false;
  dialogdata;
  value: number = 0;
  @ViewChild(ModalDirective) modal: ModalDirective;
  constructor(public apiservice: ApiService, public route: Router, public localstorage: LocalStorageService, private datepipe: DatePipe, ) {
  }
  ngOnInit() {
    this.PartnerData();
    this.credits = this.localstorage.get('credits');

  }
  PartnerData() {
    this.tabledata = [];
    this.apiservice.getPartnerData(this.localstorage.get('login_id')).subscribe((data: any) => {
      if (data.data.length) {
        data.data.forEach(element => {
          if (element.date_created) {
            element.date_created = this.datepipe.transform(element.date_created, "yyyy-MM-dd ");
          }
        });
        this.tabledata = data.data;
      } else {
        this.showupload = true;
      }
    })
  }
  selectCarWithButton(rowdata) {
    this.modal.show();
    this.dialogdata = rowdata;
    this.dialogdata.credits = this.localstorage.get('credits');



  }
  Cleandata() {
    this.modal.hide();
    if (this.dialogdata.email_count >= this.localstorage.get('credits')) {
      alert('Insuffients Funds!!!');
    } else {
      this.tabledata.forEach(element => {
        if (element.id == this.dialogdata.id) {
          element.status = 0;
          let interval = setInterval(() => {
            element.status = element.status + Math.floor(Math.random() * 10) + 1;
            if (element.status >= 100) {
              element.status = 100;
              element.email_cleaned = this.dialogdata.email_count;
              let credit = this.localstorage.get('credits') - this.dialogdata.email_count;
              let data = { "amount": credit, "login_id": this.localstorage.get('login_id') };
              let partnerData = {"email_cleaned":element.email_cleaned,"status":element.status};
              this.apiservice.UpdatePartnerData(this.dialogdata.login_id,this.dialogdata.id,partnerData).subscribe((partnerdata:any)=>{
                this.apiservice.UpdatePartner(data).subscribe((updateddata: any) => {
                  if (updateddata) {
                    this.localstorage.set('credits', updateddata.data.amount);
                    this.apiservice.count = updateddata.data.amount;
  
                  }
                })
              })
              
              clearInterval(interval);
            }
          }, 2000);
        }

      })

    }

  }
  DeleteFile(rowdata) {
    this.apiservice.DeletePartnerdata(rowdata.login_id,rowdata.id).subscribe((data:any)=>{
          if(data.data){
           alert("File has been deleted cleaned sucessfully");
            this.PartnerData();
          }
        })
  }
}
