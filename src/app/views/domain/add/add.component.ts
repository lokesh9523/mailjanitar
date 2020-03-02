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
  user={"domain_name":"","url":"","speed_per_hour":"",status:1};
  totalusers = 0
  constructor(public apiservice:ApiService,public route:Router,public localstorage:LocalStorageService,private datepipe: DatePipe,) {
    }
  ngOnInit() {
  
}
addDomain(){
    if(!this.user.domain_name){
        alert("Please Enter Domain name")
    }else if(!this.user.url){
        alert("Please Enter url")
    }else if(!this.user.speed_per_hour){
        alert("Please Enter the Speed")
    }else{
        this.user.status = 1;
        this.apiservice.addDomain(this.user).subscribe((data:any)=>{
            if(data.data){
                alert("Domain Added Sucessfully")
                this.route.navigateByUrl('/domain')
            }
        },error=>{
            console.log(error);
           alert(error.error.data);
        })
    }
}
}