import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/service/product.service';
import {Product} from '../../shared/model/product';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  product: Product;
  products: Product[];


  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => {
        console.log(products);
        this.products = products;
      });
  }
  p: number = 1;
  //sorting
  key: string = 'name'; //set default
  reverse: boolean = false;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  deleteProduct = product => {
    this.productService.deleteProduct(product).subscribe();
    alert('Xóa sản phẩm thành công');
    this.getProducts();
  };
}
