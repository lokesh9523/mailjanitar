import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-store';
import { DatePipe } from '@angular/common';

@Component({
    templateUrl: 'url.component.html'
})
export class UrlComponent implements OnInit {
    cols = [
        { header: "Id", field: "id" },
        { header: "Url", field: "url" },
        { header: "Status", field: "status" }

        //{header:""}
    ];
    urldata = [];
    domain;
    totaldomain = 0
    displayDialog: boolean = false;
    url = { "url": "", "status": 1 };
    constructor(public apiservice: ApiService, public route: Router, public localstorage: LocalStorageService, private datepipe: DatePipe, ) {
    }
    ngOnInit() {
        this.getUrls();
    }
    getUrls() {
        this.apiservice.getAllUrl().subscribe((data: any) => {
            // if(data){
            this.domain = data.data;
            this.totaldomain = data.data.length;

            this.urldata = data.data;
           // console.log(this.domain);
            // }
        }, error => {
           // console.log(error);
            alert(error.error.data);
        })
    }

  
}