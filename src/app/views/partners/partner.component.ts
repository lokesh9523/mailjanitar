import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-store';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'partner.component.html'
})
export class PartnerComponent implements OnInit {
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
  this.apiservice.getAllPartners().subscribe((data:any)=>{
    // if(data){
      this.user = data.data;
      console.log(this.user);
    // }
  },error=>{
      console.log(error);
     alert(error.error.data);
  })
}
}