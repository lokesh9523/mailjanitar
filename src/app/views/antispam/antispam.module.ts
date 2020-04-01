import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import {AntispamComponent} from './antispam.component';
import {AntispamRoutingModule} from './antispam-routing.module';
import {AddComponent} from './add/add.component';
import {UpdateComponent} from './update/update.component';
@NgModule({
  imports: [
    FormsModule,
    AntispamRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TableModule,
    CommonModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ AntispamComponent,AddComponent,UpdateComponent ]
})
export class AntispamModule { }
