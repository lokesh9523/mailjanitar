import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import {DetailsComponent} from './details/details.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users'
    },
    children:[
      {
        path:'',
        component: UsersComponent,
        data:{
          title:''
        }
    
      },
      {
        path:':id',
        component:DetailsComponent,
        data:{
          title:'details'
        }
    
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
