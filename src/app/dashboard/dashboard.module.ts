import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor, fakeBackendProvider, JwtInterceptor} from '../shared/helpers';
import {AppSettings} from '../app.settings';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DashBoard} from './dashboard.routing';
import {MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CookieService} from 'ngx-cookie-service';
import {BrowserModule} from '@angular/platform-browser';
import {OrderComponent} from './order/order.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { CustomerComponent } from './customer/customer.component';
import { ProductInfoDetailComponent } from './product-info-detail/product-info-detail.component';
import { AddProductComponent } from './add-product/add-product.component';
import {SharedModule} from '../shared/shared.module';
import { ReportComponent } from './report/report.component';
import {OrderDetailComponent} from './orderdetail/orderdetail.component';
import { CustomerDetailComponent } from './customerdetail/customerdetail.component';
import {ChartsModule} from 'ng2-charts';
import {JwPaginationComponent} from 'jw-angular-pagination';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}
@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    OrderComponent,
    ProductInfoComponent,
    CustomerComponent,
    ProductInfoDetailComponent,
    AddProductComponent,
    ReportComponent,
    OrderDetailComponent,
    CustomerDetailComponent,

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(DashBoard),
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    CookieService,
    // provider used to create fake backend
    fakeBackendProvider,
    AppSettings

  ],
  exports: [LoginComponent,DashboardComponent,ProductInfoDetailComponent]
})

export class DashboardModule {
}
