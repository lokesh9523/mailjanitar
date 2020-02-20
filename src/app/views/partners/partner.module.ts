import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { PartnerComponent } from './partner.component';
import { PartnerRoutingModule } from './partner-routing.module';
import { TableModule } from 'primeng/table';


@NgModule({
  imports: [
    FormsModule,
    PartnerRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TableModule,
    CommonModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ PartnerComponent ]
})
export class PartnerModule { }
