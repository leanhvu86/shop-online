import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/service/product.service';
import {Location} from '@angular/common';
import {Product} from '../../shared/model/product';
import {AuthenticationService} from '../../shared/service/authentication.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product = new Product();

  constructor(
    private productService: ProductService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getProducts();
  }

  public imagePath;
  imgURL: any;
  public message: string;

  preview(files) {
    if (files.length === 0) {
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  goBack(): void {
    if(this.saveSuccess===true){
      alert("Thêm mới sản phẩm thành công");
    }
    this.location.back();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => {
        console.log(products);
        this.productsTemp = products;
      });
  }
  saveSuccess=false;
  productsTemp: Product[];

  save(): void {
    this.product.id = this.productsTemp.length + 2;
    this.saveSuccess=true;
    this.productService.addProduct(this.product)
      .subscribe(() => this.goBack());

  }
}
