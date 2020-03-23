import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { UrlComponent } from './url.component';
import { UrlRoutingModule } from './url-routing.module';
import { TableModule } from 'primeng/table';
 import {UpdateComponent} from './update/update.component';
import {AddComponent} from './add/add.component';

@NgModule({
  imports: [
    FormsModule,
    UrlRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TableModule,
    CommonModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ UrlComponent,UpdateComponent,AddComponent ]
})
export class DomainModule { }
