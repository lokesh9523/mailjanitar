import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import { LocalStorageService } from 'ngx-store';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'upload.component.html'
})
export class UploadComponent implements OnInit {
    cols = [
        { header: "Name", field: "name" },
        { header: "Size", field: "size" },
        { header: "Upload Date", field: "upload_date" },
        { header: "process", field: "process" },

        //{header:""}
    ];
    tabledata = [];

    files: any = [];
    uploaddata;
    filelength;
    constructor(public apiservice: ApiService, public localstorageservice: LocalStorageService,public router:Router) {
    }
    ngOnInit() {
        // generate random values for mainChart
        this.tabledata = [{ "name": "lokesh", "size": "100000", "upload_date": "20/02/2019", "process": "95%" }, { "name": "lokesh", "size": "100000", "upload_date": "20/02/2019", "process": "95%" }, { "name": "lokesh", "size": "100000", "upload_date": "20/02/2019", "process": "95%" }
            , { "name": "lokesh", "size": "100000", "upload_date": "20/02/2019", "process": "95%" }, { "name": "lokesh", "size": "100000", "upload_date": "20/02/2019", "process": "95%" }];

    }
    onSelectFile(event) {
        var format;
        format = event.target.files;
        if(event.target.files.length){
            this.filelength = event.target.files.length
        }
        this.files.push(event.target.files);
        let fileList: FileList = this.files;
        let formData = new FormData();
        formData.append('image', fileList[0][0], fileList[0][0].name);
        this.uploaddata = formData;

    }
    onsubmit(event) {
        
        if(!this.filelength){
            alert("Please Uplaod the file");
        }else{
            this.apiservice.UploadFile(this.localstorageservice.get('login_id'), this.uploaddata).subscribe((data: any) => {
                if(data.data){
                    alert("file uploaded sucessfully");
                    this.router.navigateByUrl('/MyList');
                }
            })
        }
        
    }
}
