import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UrlComponent } from './url.component';
import { RoleGaurdService } from '../../auth/role.guard';
import {AddComponent} from './add/add.component';
 import {UpdateComponent} from './update/update.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [RoleGaurdService], 
    data: {
      title: 'url'
    },
    children:[
      {
        path:'',
        component: UrlComponent,
        data:{
          title:'url'
        }
    
      },
      {
        path:'add',
        component: AddComponent,
        data:{
          title:''
        }
    
      },
    {
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
export class UrlRoutingModule {}
