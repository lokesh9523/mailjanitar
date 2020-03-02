import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ApiService } from '../../../api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-store';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'details.component.html'
})
export class DetailsComponent implements OnInit {
  cols = [
    // {header:"Sno",field:"id"},
    {header:"Username",field:"username"},
    { header: "Email", field: "email" },
    { header: "Credits", field: "amount" },
    
  ];
  cols1 = [
    {header:"Transaction hash",field:"transcation_hash",width: '40%'},
    { header: "From", field: "from_address",width: '25%' },
    { header: "To", field: "to_address",width: '25%' },
   {header:"Value",field:"value",width: '10%'}
  ];
  tabledata = [];
  user;
  user_id;
  totalusers = 0
  Transactiondata;
  constructor(public apiservice:ApiService,public route:Router,public localstorage:LocalStorageService,private datepipe: DatePipe,public activatedroute:ActivatedRoute) {
    }
  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
        this.user_id = params['id'];
        if(this.user_id){
            this.getUserDetails(this.user_id);
        }
    });
//   this.apiservice.getUserHistory('id').subscribe((data:any)=>{
//     // if(data){
//       this.user = data.data;
//       this.totalusers = data.data.length;
//       data.data.forEach(element => {
//         element.amount = 0
//         console.log(element);
//         if(element.partner_detail){
//           if(element.partner_detail.amount){
//             element.amount = element.partner_detail.amount;
//           }
//         }
        
//       });
//       this.tabledata = data.data;
//       console.log(this.user);
//     // }
//   },error=>{
//       console.log(error);
//      alert(error.error.data);
//   })
}
getUserDetails(user_id){
    this.apiservice.getUserHistory(user_id).subscribe((data:any)=>{
        console.log(data.data);
        this.user = data.data[0];
        this.Transactiondata = this.user.ether_transcations;
        console.log(this.Transactiondata)
    })
}
}