import { Component, OnInit } from '@angular/core';
import {Product} from '../../shared/model/product';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../shared/service/cart.service';
import {ProductService} from '../../shared/service/product.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-product-info-detail',
  templateUrl: './product-info-detail.component.html',
  styleUrls: ['./product-info-detail.component.css']
})
export class ProductInfoDetailComponent implements OnInit {

  product: Product;
  update=false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getProduct();
    this.update=false;
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.productService.getProduct(id).subscribe(product => this.product = product);
  }
  goBack(): void {
    if(this.update===true){
      alert("Lưu sản phẩm thành công");
    }
    this.location.back();
  }
  save(): void {
    this.update=true;
    this.productService.updateProduct(this.product)
      .subscribe(() => this.goBack());
  }
}
