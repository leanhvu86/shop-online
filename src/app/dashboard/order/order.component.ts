import {Component, OnInit, ViewChild} from '@angular/core';
import {CartService} from '../../shared/service/cart.service';
import {Cart} from '../../shared/model/cart';
import {MatSort, MatTableDataSource} from '@angular/material';
import {OrderService} from '../../shared/service/order.service';
import {Order} from '../../shared/model/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];

  constructor(public orderService: OrderService,) {
  }

  ngOnInit() {
    this.getOrders();
    console.log('load order');
  }

  getOrders() {
    this.orderService.getOrders()
      .subscribe(orders => {
        console.log(orders);
        this.orders = orders;
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
  accept(order) {
    order.type = 1;
    this.orderService.updateOrder(order).subscribe(() => console.log('chấp nhận'));
  }

  reject(order) {
    order.type = 0;
    this.orderService.updateOrder(order).subscribe(() => console.log('từ chối'));
  }
}
