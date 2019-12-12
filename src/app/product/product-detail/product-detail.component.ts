import {Component, OnInit} from '@angular/core';
import {CartService} from '../../shared/service/cart.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../shared/model/product';
import {Cart} from '../../shared/model/cart';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
  ) {
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.cartService.getProduct(id).subscribe(product => this.product = product);
  }

  addProduct = product => {
    let cart = new Cart(product.id, product.name, product.price, 1, product.image);
    this.cartService.addmore(cart);
    // this.cartService.loadCart();
  };
}
