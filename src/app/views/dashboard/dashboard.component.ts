import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import {ApiService} from './../../api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-store';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  cols = [
    {header:"Name",field:"name"},
    { header: "Size", field: "file_size" },
    { header: "Upload Date", field: "date_created" },
    { header: "process", field: "status" },
    {header:"action"}
    //{header:""}
  ];
  tabledata = [];
  showupload:boolean = false;
  constructor(public apiservice:ApiService,public route:Router,public localstorage:LocalStorageService,private datepipe: DatePipe, ) {
    }
  ngOnInit() {
   this.PartnerData();
    
  }
  PartnerData(){
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
    console.log(rowdata);
    this.apiservice.DeletePartnerdata(rowdata.login_id,rowdata.id).subscribe((data:any)=>{
      if(data.data){
        alert("Data has been deleted sucessfully");
        this.PartnerData();
      }
    })
  }
}
