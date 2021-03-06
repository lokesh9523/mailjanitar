import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { UploadRoutingModule } from './upload-routing.module';
import { TableModule } from 'primeng/table';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    FormsModule,
    UploadRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TableModule,
    CommonModule,
    ButtonsModule.forRoot(),
    ModalModule
  ],
  declarations: [ UploadComponent ]
})
export class UploadModule { }
