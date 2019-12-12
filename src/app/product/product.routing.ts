import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { AddProductComponent } from 'src/app/product/add-product/add-product.component';
import { BestProductComponent } from 'src/app/product/best-product/best-product.component';
import {ProductDetailComponent} from 'src/app/product/product-detail/product-detail.component';
import {ProductIndexComponent} from './index/product-index.component';
import {DashboardComponent} from '../dashboard/dashboard/dashboard.component';
import {AuthGuard} from '../shared/guards';
import {RegisterComponent} from './register/register.component';
export const ProductRoutes: Routes = [
  {
    path: '',
    component: ProductIndexComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ProductComponent
      },
      {
        path: 'addproduct',
        component: AddProductComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
      	path: 'detail/:id',
      	component: ProductDetailComponent
      },
    ]
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];
