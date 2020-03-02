import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomainComponent } from './domain.component';
import { RoleGaurdService } from '../../auth/role.guard';
import {AddComponent} from './add/add.component';
import {UpdateComponent} from './update/update.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [RoleGaurdService], 
    data: {
      title: 'domain'
    },
    children:[
      {
        path:'',
        component: DomainComponent,
        data:{
          title:'domain'
        }
    
      },{
        path:'add',
        component: AddComponent,
        data:{
          title:''
        }
    
      },{
        path:'edit/:id',
        component: UpdateComponent,
        data:{
          title:''
        }
    
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainRoutingModule {}
