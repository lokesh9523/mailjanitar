import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { DomainComponent } from './domain.component';
import { DomainRoutingModule } from './domain-routing.module';
import { TableModule } from 'primeng/table';
import {UpdateComponent} from './update/update.component';
import {AddComponent} from './add/add.component';

@NgModule({
  imports: [
    FormsModule,
    DomainRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TableModule,
    CommonModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ DomainComponent,AddComponent,UpdateComponent ]
})
export class DomainModule { }
