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

    spam_id
    user;
    domain
    totalusers = 0
    constructor(public apiservice: ApiService, public route: Router, public localstorage: LocalStorageService, private datepipe: DatePipe, public activatedroute: ActivatedRoute) {
    }
    ngOnInit() {
        this.activatedroute.params.subscribe(params => {
            this.spam_id = params['id'];
            if (this.spam_id) {
                this.getDomain(this.spam_id);
            }
        });
    }
    getDomain(domainId) {
        this.apiservice.getSpamById(domainId).subscribe((data: any) => {
            this.user = data.data
        })
    }
    updateDomain() {
        if (!this.user.name) {
            alert("Please Enter  name")
        } if (!this.user.reason) {
            alert("Please Enter the reason")
        }  
        else {
            if(this.user.status == 0 || this.user.status ==1){
                this.apiservice.updateSpam(this.user, this.spam_id).subscribe((data: any) => {
                    if (data.data) {
                        alert("spam Updated Sucessfully");
                        this.route.navigateByUrl('/spam')
                    }
                })
            }else{
                alert("status should be  either 1 or 0")
            }
        }
    }
}