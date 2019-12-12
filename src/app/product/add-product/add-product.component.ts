import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {CartService} from 'src/app/shared/service/cart.service';
import {Cart} from 'src/app/shared/model/cart';
import {Product} from '../../shared/model/product';
import {MatDatepicker} from '@angular/material';
import * as moment from 'moment';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {of} from 'rxjs';
import {LocationService} from '../../shared/service/location.service';
import {Province} from '../../shared/model/province';
import {District} from '../../shared/model/district';
import {Customer} from '../../shared/model/customer';
import {Md5} from 'ts-md5/dist/md5';
import {Ward} from '../../shared/model/ward';
import {Order} from '../../shared/model/order';
import {OrderService} from '../../shared/service/order.service';
import {CustomerService} from '../../shared/service/customer.service';
import {Location} from '@angular/common';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {state} from '@angular/animations';
import {OrderDetail} from '../../shared/model/orderDetail';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  constructor(
    public cartService: CartService,
    public locationService: LocationService,
    public orderService: OrderService,
    public customerService: CustomerService,
    private location: Location,
    private router: Router,
  ) {
  }

  customers: Customer[];
  customer: Customer;
  order = new Order();
  count: number;
  saveSuccess = false;
  saveOrderStatus = false;
  saveOrderDetailStatus = false;
  md5: string;
  user: string;


  ngOnInit() {
    this.checkRegister();
    this.getCarts();
    this.getCustomer();
    this.count = this.cartService.count;
  }

  getCarts(): void {
    this.cartService.getCarts();
  }

  getCustomer() {
    let User = JSON.parse(localStorage.getItem('token'));
    this.md5 = User;
    this.customer = this.customerService.getCustomerByMd5(this.md5);
    if (this.customer == undefined) {
      this.customer = new Customer();
    }
    console.log(this.customer);
  }

  submit() {
    console.log(this.md5);
    if (this.customer.id > 0 && this.saveOrderStatus == false) {
      this.saveOrder().then(result => {
        console.log('Lưu đơn hàng thành công');
      })
        .catch(err => {
          console.log(err);
        });
      this.saveOrderDetail();
    } else {
      alert('Vui lòng kiểm tra thông tin đăng kí mua hàng');
    }
  }

  async saveOrder() {
    if (this.md5 != undefined && this.saveOrderStatus == false) {
      this.order.quantity = this.count;
      this.order.customerId = this.md5;
      this.order.total = this.cartService.totalCart;
      this.order.md5 = this.md5;
      this.order.type = 2;
      this.orderService.addOrder(this.order).subscribe(() => this.saveOrderStatus = true);
      this.saveOrderStatus = true;
    }
  }

  wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  saveOrderDetail() {
    if (this.cartService.carts.length && this.saveOrderDetailStatus == false) {
      for (let cart of this.cartService.carts) {
        if (cart.id != undefined) {
          let orderDetail = new OrderDetail(cart.id, this.md5, cart.name, cart.price, cart.quantity, cart.image);
          this.orderService.addOrderDetail(orderDetail).subscribe(() => this.saveOrderDetailStatus = true);
          this.saveOrderDetailStatus = true;
        }
      }
      if (this.saveOrderDetailStatus === true) {
        alert("Chúc mừng bạn đã đặt hàng thành công");
        this.goBack();
      }
    }
  }

  goBack(): void {
      this.cartService.refreshCart();
      this.router.navigate(['/']);
  }

  checkRegister() {
    let User = JSON.parse(localStorage.getItem('token'));
    if (User == undefined) {
      console.log(User);
      this.router.navigate(['/register']);
    } else {
      this.user = User;
      console.log(this.user);
      console.log(User);
    }
  }
}
