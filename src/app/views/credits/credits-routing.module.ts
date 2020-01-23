import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditComponent } from './credits.component';

const routes: Routes = [
  {
    path: '',
    component: CreditComponent,
    data: {
      title: 'Credits'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditRoutingModule {}
