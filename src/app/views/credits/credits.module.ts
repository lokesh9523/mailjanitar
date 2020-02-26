import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { CreditComponent } from './credits.component';
import { CreditRoutingModule } from './credits-routing.module';
import { TableModule } from 'primeng/table';
import { QRCodeModule } from 'angularx-qrcode';
import {DialogModule} from 'primeng/dialog';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    FormsModule,
    CreditRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TableModule,
    CommonModule,
    ButtonsModule.forRoot(),
    QRCodeModule,
    DialogModule,
    ModalModule
  ],
  declarations: [ CreditComponent ]
})
export class CreditModule { }
