import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-store';
import { DatePipe } from '@angular/common';

@Component({
    templateUrl: 'update.component.html'
})
export class UpdateComponent implements OnInit {
    cols = [
        // {header:"Sno",field:"id"},
        { header: "Username", field: "username" },
        { header: "Email", field: "email" },
        { header: "Credits", field: "amount" },

        //{header:""}
    ];
    url_id
    url;
    domain
    totalusers = 0
    constructor(public apiservice: ApiService, public route: Router, public localstorage: LocalStorageService, private datepipe: DatePipe, public activatedroute: ActivatedRoute) {
    }
    ngOnInit() {
        this.activatedroute.params.subscribe(params => {
            this.url_id = params['id'];
            if (this.url_id) {
                this.getUrl(this.url_id);
            }
        });
    }
    getUrl(domainId) {
        this.apiservice.geturlById(domainId).subscribe((data: any) => {
            this.url = data.data
        })
    }
    updateUrl() {
        if (!this.url.url) {
            alert("Please Enter url name")
        }  else {
            if(this.url.status == 0 || this.url.status ==1){
                this.apiservice.updateUrl(this.url, this.url_id).subscribe((data: any) => {
                    if (data.data) {
                        alert("Url Updated Sucessfully");
                        this.route.navigateByUrl('/url')
                    }
                })
            }else{
                alert("status should be  either 1 or 0")
            }
        }
    }
}