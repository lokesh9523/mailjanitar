import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-store';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'antispam.component.html'
})
export class AntispamComponent implements OnInit {
  cols = [
    {header:"Id",field:"id"},
    {header:"Name",field:"name"},
    { header: "Reason", field: "reason" }
    
    //{header:""}
  ];
  tabledata = [];
  user;
  constructor(public apiservice:ApiService,public route:Router,public localstorage:LocalStorageService,private datepipe: DatePipe,) {
    }
  ngOnInit() {
  this.apiservice.getAllSpam().subscribe((data:any)=>{
    if(data){
      this.user = data.data;
    }
  },error=>{
    alert(error.error.data);
  })
}
}