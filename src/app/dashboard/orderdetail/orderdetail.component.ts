import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../shared/service/order.service';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private orderService : OrderService
  ) { }

  ngOnInit() {
    this.getOrderDetail();
  }
  p: number = 1;
  //sorting
  key: string = 'name'; //set default
  reverse: boolean = false;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  getOrderDetail(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    let md5= id.toString();
    this.orderService.getOrderDetailByOrderId(md5);
  }
}
