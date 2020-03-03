import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-store';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'account.component.html'
})
export class AccountComponent implements OnInit {
  cols = [
    {header:"Name",field:"name"},
    { header: "Size", field: "size" },
    { header: "Upload Date", field: "upload_date" },
    { header: "process", field: "process" },
    
    //{header:""}
  ];
  tabledata = [];
  user;
  constructor(public apiservice:ApiService,public route:Router,public localstorage:LocalStorageService,private datepipe: DatePipe,) {
    }
  ngOnInit() {
  this.apiservice.getUserdetails(this.localstorage.get('login_id')).subscribe((data:any)=>{
    if(data){
      this.user = data.data;
    }
  },error=>{
    alert(error.error.data);
  })
}
}