import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NoAccessComponent} from './error/no-access/no-access.component';
import {PageNotFoundComponent} from './error/page-not-found/page-not-found.component';
import {AuthGuard} from './shared/guards';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    loadChildren: './product/product.module#ProductModule'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {path: 'no-access', component: NoAccessComponent},
  {path: '**', component: PageNotFoundComponent}
];
