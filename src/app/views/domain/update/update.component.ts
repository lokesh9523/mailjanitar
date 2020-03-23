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
    domain_id
    user;
    domain
    totalusers = 0
    constructor(public apiservice: ApiService, public route: Router, public localstorage: LocalStorageService, private datepipe: DatePipe, public activatedroute: ActivatedRoute) {
    }
    ngOnInit() {
        this.activatedroute.params.subscribe(params => {
            this.domain_id = params['id'];
            if (this.domain_id) {
                this.getDomain(this.domain_id);
            }
        });
    }
    getDomain(domainId) {
        this.apiservice.getDomainById(domainId).subscribe((data: any) => {
            this.user = data.data
        })
    }
    updateDomain() {
        if (!this.user.domain_name) {
            alert("Please Enter Domain name")
        }else if (!this.user.speed_per_hour) {
            alert("Please Enter the Speed")
        } else {
            if(this.user.status == 0 || this.user.status ==1){
                this.apiservice.updateDomain(this.user, this.domain_id).subscribe((data: any) => {
                    if (data.data) {
                        alert("Domain Updated Sucessfully");
                        this.route.navigateByUrl('/domain')
                    }
                })
            }else{
                alert("status should be  either 1 or 0")
            }
        }
    }
}