import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import {WebsiteComponent} from './views/website/website.component';
import { AuthGuardService } from './auth/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'website',
    pathMatch: 'full',
  },
  {
    path:'website',
    component:WebsiteComponent
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Home'
    },
    children: [
      // {
      //   path: 'base',
      //   loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      // },
      {
        path:'myaccount',
        loadChildren:()=>import('./views/account/account.module').then(m=>m.AccountModule)
      },
      {
        path:'upload',
        loadChildren:()=>import('./views/upload/upload.module').then(m=>m.UploadModule)
      },
      {
        path:'buy-credits',
        loadChildren:()=>import('./views/credits/credits.module').then(m=>m.CreditModule)
      },
     
      {
        path: 'MyList',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path:'users',
        loadChildren:()=>import('./views/users/users.module').then(m=>m.UsersModule)
      },
      {
        path:'transaction',
        loadChildren:()=>import('./views/transactions/transaction.module').then(m=>m.TransactionModule)
      },
      {
        path:'domain',
        loadChildren:()=>import('./views/domain/domain.module').then(m=>m.DomainModule)
      },
      {
        path:'url',
        loadChildren:()=>import('./views/url/url.module').then(m=>m.DomainModule)
      },
      {
        path:'spam',
        loadChildren:()=>import('./views/antispam/antispam.module').then(m=>m.AntispamModule)
      }
     
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
