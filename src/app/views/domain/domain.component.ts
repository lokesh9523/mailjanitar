import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-store';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'domain.component.html'
})
export class DomainComponent implements OnInit {
  cols = [
     {header:"Id",field:"id"},
    {header:"Domain Name",field:"domain_name"},
    { header: "Url", field: "url" },
    { header: "Speed/Hour", field: "speed_per_hour" },
    {header:"Status",field:"status"}
    
    //{header:""}
  ];
  domaindata = [];
  domain;
  totaldomain = 0
  constructor(public apiservice:ApiService,public route:Router,public localstorage:LocalStorageService,private datepipe: DatePipe,) {
    }
  ngOnInit() {
  this.apiservice.getAllDomain().subscribe((data:any)=>{
    // if(data){
      this.domain = data.data;
      this.totaldomain = data.data.length;
      data.data.forEach(element => {
        element.amount = 0
        console.log(element);
        if(element.partner_detail){
          if(element.partner_detail.amount){
            element.amount = element.partner_detail.amount;
          }
        }
        
      });
      this.domaindata = data.data;
      console.log(this.domain);
    // }
  },error=>{
      console.log(error);
     alert(error.error.data);
  })
}
}