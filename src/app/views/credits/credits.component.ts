import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import {ApiService} from './../../api.service';
import { LocalStorageService } from 'ngx-store';

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
  credits;
  message;
  tabledata = [];
  
  constructor(public apiservice:ApiService,public localstorageservice:LocalStorageService) {
    }
  ngOnInit() {
    // generate random values for mainChart
  this.tabledata= [{"name":"lokesh","size":"100000","upload_date":"20/02/2019","process":"95%"},{"name":"lokesh","size":"100000","upload_date":"20/02/2019","process":"95%"},{"name":"lokesh","size":"100000","upload_date":"20/02/2019","process":"95%"}
,{"name":"lokesh","size":"100000","upload_date":"20/02/2019","process":"95%"},{"name":"lokesh","size":"100000","upload_date":"20/02/2019","process":"95%"}];

  }
  addCredits(){
if(this.credits == '' || this.credits == 0){
  this.message = "please afte the amount";
}else{
  let data = {"amount":this.credits,"login_id":this.localstorageservice.get('login_id')}
    this.apiservice.UpdatePartner(data).subscribe((updateddata:any)=>{
      if(updateddata){
        this.localstorageservice.set('credits',updateddata.data.amount);
        this.apiservice.count = updateddata.data.amount;
        alert("credits added sucessfully");
      }
    })
}
  }
}
