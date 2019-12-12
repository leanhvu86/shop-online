import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../shared/model/product';
import {CartService} from '../shared/service/cart.service';
import {$} from 'protractor';
import {Cart} from '../shared/model/cart';
import {LocationService} from '../shared/service/location.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product;
  products: Product [];
  productsTemp: Product [];
  loading = false;

  constructor(private cartService: CartService,private locationService: LocationService) {
  }

  ngOnInit() {
    this.getProducts();
    // this.locationService.loadProvinces();
  }

  getProducts(): void {
    this.cartService.getProducts()
      .subscribe(products => {
        console.log(products);
        this.products = products;
        this.productsTemp=products;
      });
  }

  addProduct = product => {
    let cart = new Cart(product.id, product.name, product.price, 1, product.image);
   this.cartService.addmore(cart);
    // this.cartService.loadCart();
  };
  filter(value){
    this.products=this.productsTemp;
    this.products=this.products.filter(product => product.brand == value);
  }
}
