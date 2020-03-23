import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-store';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'add.component.html'
})
export class AddComponent implements OnInit {
  cols = [
    // {header:"Sno",field:"id"},
    {header:"Username",field:"username"},
    { header: "Email", field: "email" },
    { header: "Credits", field: "amount" },
    
    //{header:""}
  ];
  tabledata = [];
  url={"domain_name":"","url":"","speed_per_hour":"",status:1};
  totalusers = 0
  constructor(public apiservice:ApiService,public route:Router,public localstorage:LocalStorageService,private datepipe: DatePipe,) {
    }
  ngOnInit() {
  
}

addUrl() {
  if (!this.url.url) {
      alert("Please Enter Url name")
  } else {
      this.url.status = 1;
      this.apiservice.addUrl(this.url).subscribe((data: any) => {
          if (data.data) {
              alert("Url Added Sucessfully")
              this.route.navigateByUrl('/url')
          }
      }, error => {
         // console.log(error);
          alert(error.error.data);
      })
  }
}

}