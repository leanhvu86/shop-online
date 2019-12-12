import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductRoutes } from './product.routing';
import { ProductComponent } from './product.component';
import { BestProductComponent } from './best-product/best-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule, MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule, MatNativeDateModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { ProductIndexComponent } from './index/product-index.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {AddProductComponent} from './add-product/add-product.component';
import {MatDatepickerModule} from '@angular/material/typings/esm5/datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    ProductComponent,
    AddProductComponent,
    BestProductComponent,
    ProductDetailComponent,
    ProductIndexComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild(ProductRoutes),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [ProductComponent, AddProductComponent, BestProductComponent],
})
export class ProductModule { }
