import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

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
  
  constructor() {
    }
  ngOnInit() {
    // generate random values for mainChart
  this.tabledata= [{"name":"lokesh","size":"100000","upload_date":"20/02/2019","process":"95%"},{"name":"lokesh","size":"100000","upload_date":"20/02/2019","process":"95%"},{"name":"lokesh","size":"100000","upload_date":"20/02/2019","process":"95%"}
,{"name":"lokesh","size":"100000","upload_date":"20/02/2019","process":"95%"},{"name":"lokesh","size":"100000","upload_date":"20/02/2019","process":"95%"}];

  }
}
