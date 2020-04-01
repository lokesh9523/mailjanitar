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
 
  tabledata = [];
  user={"name":"","reason":"",status:1};
  totalusers = 0
  constructor(public apiservice:ApiService,public route:Router,public localstorage:LocalStorageService,private datepipe: DatePipe,) {
    }
  ngOnInit() {
  
}
addDomain(){
    if(!this.user.name){
        alert("Please Enter name")
    }
     
    else if(!this.user.reason){
        alert("Please Enter the reason")
    }else{
        this.user.status = 1;
        this.apiservice.addSpam(this.user).subscribe((data:any)=>{
            if(data.data){
                alert("Spam Added Sucessfully")
                this.route.navigateByUrl('/spam')
            }
        },error=>{
           alert(error.error.data);
        })
    }
}
}