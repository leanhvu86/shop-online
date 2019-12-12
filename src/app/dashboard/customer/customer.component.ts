import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../shared/service/customer.service';
import {Customer} from '../../shared/model/customer';
import {OrderService} from '../../shared/service/order.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: Customer[];

  constructor(
    private customerService: CustomerService,
  ) {
  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(customers=> this.customers=customers);
  }
  p: number = 1;
  //sorting
  key: string = 'name'; //set default
  reverse: boolean = false;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  getCustomerInfos() {
    this.customerService.getCustomers()
      .subscribe(customers => {
        console.log(customers);
        this.customers = customers;
      });
  }
  reject(customer){
    customer.type=0;
    this.customerService.updateCustomer(customer).subscribe(()=> console.log("Từ chối khách hàng"));
  }
}
