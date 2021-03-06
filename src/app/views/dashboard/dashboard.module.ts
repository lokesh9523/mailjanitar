import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TableModule } from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { ModalModule } from 'ngx-bootstrap/modal';
import {ProgressBarModule} from 'primeng/progressbar';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TableModule,
    CommonModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    DialogModule,
    ProgressBarModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
