import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AntispamComponent} from './antispam.component'
import {AddComponent} from './add/add.component';
import {UpdateComponent} from './update/update.component';

const routes: Routes = [
  {
    path: '',
   // component: AntispamComponent,
    data: {
      title: 'spam'
    },
    children:[
      {
        path:'',
        component: AntispamComponent,
        data:{
          title:'spam'
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
export class AntispamRoutingModule {}
