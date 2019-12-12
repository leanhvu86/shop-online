import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductModule } from 'src/app/product/product.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from 'src/app/shared/service/in-memory-data.service';
import { MessageServiceComponent } from './message-service/message-service.component';
import { AppRoutes } from './app.routing';
import { ErrorModule } from './error/error.module';
import { SharedModule } from './shared/shared.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {DashboardModule} from './dashboard/dashboard.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './shared/guards';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MessageServiceComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    ErrorModule,
    ProductModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DashboardModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
