import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import { LocalStorageService } from 'ngx-store';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef,ModalDirective} from 'ngx-bootstrap/modal';

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
    @ViewChild(ModalDirective) modal: ModalDirective;
    @ViewChild('myInput')myInputVariable: ElementRef;
    constructor(public apiservice: ApiService, public localstorageservice: LocalStorageService,public router:Router) {
    }
    ngOnInit() {
        // generate random values for mainChart
        this.tabledata = [{ "name": "lokesh", "size": "100000", "upload_date": "20/02/2019", "process": "95%" }, { "name": "lokesh", "size": "100000", "upload_date": "20/02/2019", "process": "95%" }, { "name": "lokesh", "size": "100000", "upload_date": "20/02/2019", "process": "95%" }
            , { "name": "lokesh", "size": "100000", "upload_date": "20/02/2019", "process": "95%" }, { "name": "lokesh", "size": "100000", "upload_date": "20/02/2019", "process": "95%" }];

    }
    onSelectFile(event) {
        var format;
        this.files = [];
        format = event.target.files;
        console.log(event.target.files[0].type)
        if(event.target.files[0].type == "text/plain" || event.target.files[0].type == "text/csv" ){

        if(event.target.files.length){
            this.filelength = event.target.files.length
        }
        this.files.push(event.target.files);
        let fileList: FileList = this.files;
        let formData = new FormData();
        formData.append('image', fileList[0][0], fileList[0][0].name);
        this.uploaddata = formData;

        }else{
            alert("Incorrect File Format Please Upload .txt,.csv files Only");
            this.myInputVariable.nativeElement.value = "";
        }
    }
    onsubmit(event) {
        
        if(!this.filelength){
            alert("Please Uplaod the file");
        }else{
            this.apiservice.UploadFile(this.localstorageservice.get('login_id'), this.uploaddata).subscribe((data: any) => {
                if(data.data){
                 this.modal.show();
                }
            }, error => {
                alert(error.error.data)
              });
        }
        
    }
    SelectFile(){
    this.myInputVariable.nativeElement.value = "";
    this.modal.hide();
    }
    
    Cancel(){
        this.router.navigateByUrl('/MyList');
    }
}
