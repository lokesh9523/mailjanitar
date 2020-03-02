import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-store';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'transaction.component.html'
})
export class TransactionComponent implements OnInit {
  cols = [
    // {header:"Sno",field:"id"},
    {header:"Transaction hash",field:"transcation_hash",width: '40%'},
    { header: "From", field: "from_address",width: '25%' },
    { header: "To", field: "to_address",width: '25%' },
   {header:"Value",field:"value",width: '10%'},
    // {header:"Time Stamp",field:"time_stamp",width: '20%'},
    // {header:"Block No",filed:"block_number"}
    
    //{header:""}
  ];
  Transactiondata = [];
  Transaction;
  totaltransaction = 0
  constructor(public apiservice:ApiService,public route:Router,public localstorage:LocalStorageService,private datepipe: DatePipe,) {
    }
  ngOnInit() {
  this.apiservice.getAllTransaction().subscribe((data:any)=>{
    // if(data){
      this.Transaction = data.data;
      this.totaltransaction = data.data.length;
      
      this.Transactiondata = data.data;
    // }
  },error=>{
      console.log(error);
     alert(error.error.data);
  })
}
}