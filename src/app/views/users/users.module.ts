import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {DetailsComponent} from './details/details.component';
import { UsersRoutingModule } from './users-routing.module';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
  imports: [
    FormsModule,
    UsersRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TableModule,
    CommonModule,
    TabsModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ UsersComponent,DetailsComponent ]
})
export class UsersModule { }
