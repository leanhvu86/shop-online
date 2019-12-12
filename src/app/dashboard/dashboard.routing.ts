import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../shared/guards';
import {LoginComponent} from './login/login.component';
import {ProductComponent} from '../product/product.component';
import {AddProductComponent} from './add-product/add-product.component';
import {BestProductComponent} from '../product/best-product/best-product.component';
import {ProductDetailComponent} from '../product/product-detail/product-detail.component';
import {OrderComponent} from './order/order.component';
import {ProductInfoComponent} from './product-info/product-info.component';
import {ProductInfoDetailComponent} from './product-info-detail/product-info-detail.component';
import {CustomerComponent} from './customer/customer.component';
import {ReportComponent} from './report/report.component';
import {OrderDetailComponent} from './orderdetail/orderdetail.component';
import {CustomerDetailComponent} from './customerdetail/customerdetail.component';

export const DashBoard: Routes = [
  {path: 'dashboard', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard],// <- this line is added
    children: [
      {
        path: '',
        redirectTo: 'product-info',
        pathMatch: 'full'
      },
      {
        path: 'order',
        component: OrderComponent
      },
      {
        path: 'order-detail/:id',
        component: OrderDetailComponent
      },
      {
        path: 'product-info',
        component: ProductInfoComponent
      },
      {
        path: 'product-info-detail/:id',
        component: ProductInfoDetailComponent
      },
      {
        path: 'add-product',
        component: AddProductComponent
      },
      {
        path: 'customer',
        component: CustomerComponent
      },
      {
        path: 'customer-detail/:id',
        component: CustomerDetailComponent
      },
      {
        path: 'report',
        component: ReportComponent
      },
    ]
  },
  {path: 'login', component: LoginComponent},
];
