import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-store';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  cols = [
    // {header:"Sno",field:"id"},
    {header:"Username",field:"username"},
    { header: "Email", field: "email" },
    { header: "Credits", field: "amount" }
    
    //{header:""}
  ];
  tabledata = [];
  user;
  totalusers = 0
  constructor(public apiservice:ApiService,public route:Router,public localstorage:LocalStorageService,private datepipe: DatePipe,) {
    }
  ngOnInit() {
  this.apiservice.getAllUsers().subscribe((data:any)=>{
    // if(data){
      this.user = data.data;
      this.totalusers = data.data.length;
      data.data.forEach(element => {
        element.amount = 0
        if(element.partner_detail){
          if(element.partner_detail.amount){
            element.amount = element.partner_detail.amount;
          }
        }
        
      });
      this.tabledata = data.data;
    // }
  },error=>{
     alert(error.error.data);
  })
}
}